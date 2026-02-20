import React from 'react';
import { Input } from '@/components/ui/input';

export default function ContactFormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  disabled,
  error,
  placeholder,
  maxLength,
  formatFn,
}) {
  const handleChange = (e) => {
    let newValue = e.target.value;
    if (formatFn) {
      newValue = formatFn(newValue);
    }
    onChange({ ...e, target: { ...e.target, value: newValue } });
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">
        {label}
      </label>
      <Input
        name={name}
        type={type}
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`disabled:opacity-60 ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}