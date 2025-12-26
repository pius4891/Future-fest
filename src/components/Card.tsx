import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 shadow-lg ${
        hover ? 'hover:shadow-purple-500/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
