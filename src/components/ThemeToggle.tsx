import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'sleek' | 'contrast'>('sleek');

  useEffect(() => {
    // Load saved theme from localStorage or fallback to default
    const savedTheme = (localStorage.getItem('pv-theme') as 'sleek' | 'contrast') || 'sleek';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'sleek' ? 'contrast' : 'sleek';
    setTheme(nextTheme);
    localStorage.setItem('pv-theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1.5 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border bg-[var(--card-bg)] text-[var(--accent-cyan)] border-[var(--border-color)] hover:scale-105 shadow-md"
      title="Toggle Theme"
    >
      <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse"></span>
      {theme === 'sleek' ? '⚡ SLEEK' : '📟 OLED CONTRAST'}
    </button>
  );
}