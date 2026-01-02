import React from 'react';
import { LayoutDashboard, Activity, FileText, LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface PSNavigationFooterProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'monitor', label: 'Monitor', icon: Activity },
  { id: 'logs', label: 'Logs', icon: FileText },
];

export function PSNavigationFooter({ activeTab, onTabChange }: PSNavigationFooterProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--ps-surface)] border-t border-[var(--ps-border)] shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex flex-col items-center justify-center py-3 sm:py-4 transition-all duration-200 ${
                  isActive 
                    ? 'text-[var(--ps-primary)]' 
                    : 'text-[var(--ps-text-secondary)] hover:text-[var(--ps-text-primary)]'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--ps-accent-light)' : 'transparent',
                }}
              >
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-b-full"
                    style={{ backgroundColor: 'var(--ps-accent)' }}
                  />
                )}
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
