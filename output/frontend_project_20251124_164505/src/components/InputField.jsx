import React, { useState } from 'react';

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  success,
  helperText,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = 'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2';
  
  const stateClasses = error 
    ? 'border-status-error focus:ring-red-500 bg-red-50' 
    : success 
    ? 'border-status-success focus:ring-green-500 bg-green-50'
    : isFocused 
    ? 'border-primary-blue focus:ring-blue-500 bg-white'
    : 'border-neutral-border bg-white hover:border-gray-400';

  const disabledClasses = 'bg-neutral-surface text-neutral-text-disabled cursor-not-allowed';

  const classes = [
    baseClasses,
    disabled ? disabledClasses : stateClasses,
    className
  ].join(' ');

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-body-sm font-medium text-neutral-text-primary">
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={classes}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {(error || success || helperText) && (
        <p className={`text-error text-body-sm ${
          error ? 'text-status-error' : 
          success ? 'text-status-success' : 
          'text-neutral-text-secondary'
        }`}>
          {error || success || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;