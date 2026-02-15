import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * FormField - Componente padrão para campos de formulário
 * Garante consistência visual e acessibilidade
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
  options, // para select
  rows, // para textarea
  ...props
}) {
  // Indicador de campo obrigatório
  const requiredIndicator = required ? <span className="text-red-500 ml-1">*</span> : null;

  // Select
  if (type === 'select' && options) {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}
          {requiredIndicator}
        </label>
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger id={name} className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder={placeholder || `Selecione ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }

  // Textarea
  if (type === 'textarea') {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
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
          className={error ? 'border-red-500' : ''}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }

  // Input padrão
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
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
        className={error ? 'border-red-500' : ''}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}