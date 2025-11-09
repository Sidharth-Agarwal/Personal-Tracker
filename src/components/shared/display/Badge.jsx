import React from 'react';

/**
 * Badge Component
 * Small label to display status, category, or count
 */

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) => {
  // Variant styles
  const variantClasses = {
    default: 'bg-bg-tertiary text-text-primary border border-border',
    primary: 'bg-accent/10 text-accent border border-accent/20',
    success: 'bg-green-500/10 text-green-500 border border-green-500/20',
    warning: 'bg-orange-500/10 text-orange-500 border border-orange-500/20',
    danger: 'bg-red-500/10 text-red-500 border border-red-500/20',
    info: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-1
    rounded-full font-medium whitespace-nowrap
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  return (
    <span className={baseClasses}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;