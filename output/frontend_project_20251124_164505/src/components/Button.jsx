import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  onClick,
  type = 'button',
  className = ''
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-blue text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-neutral-surface text-neutral-text-primary border border-neutral-border hover:bg-gray-50 focus:ring-blue-500',
    success: 'bg-status-success text-white hover:bg-green-600 focus:ring-green-500',
    danger: 'bg-status-error text-white hover:bg-red-600 focus:ring-red-500',
    warning: 'bg-status-warning text-white hover:bg-yellow-600 focus:ring-yellow-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-body',
    lg: 'px-6 py-3 text-body-lg'
  };

  const disabledClasses = 'bg-primary-disabled text-neutral-text-disabled cursor-not-allowed';

  const classes = [
    baseClasses,
    disabled ? disabledClasses : variantClasses[variant],
    sizeClasses[size],
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;