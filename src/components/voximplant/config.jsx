/**
 * Configurações Voximplant para Contaux
 * APP_ID, endpoints, regras de negócio
 */

// ⚠️ IMPORTANTE: APP_ID deve ser configurado no arquivo .env
// Ex: VITE_VOXIMPLANT_APP_ID=12345
export const VOXIMPLANT_APP_ID = import.meta.env.VITE_VOXIMPLANT_APP_ID;

export const VOXIMPLANT_CONFIG = {
  // SDK
  appId: VOXIMPLANT_APP_ID,
  requestAudioFocus: true,
  showDebugInfo: import.meta.env.DEV,

  // Configurações de chamada
  call: {
    defaultAudioCodec: 'OPUS',
    defaultVideoCodec: 'VP8',
    defaultVideoResolution: '640x480',
    connectionTimeout: 30000, // 30s
    maxCallDuration: 3600000, // 1h em ms
  },

  // Configurações de conference
  conference: {
    maxParticipants: 100,
    autoStartVideo: false,
    autoStartAudio: false,
  },

  // Configurações de chat
  chat: {
    maxMessageLength: 5000,
    typingIndicatorTimeout: 3000,
    messageHistoryLimit: 100,
  },

  // Hardware padrão
  hardware: {
    audioInput: null,   // Auto-detect
    audioOutput: null,  // Auto-detect
    videoInput: null,   // Auto-detect
  },

  // Timeouts e retry
  network: {
    connectionCheckInterval: 5000,
    reconnectAttempts: 5,
    reconnectDelay: 2000,
  },
};

/**
 * Estados possíveis de uma chamada
 */
export const CALL_STATES = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  RINGING: 'ringing',
  ACTIVE: 'active',
  ON_HOLD: 'on_hold',
  ENDED: 'ended',
  FAILED: 'failed',
};

/**
 * Tipos de chamada
 */
export const CALL_TYPES = {
  VOICE: 'voice',
  VIDEO: 'video',
};

/**
 * Estados de conexão
 */
export const CONNECTION_STATES = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  FAILED: 'failed',
};

/**
 * Eventos do Voximplant
 */
export const VOX_EVENTS = {
  // Auth
  LOGIN_SUCCESS: 'loginSuccess',
  LOGIN_FAILED: 'loginFailed',
  LOGOUT: 'logout',
  TOKENS_EXPIRED: 'tokensExpired',

  // Calls
  INCOMING_CALL: 'incomingCall',
  CALL_CONNECTED: 'callConnected',
  CALL_DISCONNECTED: 'callDisconnected',
  CALL_FAILED: 'callFailed',

  // Chat
  MESSAGE_RECEIVED: 'messageReceived',
  MESSAGE_SENT: 'messageSent',
  TYPING_INDICATOR: 'typingIndicator',

  // Hardware
  DEVICE_CONNECTED: 'deviceConnected',
  DEVICE_DISCONNECTED: 'deviceDisconnected',
};

export default {
  VOXIMPLANT_APP_ID,
  VOXIMPLANT_CONFIG,
  CALL_STATES,
  CALL_TYPES,
  CONNECTION_STATES,
  VOX_EVENTS,
};