import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../buttons/Button';

/**
 * ErrorMessage Component
 * Display error messages with retry option
 */

const ErrorMessage = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try again',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 px-4 text-center ${className}`}>
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
        <AlertCircle size={32} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>

      {/* Message */}
      {message && (
        <p className="text-text-tertiary max-w-md mb-6">
          {message}
        </p>
      )}

      {/* Retry Button */}
      {onRetry && (
        <Button
          variant="primary"
          onClick={onRetry}
          icon={<RefreshCw size={18} />}
        >
          {retryText}
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;