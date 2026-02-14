import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';
import { CALL_STATES, CONNECTION_STATES, VOX_EVENTS, VOX_APP_ID } from './config';
import { VoxLogger } from './logger';
import VoxImplantSDK from './VoxImplantSDK';
import { loadVoxImplantSDK } from './VoxImplantLoader';

/**
 * Contexto global para Voximplant
 * Gerencia estado de autenticação, chamadas, chat e conference
 */
export const VoxImplantContext = createContext();

const logger = new VoxLogger('VoxImplantContext');

export function VoxImplantProvider({ children }) {
  // SDK
  const sdkRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);
  
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
      if (!sdkRef.current || !sdkReady) {
        throw new Error('SDK não está pronto');
      }

      logger.info('Iniciando login...');
      updateConnectionState(CONNECTION_STATES.CONNECTING);

      const success = await sdkRef.current.login(username, password);
      
      if (success) {
        setCurrentUser({ username, email: `${username}@${VOX_APP_ID}.voximplant.com` });
        setIsAuthenticated(true);
        updateConnectionState(CONNECTION_STATES.CONNECTED);
        logger.success(`Login bem-sucedido: ${username}`);
        return true;
      } else {
        updateConnectionState(CONNECTION_STATES.FAILED);
        logger.error('Login falhou');
        return false;
      }
    } catch (error) {
      logger.error('Erro ao fazer login:', error);
      updateConnectionState(CONNECTION_STATES.FAILED);
      return false;
    }
  }, [sdkReady, updateConnectionState]);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      logger.info('Desconectando...');
      
      if (sdkRef.current) {
        await sdkRef.current.logout();
      }
      
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
    * Toggle áudio
    */
  const toggleAudio = useCallback((enabled) => {
    logger.info(`Áudio ${enabled ? 'ativado' : 'desativado'}`);
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = enabled;
      });
    }
  }, [localStream]);

  /**
    * Toggle vídeo
    */
  const toggleVideo = useCallback((enabled) => {
    logger.info(`Vídeo ${enabled ? 'ativado' : 'desativado'}`);
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = enabled;
      });
    }
  }, [localStream]);

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
   * Inicializar SDK ao montar
   */
  useEffect(() => {
    const initSDK = async () => {
      try {
        logger.info('Inicializando Voximplant SDK...');
        await loadVoxImplantSDK();
        sdkRef.current = new VoxImplantSDK(VOX_APP_ID);
        const success = await sdkRef.current.init();
        setSdkReady(success);
        if (success) {
          logger.success('SDK pronto para uso');
        }
      } catch (error) {
        logger.error('Erro ao inicializar SDK:', error);
        setSdkReady(false);
      }
    };

    initSDK();

    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const value = {
    // SDK
    sdkReady,
    sdk: sdkRef.current,

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

    // Media Controls
    toggleAudio,
    toggleVideo,

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