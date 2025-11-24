import React from 'react';

const RadioGroup = ({
  label,
  options = [],
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className = ''
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-body-sm font-medium text-neutral-text-primary">
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}
      
      <div className={`space-y-2 ${className}`}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              required={required}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              error 
                ? 'border-status-error' 
                : value === option.value 
                ? 'border-primary-blue' 
                : 'border-neutral-border hover:border-gray-400'
            } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
              {value === option.value && (
                <div className="w-2 h-2 rounded-full bg-primary-blue"></div>
              )}
            </div>
            <span className={`text-body ${disabled ? 'text-neutral-text-disabled' : 'text-neutral-text-primary'}`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
      
      {error && (
        <p className="text-error text-body-sm text-status-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;