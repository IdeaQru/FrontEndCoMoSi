import React from 'react';
import { Activity } from 'lucide-react';

interface PSHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function PSHeader({ 
  title = "Photosensor Monitoring System", 
  subtitle = "Real-time monitoring and analytics",
  showLogo = true 
}: PSHeaderProps) {
  return (
    <header className="w-full bg-[var(--ps-primary)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-4">
          {showLogo && (
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-white/80 mt-1 truncate">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
