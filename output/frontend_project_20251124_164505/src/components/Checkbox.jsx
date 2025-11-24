import React from 'react';

const Checkbox = ({
  label,
  checked,
  onChange,
  required = false,
  disabled = false,
  error,
  className = ''
}) => {
  const baseClasses = 'w-4 h-4 rounded border border-neutral-border focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  
  const stateClasses = error 
    ? 'border-status-error bg-red-50' 
    : checked 
    ? 'bg-primary-blue border-primary-blue text-white'
    : 'bg-white hover:border-gray-400';

  const disabledClasses = 'bg-neutral-surface border-neutral-border cursor-not-allowed';

  const classes = [
    baseClasses,
    disabled ? disabledClasses : stateClasses,
    className
  ].join(' ');

  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="sr-only"
        />
        <div className={classes}>
          {checked && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className={`text-body ${disabled ? 'text-neutral-text-disabled' : 'text-neutral-text-primary'}`}>
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </span>
      </label>
      
      {error && (
        <p className="text-error text-body-sm text-status-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;