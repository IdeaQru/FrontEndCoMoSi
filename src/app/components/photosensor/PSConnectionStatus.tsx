import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface PSConnectionStatusProps {
  isConnected: boolean;
  label?: string;
  showIcon?: boolean;
}

export function PSConnectionStatus({ 
  isConnected, 
  label,
  showIcon = true 
}: PSConnectionStatusProps) {
  return (
    <div className="inline-flex items-center gap-2">
      {showIcon && (
        isConnected ? (
          <Wifi className="w-5 h-5 text-[var(--ps-success)]" />
        ) : (
          <WifiOff className="w-5 h-5 text-[var(--ps-error)]" />
        )
      )}
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-[var(--ps-success)]' : 'bg-[var(--ps-error)]'
            }`}
          />
          {isConnected && (
            <>
              {/* Pulse ring 1 */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: 'var(--ps-success)',
                  opacity: 0.75,
                  animationDuration: '2s',
                }}
              />
              {/* Pulse ring 2 */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: 'var(--ps-success)',
                  opacity: 0.5,
                  animationDuration: '2s',
                  animationDelay: '0.5s',
                }}
              />
            </>
          )}
        </div>
        
        <span className="text-sm font-medium text-[var(--ps-text-primary)]">
          {label || (isConnected ? 'Connected' : 'Disconnected')}
        </span>
      </div>
    </div>
  );
}
