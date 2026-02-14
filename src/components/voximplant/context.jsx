import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';
import { CALL_STATES, CONNECTION_STATES, VOX_EVENTS } from './config';
import { VoxLogger } from './logger';

/**
 * Contexto global para Voximplant
 * Gerencia estado de autenticação, chamadas, chat e conference
 */
export const VoxImplantContext = createContext();

const logger = new VoxLogger('VoxImplantContext');

export function VoxImplantProvider({ children }) {
  // Autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState(CONNECTION_STATES.DISCONNECTED);

  // Chamadas
  const [activeCall, setActiveCall] = useState(null);
  const [callState, setCallState] = useState(CALL_STATES.IDLE);
  const [callHistory, setCallHistory] = useState([]);

  // Chat
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Conference
  const [activeConference, setActiveConference] = useState(null);
  const [participants, setParticipants] = useState([]);

  // Hardware
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedAudioInput, setSelectedAudioInput] = useState(null);
  const [selectedAudioOutput, setSelectedAudioOutput] = useState(null);
  const [selectedVideoInput, setSelectedVideoInput] = useState(null);

  // Media streams
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  // Notificações
  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = useRef(null);

  /**
   * Atualizar estado de conexão
   */
  const updateConnectionState = useCallback((state) => {
    logger.info('Conexão atualizada:', state);
    setConnectionState(state);
    setIsConnected(state === CONNECTION_STATES.CONNECTED);
  }, []);

  /**
   * Login
   */
  const login = useCallback(async (username, password) => {
    try {
      logger.info('Iniciando login...');
      updateConnectionState(CONNECTION_STATES.CONNECTING);

      // SDK será inicializado aqui (Fase 2)
      // Por enquanto, apenas atualizar estado

      setCurrentUser({ username, email: `${username}@contaux.app` });
      setIsAuthenticated(true);
      updateConnectionState(CONNECTION_STATES.CONNECTED);

      logger.success(`Login bem-sucedido: ${username}`);
      return true;
    } catch (error) {
      logger.error('Erro ao fazer login:', error);
      updateConnectionState(CONNECTION_STATES.FAILED);
      return false;
    }
  }, [updateConnectionState]);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      logger.info('Desconectando...');
      setIsAuthenticated(false);
      setCurrentUser(null);
      setActiveCall(null);
      setCallState(CALL_STATES.IDLE);
      setMessages([]);
      updateConnectionState(CONNECTION_STATES.DISCONNECTED);
      logger.info('Logout bem-sucedido');
    } catch (error) {
      logger.error('Erro ao fazer logout:', error);
    }
  }, [updateConnectionState]);

  /**
   * Iniciar chamada
   */
  const startCall = useCallback((targetUser, callType) => {
    logger.info(`Iniciando chamada ${callType} para ${targetUser}`);
    setActiveCall({ targetUser, callType });
    setCallState(CALL_STATES.CONNECTING);
  }, []);

  /**
   * Finalizar chamada
   */
  const endCall = useCallback(() => {
    logger.info('Finalizando chamada');
    if (activeCall) {
      setCallHistory(prev => [...prev, { ...activeCall, timestamp: new Date() }]);
    }
    setActiveCall(null);
    setCallState(CALL_STATES.IDLE);
    setRemoteStream(null);
  }, [activeCall]);

  /**
   * Enviar mensagem
   */
  const sendMessage = useCallback((content) => {
    logger.info('Enviando mensagem:', content);
    const message = {
      id: Math.random().toString(36),
      from: currentUser?.username,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
    return message;
  }, [currentUser]);

  /**
   * Entrar em conference
   */
  const joinConference = useCallback((roomId) => {
    logger.info(`Entrando em conference: ${roomId}`);
    setActiveConference({ roomId, joinedAt: new Date() });
  }, []);

  /**
   * Sair de conference
   */
  const leaveConference = useCallback(() => {
    logger.info('Saindo de conference');
    setActiveConference(null);
    setParticipants([]);
  }, []);

  /**
   * Mostrar notificação
   */
  const showNotification = useCallback((message, type = 'info') => {
    logger.info(`Notificação [${type}]:`, message);
    setNotification({ message, type, id: Math.random() });

    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 4000);
  }, []);

  /**
   * Limpar timeouts ao desmontar
   */
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const value = {
    // Auth
    isAuthenticated,
    currentUser,
    isConnected,
    connectionState,
    login,
    logout,

    // Calls
    activeCall,
    callState,
    callHistory,
    startCall,
    endCall,

    // Chat
    messages,
    activeChat,
    sendMessage,

    // Conference
    activeConference,
    participants,
    joinConference,
    leaveConference,

    // Hardware
    audioDevices,
    videoDevices,
    selectedAudioInput,
    selectedAudioOutput,
    selectedVideoInput,
    setSelectedAudioInput,
    setSelectedAudioOutput,
    setSelectedVideoInput,

    // Streams
    localStream,
    setLocalStream,
    remoteStream,
    setRemoteStream,

    // Notifications
    notification,
    showNotification,

    // Internal
    updateConnectionState,
  };

  return (
    <VoxImplantContext.Provider value={value}>
      {children}
    </VoxImplantContext.Provider>
  );
}

export default VoxImplantContext;