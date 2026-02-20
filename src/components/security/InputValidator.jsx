import React, { useMemo } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const InputValidator = ({ value, type = 'text', fieldName = '', showFeedback = true }) => {
  const validation = useMemo(() => {
    const validators = {
      email: {
        test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        error: 'Email inválido',
        sanitize: (v) => v.trim().toLowerCase()
      },
      url: {
        test: (v) => {
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        error: 'URL inválida',
        sanitize: (v) => v.trim()
      },
      number: {
        test: (v) => !isNaN(v) && v.trim() !== '',
        error: 'Deve ser um número',
        sanitize: (v) => v.replace(/[^\d.-]/g, '')
      },
      phone: {
        test: (v) => /^\d{10,11}$/.test(v.replace(/\D/g, '')),
        error: 'Telefone inválido (10-11 dígitos)',
        sanitize: (v) => v.replace(/\D/g, '')
      },
      text: {
        test: (v) => v.trim().length > 0 && v.length <= 500,
        error: 'Texto inválido (máx 500 caracteres)',
        sanitize: (v) => v.trim().substring(0, 500)
      }
    };

    const validator = validators[type] || validators.text;
    const isValid = value ? validator.test(value) : true;
    const sanitized = value ? validator.sanitize(value) : '';

    // XSS Prevention
    const xssTest = /<[^>]*>|javascript:|on\w+\s*=/i.test(value);
    const isSafe = !xssTest;

    return {
      isValid,
      sanitized,
      error: !isValid ? validator.error : null,
      isSafe,
      xssWarning: !isSafe ? 'Conteúdo potencialmente perigoso detectado' : null
    };
  }, [value, type]);

  if (!showFeedback) return null;

  if (!value) return null;

  return (
    <div className={`flex items-center gap-2 text-sm mt-1 ${
      validation.isSafe && validation.isValid
        ? 'text-emerald-600'
        : 'text-amber-600'
    }`}>
      {validation.isSafe && validation.isValid ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          <span>Validado</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4" />
          <span>{validation.xssWarning || validation.error}</span>
        </>
      )}
    </div>
  );
};

export const sanitizeInput = (value, type = 'text') => {
  const validators = {
    email: (v) => v.trim().toLowerCase(),
    url: (v) => v.trim(),
    number: (v) => v.replace(/[^\d.-]/g, ''),
    phone: (v) => v.replace(/\D/g, ''),
    text: (v) => v.trim().substring(0, 500)
  };
  
  const sanitizer = validators[type] || validators.text;
  const sanitized = sanitizer(value);
  
  // Remove potential XSS
  return sanitized.replace(/<[^>]*>|javascript:|on\w+\s*=/gi, '');
};

export const validateInput = (value, type = 'text') => {
  const validators = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    url: (v) => {
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    },
    number: (v) => !isNaN(v) && v.trim() !== '',
    phone: (v) => /^\d{10,11}$/.test(v.replace(/\D/g, '')),
    text: (v) => v.trim().length > 0 && v.length <= 500
  };
  
  const validator = validators[type] || validators.text;
  return validator(value);
};

export default InputValidator;