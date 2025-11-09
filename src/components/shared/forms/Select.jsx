import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Select Component
 * Reusable dropdown select field
 */

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  className = '',
  hint,
  groupedOptions = false,
  ...props
}) => {
  const selectId = `select-${name}`;

  const baseSelectClasses = `
    w-full px-4 py-2.5 pr-10 rounded-lg border transition-all duration-200
    bg-bg-secondary text-text-primary
    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none cursor-pointer
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border'}
  `;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={selectId}
          className="text-sm font-medium text-text-primary flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={baseSelectClasses}
          {...props}
        >
          {/* Placeholder */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {/* Grouped Options */}
          {groupedOptions ? (
            options.map((group, groupIndex) => (
              <optgroup key={groupIndex} label={group.label}>
                {group.options.map((option, optionIndex) => (
                  <option 
                    key={optionIndex} 
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))
          ) : (
            /* Regular Options */
            options.map((option, index) => (
              <option 
                key={index} 
                value={option.value} 
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))
          )}
        </select>

        {/* Chevron Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary">
          <ChevronDown size={20} />
        </div>
      </div>

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
  );
};

export default Select;