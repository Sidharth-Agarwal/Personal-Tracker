import React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import Modal from './Modal';
import Button from '../buttons/Button';

/**
 * ConfirmModal Component
 * Confirmation dialog for destructive or important actions
 */

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  loading = false,
}) => {
  // Variant styles
  const variants = {
    warning: {
      icon: <AlertTriangle size={24} />,
      iconBg: 'bg-orange-500/10 text-orange-500',
      confirmVariant: 'danger',
    },
    danger: {
      icon: <XCircle size={24} />,
      iconBg: 'bg-red-500/10 text-red-500',
      confirmVariant: 'danger',
    },
    info: {
      icon: <Info size={24} />,
      iconBg: 'bg-blue-500/10 text-blue-500',
      confirmVariant: 'primary',
    },
    success: {
      icon: <CheckCircle size={24} />,
      iconBg: 'bg-green-500/10 text-green-500',
      confirmVariant: 'success',
    },
  };

  const currentVariant = variants[variant] || variants.warning;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
    >
      {/* Content */}
      <div className="text-center">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-full ${currentVariant.iconBg} flex items-center justify-center mx-auto mb-4`}>
          {currentVariant.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-text-secondary mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={currentVariant.confirmVariant}
            onClick={handleConfirm}
            loading={loading}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;