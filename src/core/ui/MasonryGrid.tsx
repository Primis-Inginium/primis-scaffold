import React from 'react';

interface MasonryGridProps {
  children: React.ReactNode;
  columns?: {
    default: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ 
  children,
  columns = {
    default: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
  }
}) => {
  return (
    <div className={`
      columns-1 
      sm:columns-2 
      lg:columns-3 
      xl:columns-4 
      gap-6 space-y-6
    `}>
      {children}
    </div>
  );
};
