import React from 'react';
import { Clock } from 'lucide-react';

/**
 * TimePicker Component
 * Time input with clock icon
 */

const TimePicker = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  min,
  max,
  className = '',
  hint,
  showNowButton = true,
  ...props
}) => {
  const inputId = `time-${name}`;

  const handleNowClick = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeValue = `${hours}:${minutes}`;
    
    const event = {
      target: { name, value: timeValue }
    };
    onChange(event);
  };

  const baseInputClasses = `
    w-full px-4 py-2.5 pl-11 rounded-lg border transition-all duration-200
    bg-bg-secondary text-text-primary
    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border'}
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
      <div className="relative flex gap-2">
        {/* Clock Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
          <Clock size={20} />
        </div>

        {/* Time Input */}
        <input
          id={inputId}
          type="time"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          className={`${baseInputClasses} flex-1`}
          {...props}
        />

        {/* Now Button */}
        {showNowButton && !disabled && (
          <button
            type="button"
            onClick={handleNowClick}
            className="px-3 py-2 text-sm font-medium text-accent border border-accent 
                     rounded-lg hover:bg-accent hover:text-white transition-colors"
          >
            Now
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

export default TimePicker;