import React from 'react';

/**
 * IconButton Component
 * Button with only an icon (no text)
 */

const IconButton = ({
  icon,
  onClick,
  variant = 'ghost',
  size = 'md',
  type = 'button',
  disabled = false,
  ariaLabel,
  tooltip,
  className = '',
  ...props
}) => {
  // Variant styles
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accent-hover',
    secondary: 'bg-bg-tertiary text-text-primary hover:bg-border',
    ghost: 'bg-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };

  // Size styles
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
    ${variantClasses[variant] || variantClasses.ghost}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={tooltip}
      className={baseClasses}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;