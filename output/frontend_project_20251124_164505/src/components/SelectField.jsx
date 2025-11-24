import React, { useState } from 'react';

const SelectField = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  error,
  success,
  helperText,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = 'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 appearance-none bg-white';
  
  const stateClasses = error 
    ? 'border-status-error focus:ring-red-500 bg-red-50' 
    : success 
    ? 'border-status-success focus:ring-green-500 bg-green-50'
    : isFocused 
    ? 'border-primary-blue focus:ring-blue-500'
    : 'border-neutral-border hover:border-gray-400';

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
      
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={classes}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-text-secondary">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
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

export default SelectField;