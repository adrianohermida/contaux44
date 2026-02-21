import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ToastNotification({ message, type = 'success', onClose }) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  const colors = {
    success: 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700',
    error: 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700',
    info: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700',
  };

  const textColors = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    info: 'text-blue-800 dark:text-blue-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`${colors[type]} border rounded-lg p-4 shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}
    >
      {icons[type]}
      <p className={`${textColors[type]} text-sm font-medium flex-1`}>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className={`${textColors[type]} hover:opacity-70 transition-opacity`}
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}