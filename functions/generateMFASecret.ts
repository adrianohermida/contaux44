import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Gera secret para 2FA/MFA
 * Usa TOTP (Time-based One-Time Password)
 * Compatível com Google Authenticator, Authy, etc
 */

function generateRandomSecret(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    secret += chars[array[i] % chars.length];
  }
  return secret;
}

function base32Encode(buffer) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = 0;
  let value = 0;
  let output = '';
  
  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;
    
    while (bits >= 5) {
      bits -= 5;
      output += alphabet[(value >> bits) & 31];
    }
  }
  
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }
  
  return output;
}

function generateQRCode(secret, email, issuer = 'FinanceApp') {
  // Formata para compatibilidade com autenticadores
  const encodedEmail = encodeURIComponent(email);
  const encodedIssuer = encodeURIComponent(issuer);
  
  const otpauthUrl = `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}`;
  
  // Retorna URL para gerar QR code (usar serviço como QR Server)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUrl)}`;
  
  return { otpauthUrl, qrCodeUrl };
}

function verifyTOTP(secret, token, window = 1) {
  if (token.length !== 6 || !/^\d+$/.test(token)) {
    return false;
  }
  
  const now = Math.floor(Date.now() / 1000);
  const timeStep = 30;
  
  for (let i = -window; i <= window; i++) {
    const counter = Math.floor((now + i * timeStep) / timeStep);
    const expectedToken = generateTOTPToken(secret, counter);
    
    if (expectedToken === token) {
      return true;
    }
  }
  
  return false;
}

function generateTOTPToken(secret, counter) {
  const key = base32Decode(secret);
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  
  let remaining = counter;
  for (let i = 7; i >= 0; --i) {
    view.setUint8(i, remaining & 0xff);
    remaining >>= 8;
  }
  
  const hmacKey = { name: 'HMAC', hash: 'SHA-1' };
  const signature = crypto.subtle.sign(hmacKey, key, buffer);
  const hmac = new Uint8Array(signature);
  
  const offset = hmac[hmac.length - 1] & 0xf;
  const code = (
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  );
  
  return (code % 1000000).toString().padStart(6, '0');
}

function base32Decode(encoded) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const bytes = [];
  let bits = 0;
  let value = 0;
  
  for (const char of encoded) {
    const idx = alphabet.indexOf(char.toUpperCase());
    if (idx === -1) continue;
    
    value = (value << 5) | idx;
    bits += 5;
    
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >> bits) & 0xff);
    }
  }
  
  return new Uint8Array(bytes);
}

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Only POST allowed' }, { status: 405 });
    }

    const body = await req.json();
    const { email, action } = body;

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.email !== email) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Gera novo secret
    const secret = generateRandomSecret(32);
    const { otpauthUrl, qrCodeUrl } = generateQRCode(secret, email);

    // Gera códigos de backup (10 códigos)
    const backupCodes = Array.from({ length: 10 }, () => {
      return Array.from({ length: 8 }, () => 
        Math.floor(Math.random() * 10)
      ).join('');
    });

    // Atualiza user com MFA
    await base44.auth.updateMe({
      mfa_enabled: true,
      mfa_secret: secret,
      mfa_backup_codes: backupCodes
    });

    // Log no audit
    await base44.asServiceRole.entities.AuditLog.create({
      tenant_id: user.tenant_id,
      user_email: email,
      action: 'update',
      entity_type: 'User',
      entity_id: user.id,
      new_values: { mfa_enabled: true, backup_codes_generated: 10 },
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown',
      status: 'success',
      timestamp: new Date().toISOString()
    });

    return Response.json({
      success: true,
      secret,
      qrCodeUrl,
      otpauthUrl,
      backupCodes,
      message: 'Escanear código QR com seu autenticador. Guarde os códigos de backup!'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});