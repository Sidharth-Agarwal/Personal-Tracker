import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNotification } from '../../../contexts/NotificationContext';

/**
 * Toast Component
 * Toast notification display
 */

const Toast = ({ notification }) => {
  const { removeNotification } = useNotification();

  const variants = {
    success: {
      icon: <CheckCircle size={20} />,
      bg: 'bg-green-500',
      text: 'text-green-500',
      border: 'border-green-500',
    },
    error: {
      icon: <XCircle size={20} />,
      bg: 'bg-red-500',
      text: 'text-red-500',
      border: 'border-red-500',
    },
    warning: {
      icon: <AlertTriangle size={20} />,
      bg: 'bg-orange-500',
      text: 'text-orange-500',
      border: 'border-orange-500',
    },
    info: {
      icon: <Info size={20} />,
      bg: 'bg-blue-500',
      text: 'text-blue-500',
      border: 'border-blue-500',
    },
  };

  const variant = variants[notification.type] || variants.info;

  return (
    <div className="bg-card-bg border border-border rounded-lg shadow-lg p-4 min-w-[320px] max-w-md animate-slide-in-right">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`${variant.text} flex-shrink-0`}>
          {variant.icon}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="text-sm font-medium text-text-primary">
            {notification.message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => removeNotification(notification.id)}
          className="text-text-tertiary hover:text-text-primary transition-colors flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

/**
 * ToastContainer Component
 * Container for all toast notifications
 */
export const ToastContainer = () => {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map(notification => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Toast;