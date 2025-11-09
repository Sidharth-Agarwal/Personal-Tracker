import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Notification Context
 * Manages toast notifications throughout the app
 */

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Add a notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, warning, info)
   * @param {number} duration - Duration in ms (0 for persistent)
   * @returns {string} Notification ID
   */
  const addNotification = useCallback((message, type = NOTIFICATION_TYPES.INFO, duration = 3000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const notification = {
      id,
      message,
      type,
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after duration (if not persistent)
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  }, []);

  /**
   * Remove a notification
   * @param {string} id - Notification ID
   */
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  /**
   * Clear all notifications
   */
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Show success notification
   * @param {string} message - Success message
   * @param {number} duration - Duration in ms
   */
  const success = useCallback((message, duration = 3000) => {
    return addNotification(message, NOTIFICATION_TYPES.SUCCESS, duration);
  }, [addNotification]);

  /**
   * Show error notification
   * @param {string} message - Error message
   * @param {number} duration - Duration in ms (0 for persistent)
   */
  const error = useCallback((message, duration = 5000) => {
    return addNotification(message, NOTIFICATION_TYPES.ERROR, duration);
  }, [addNotification]);

  /**
   * Show warning notification
   * @param {string} message - Warning message
   * @param {number} duration - Duration in ms
   */
  const warning = useCallback((message, duration = 4000) => {
    return addNotification(message, NOTIFICATION_TYPES.WARNING, duration);
  }, [addNotification]);

  /**
   * Show info notification
   * @param {string} message - Info message
   * @param {number} duration - Duration in ms
   */
  const info = useCallback((message, duration = 3000) => {
    return addNotification(message, NOTIFICATION_TYPES.INFO, duration);
  }, [addNotification]);

  /**
   * Show notification with custom options
   * @param {object} options - Notification options
   */
  const notify = useCallback((options) => {
    const {
      message,
      type = NOTIFICATION_TYPES.INFO,
      duration = 3000,
    } = options;
    
    return addNotification(message, type, duration);
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
    notify,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};