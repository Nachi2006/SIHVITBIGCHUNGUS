import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer compass ring */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#spaceGradient)"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Inner compass directions */}
        <g stroke="url(#spaceGradient)" strokeWidth="1.5" strokeLinecap="round">
          {/* North */}
          <line x1="20" y1="4" x2="20" y2="10" />
          {/* South */}
          <line x1="20" y1="30" x2="20" y2="36" />
          {/* East */}
          <line x1="36" y1="20" x2="30" y2="20" />
          {/* West */}
          <line x1="4" y1="20" x2="10" y2="20" />
        </g>
        
        {/* Compass needle */}
        <g>
          {/* North pointer (cosmic purple) */}
          <path
            d="M20 8 L16 16 L20 14 L24 16 Z"
            fill="url(#spaceGradient)"
          />
          {/* South pointer (space teal) */}
          <path
            d="M20 32 L16 24 L20 26 L24 24 Z"
            fill="url(#spaceGradient2)"
          />
        </g>
        
        {/* Center dot */}
        <circle cx="20" cy="20" r="3" fill="url(#spaceGradient)" />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="spaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="spaceGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
