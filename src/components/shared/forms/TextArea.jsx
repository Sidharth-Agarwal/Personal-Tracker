import React from 'react';

/**
 * TextArea Component
 * Reusable textarea field for multi-line text input
 */

const TextArea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  className = '',
  hint,
  showCharCount = false,
  ...props
}) => {
  const textareaId = `textarea-${name}`;
  const charCount = value?.length || 0;

  const baseTextareaClasses = `
    w-full px-4 py-2.5 rounded-lg border transition-all duration-200
    bg-bg-secondary text-text-primary
    placeholder:text-text-quaternary
    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
    disabled:opacity-50 disabled:cursor-not-allowed
    resize-none
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border'}
  `;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={textareaId}
          className="text-sm font-medium text-text-primary flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* TextArea Field */}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={baseTextareaClasses}
        {...props}
      />

      {/* Bottom Row: Hint/Error and Character Count */}
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Hint Text */}
          {hint && !error && (
            <p className="text-xs text-text-tertiary">{hint}</p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span>⚠</span>
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Character Count */}
        {(showCharCount || maxLength) && (
          <p className="text-xs text-text-tertiary">
            {charCount}
            {maxLength && ` / ${maxLength}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;