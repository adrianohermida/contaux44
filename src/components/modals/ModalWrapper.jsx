import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * ModalWrapper - Componente padrão para todos os modais
 * Garante consistência visual, acessibilidade e UX
 */
export default function ModalWrapper({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showBackdrop = true
}) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Tamanhos padronizados
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  useEffect(() => {
    if (!isOpen) return;

    // Salvar elemento com foco anterior
    previousFocusRef.current = document.activeElement;

    // Focar no modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';

    // Handler para Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Handler para click no backdrop
    const handleBackdropClick = (e) => {
      if (e.target === modalRef.current?.parentElement) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    if (showBackdrop) {
      modalRef.current?.parentElement?.addEventListener('click', handleBackdropClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (showBackdrop) {
        modalRef.current?.parentElement?.removeEventListener('click', handleBackdropClick);
      }
      document.body.style.overflow = 'unset';
      // Retornar foco ao elemento anterior
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose, showBackdrop]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        showBackdrop ? 'bg-black/50' : ''
      }`}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`bg-white rounded-lg shadow-lg w-full ${sizeClasses[size]} p-6 max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 
            id="modal-title"
            className="text-xl font-semibold text-slate-900"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Conteúdo */}
        {children}
      </div>
    </div>
  );
}