import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface PSSelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
}

export function PSSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  fullWidth = false,
}: PSSelectProps) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm text-[var(--ps-text-primary)] mb-2">
          {label}
          {required && <span className="text-[var(--ps-error)] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2 pr-10 rounded-lg appearance-none
            bg-[var(--ps-surface)] 
            border-2 transition-all duration-200
            text-[var(--ps-text-primary)]
            ${error 
              ? 'border-[var(--ps-error)] focus:border-[var(--ps-error)]' 
              : 'border-[var(--ps-border)] focus:border-[var(--ps-primary)]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            focus:outline-none focus:ring-2 focus:ring-offset-0
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ps-text-secondary)] pointer-events-none">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-[var(--ps-error)] mt-1">{error}</p>
      )}
    </div>
  );
}
