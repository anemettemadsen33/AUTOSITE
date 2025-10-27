import React from 'react';
import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseStyles = 'bg-gray-200';
  
  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
  };

  const variantStyles = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'circular' ? width : undefined),
  };

  return (
    <div
      className={clsx(baseStyles, animationStyles[animation], variantStyles[variant], className)}
      style={style}
    />
  );
};

// Preset skeleton components for common use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx('bg-white rounded-xl p-6 shadow-md', className)}>
    <Skeleton variant="rectangular" height="200px" className="mb-4" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" width="60%" className="mb-4" />
    <div className="flex gap-2">
      <Skeleton variant="text" width="80px" />
      <Skeleton variant="text" width="80px" />
    </div>
  </div>
);

export const SkeletonVehicleCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <Skeleton variant="rectangular" height="200px" />
    <div className="p-4">
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" width="70%" className="mb-3" />
      <div className="flex justify-between items-center">
        <Skeleton variant="text" width="100px" />
        <Skeleton variant="text" width="80px" />
      </div>
    </div>
  </div>
);

export const SkeletonList: React.FC<{ items?: number }> = ({ items = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex gap-4">
        <Skeleton variant="circular" width="48px" height="48px" />
        <div className="flex-1">
          <Skeleton variant="text" className="mb-2" />
          <Skeleton variant="text" width="80%" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
