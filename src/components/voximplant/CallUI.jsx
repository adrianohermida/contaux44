import React, { useState, useRef, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Share2 } from 'lucide-react';
import { useVoxImplant } from '../hooks/useVoxImplant';

export default function CallUI() {
  const { activeCall, callState, endCall, toggleAudio, toggleVideo, remoteStream, localStream } = useVoxImplant();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  if (!activeCall) {
    return null;
  }

  const handleToggleMic = () => {
    toggleAudio(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleToggleVideo = () => {
    toggleVideo(!isVideoOn);
    setIsVideoOn(!isVideoOn);
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
      {/* Remote Video */}
      <div className="flex-1 bg-slate-800 relative">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Local Video - Picture in Picture */}
        <div className="absolute bottom-4 right-4 w-40 h-32 bg-slate-700 rounded-lg overflow-hidden border-2 border-slate-600">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Call Info & Controls */}
      <div className="bg-slate-800 p-6 flex items-center justify-between">
        <div className="text-white">
          <h3 className="text-lg font-semibold">{activeCall.targetUser}</h3>
          <p className="text-sm text-slate-400">Chamada ativa</p>
        </div>

        <div className="flex gap-4">
          {/* Mute Button */}
          <button
            onClick={handleToggleMic}
            className={`p-4 rounded-full transition-all ${
              isMuted
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-slate-600 hover:bg-slate-700'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Video Button */}
          <button
            onClick={handleToggleVideo}
            className={`p-4 rounded-full transition-all ${
              !isVideoOn
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-slate-600 hover:bg-slate-700'
            }`}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6 text-white" />
            ) : (
              <VideoOff className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Share Button */}
          <button className="p-4 rounded-full bg-slate-600 hover:bg-slate-700 transition-all">
            <Share2 className="w-6 h-6 text-white" />
          </button>

          {/* Hang Up Button */}
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-all"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}