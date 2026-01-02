import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { PSButton } from './PSButton';

interface PSModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function PSModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md' 
}: PSModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${sizeMap[size]} bg-[var(--ps-surface)] rounded-xl ps-card-shadow-lg transform transition-all ps-fade-in`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--ps-border)]">
            <h2 className="text-lg sm:text-xl text-[var(--ps-text-primary)]">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--ps-text-secondary)] hover:text-[var(--ps-text-primary)] transition-colors p-1 rounded-lg hover:bg-[var(--ps-surface-hover)]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-[var(--ps-border)]">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
