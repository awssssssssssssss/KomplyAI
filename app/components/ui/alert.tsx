// Alert component
import React, { HTMLAttributes } from 'react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
}

export function Alert({ children, variant = 'info', title, className = '', ...props }: AlertProps) {
  const baseClasses = 'rounded-lg p-4 mb-4';
  
  const variantClasses = {
    success: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200',
    error: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };
  
  const titleClasses = {
    success: 'text-green-900 dark:text-green-100',
    error: 'text-red-900 dark:text-red-100',
    warning: 'text-yellow-900 dark:text-yellow-100',
    info: 'text-blue-900 dark:text-blue-100',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {title && (
        <h4 className={`font-medium mb-1 ${titleClasses[variant]}`}>
          {title}
        </h4>
      )
      }
      {children}
    </div>
  );
}
