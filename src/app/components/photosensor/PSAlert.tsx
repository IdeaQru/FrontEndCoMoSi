import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

interface PSAlertProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const alertConfig = {
  info: {
    bg: 'var(--ps-info)',
    icon: Info,
    label: 'Information',
  },
  warning: {
    bg: 'var(--ps-accent)',
    icon: AlertTriangle,
    label: 'Warning',
  },
  success: {
    bg: 'var(--ps-success)',
    icon: CheckCircle,
    label: 'Success',
  },
  error: {
    bg: 'var(--ps-error)',
    icon: XCircle,
    label: 'Error',
  },
};

export function PSAlert({ 
  type, 
  title, 
  message, 
  dismissible = false,
  onDismiss 
}: PSAlertProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="rounded-lg p-4 ps-fade-in"
      style={{
        backgroundColor: `${config.bg}15`,
        border: `1px solid ${config.bg}40`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-5 h-5 mt-0.5"
          style={{ color: config.bg }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 
            className="font-semibold mb-1"
            style={{ color: config.bg }}
          >
            {title || config.label}
          </h4>
          <p className="text-sm text-[var(--ps-text-primary)]">
            {message}
          </p>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-[var(--ps-text-secondary)] hover:text-[var(--ps-text-primary)] transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
