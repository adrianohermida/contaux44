import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Verifica token TOTP para 2FA
 * Usado no login após password
 */

async function verifyTOTP(secret, token, window = 1) {
   if (token.length !== 6 || !/^\d+$/.test(token)) {
     return false;
   }

   const now = Math.floor(Date.now() / 1000);
   const timeStep = 30;

   for (let i = -window; i <= window; i++) {
     const counter = Math.floor((now + i * timeStep) / timeStep);
     const expectedToken = await generateTOTPToken(secret, counter);

     if (expectedToken === token) {
       return true;
     }
   }

   return false;
}

async function generateTOTPToken(secret, counter) {
   const key = base32Decode(secret);
   const buffer = new ArrayBuffer(8);
   const view = new DataView(buffer);

   let remaining = counter;
   for (let i = 7; i >= 0; --i) {
     view.setUint8(i, remaining & 0xff);
     remaining >>= 8;
   }

   const hmacKey = { name: 'HMAC', hash: 'SHA-1' };
   const signatureBuffer = await crypto.subtle.sign('HMAC', await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']), buffer);
   const hmac = new Uint8Array(signatureBuffer);

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
    const { token } = body;

    if (!token || token.length !== 6) {
      return Response.json({ error: 'Invalid token format' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.mfa_enabled || !user.mfa_secret) {
      return Response.json({ error: 'MFA not enabled for this user' }, { status: 403 });
    }

    // Verifica token
    const isValid = await verifyTOTP(user.mfa_secret, token);

    if (!isValid) {
      // Log de tentativa falha
      await base44.asServiceRole.entities.SecurityLog.create({
        tenant_id: user.tenant_id,
        user_email: user.email,
        event_type: 'failed_login',
        severity: 'medium',
        description: 'Failed MFA token verification',
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        device_info: req.headers.get('user-agent') || 'unknown',
        action_taken: 'none',
        timestamp: new Date().toISOString()
      });

      return Response.json({ error: 'Invalid MFA token' }, { status: 401 });
    }

    // Update last MFA verification
    await base44.auth.updateMe({
      mfa_verified_at: new Date().toISOString()
    });

    // Log de sucesso
    await base44.asServiceRole.entities.AuditLog.create({
      tenant_id: user.tenant_id,
      user_email: user.email,
      action: 'login',
      entity_type: 'User',
      entity_id: user.id,
      new_values: { mfa_verified: true },
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown',
      status: 'success',
      timestamp: new Date().toISOString()
    });

    return Response.json({
      success: true,
      message: 'MFA verification successful'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});