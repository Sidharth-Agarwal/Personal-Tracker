import React from 'react';
import { Minus, Plus } from 'lucide-react';

/**
 * NumberInput Component
 * Number input with increment/decrement buttons
 */

const NumberInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  min = 0,
  max,
  step = 1,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  hint,
  unit,
  showButtons = true,
  ...props
}) => {
  const inputId = `number-input-${name}`;

  const handleIncrement = () => {
    const newValue = parseFloat(value || 0) + step;
    if (!max || newValue <= max) {
      const event = {
        target: { name, value: newValue.toString() }
      };
      onChange(event);
    }
  };

  const handleDecrement = () => {
    const newValue = parseFloat(value || 0) - step;
    if (newValue >= min) {
      const event = {
        target: { name, value: newValue.toString() }
      };
      onChange(event);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    // Allow empty string for user to type
    if (newValue === '') {
      onChange(e);
      return;
    }
    
    const numValue = parseFloat(newValue);
    
    // Validate min/max
    if (!isNaN(numValue)) {
      if ((min !== undefined && numValue < min) || (max !== undefined && numValue > max)) {
        return;
      }
    }
    
    onChange(e);
  };

  const baseInputClasses = `
    w-full px-4 py-2.5 rounded-lg border transition-all duration-200
    bg-bg-secondary text-text-primary
    placeholder:text-text-quaternary
    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
    disabled:opacity-50 disabled:cursor-not-allowed
    text-center
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border'}
    ${showButtons ? 'pl-12 pr-12' : ''}
    ${unit ? 'pr-16' : ''}
  `;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="text-sm font-medium text-text-primary flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative flex items-center">
        {/* Decrement Button */}
        {showButtons && (
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || (min !== undefined && parseFloat(value || 0) <= min)}
            className="absolute left-1 z-10 p-2 rounded-md hover:bg-bg-tertiary 
                     disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrement"
          >
            <Minus size={16} className="text-text-secondary" />
          </button>
        )}

        {/* Input Field */}
        <input
          id={inputId}
          type="number"
          name={name}
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          className={baseInputClasses}
          {...props}
        />

        {/* Unit Label */}
        {unit && (
          <span className="absolute right-12 text-sm text-text-tertiary pointer-events-none">
            {unit}
          </span>
        )}

        {/* Increment Button */}
        {showButtons && (
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && parseFloat(value || 0) >= max)}
            className="absolute right-1 z-10 p-2 rounded-md hover:bg-bg-tertiary 
                     disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Increment"
          >
            <Plus size={16} className="text-text-secondary" />
          </button>
        )}
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

export default NumberInput;