import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button Component
 * Reusable button with multiple variants and states
 */

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  rightIcon,
  className = '',
  ...props
}) => {
  // Variant styles
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accent-hover active:scale-95',
    secondary: 'bg-bg-tertiary text-text-primary hover:bg-border border border-border',
    outline: 'bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-white',
    ghost: 'bg-transparent text-text-primary hover:bg-bg-tertiary',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95',
    success: 'bg-green-500 text-white hover:bg-green-600 active:scale-95',
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${fullWidth ? 'w-full' : ''}
    ${loading ? 'cursor-wait' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && <Loader2 size={18} className="animate-spin" />}
      
      {/* Left Icon */}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      
      {/* Button Text */}
      <span>{children}</span>
      
      {/* Right Icon */}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;