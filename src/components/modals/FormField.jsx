import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * FormField - Componente padrão para campos de formulário
 * ✅ Dark mode, ARIA labels, error descriptions
 */
export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder,
  options,
  rows,
  ...props
}) {
  const errorId = error ? `${name}-error` : undefined;
  // Indicador de campo obrigatório
  const requiredIndicator = required ? <span className="text-red-500 dark:text-red-400 ml-1" aria-label="obrigatório">*</span> : null;

  // Select
  if (type === 'select' && options) {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {requiredIndicator}
        </label>
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger id={name} className={`dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 ${error ? 'border-red-500 dark:border-red-500' : ''}`} aria-describedby={errorId} aria-invalid={!!error}>
            <SelectValue placeholder={placeholder || `Selecione ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
            {options.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <span id={errorId} className="text-xs text-red-500 dark:text-red-400">{error}</span>}
      </div>
    );
  }

  // Textarea
  if (type === 'textarea') {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {requiredIndicator}
        </label>
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 3}
          disabled={disabled}
          className={`dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500 ${error ? 'border-red-500 dark:border-red-500' : ''}`}
          aria-describedby={errorId}
          aria-invalid={!!error}
          {...props}
        />
        {error && <span id={errorId} className="text-xs text-red-500 dark:text-red-400">{error}</span>}
      </div>
    );
  }

  // Input padrão
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {requiredIndicator}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500 ${error ? 'border-red-500 dark:border-red-500' : ''}`}
        aria-describedby={errorId}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span id={errorId} className="text-xs text-red-500 dark:text-red-400">{error}</span>}
    </div>
  );
}