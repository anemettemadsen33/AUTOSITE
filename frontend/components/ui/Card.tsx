import React, { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'featured' | 'gradient' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-xl transition-all duration-300';

    const variants = {
      default: 'bg-white shadow-md',
      hover: 'bg-white shadow-md hover:shadow-xl',
      featured: 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl',
      gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-transparent shadow-md',
      bordered: 'bg-white border-2 border-gray-200 hover:border-blue-300',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const hoverEffect = hoverable ? 'transform hover:-translate-y-1 cursor-pointer' : '';

    const classes = clsx(
      baseStyles,
      variants[variant],
      paddings[padding],
      hoverEffect,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components
export const CardHeader = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={clsx('text-xl font-bold text-gray-900', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={clsx('text-gray-600 text-sm mt-1', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('mt-6 pt-4 border-t border-gray-200', className)} {...props}>
    {children}
  </div>
);

export default Card;
