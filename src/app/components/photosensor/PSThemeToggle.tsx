import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function PSThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-[var(--ps-surface)] border border-[var(--ps-border)] hover:bg-[var(--ps-surface-hover)] transition-all duration-200"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[var(--ps-accent)]" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--ps-primary)]" />
      )}
    </button>
  );
}
