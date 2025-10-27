import React, { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  closable = false,
  onClose,
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-lg p-4 flex items-start gap-3 shadow-sm border-l-4';

  const variants = {
    info: 'bg-blue-50 border-blue-500 text-blue-900',
    success: 'bg-green-50 border-green-500 text-green-900',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
    error: 'bg-red-50 border-red-500 text-red-900',
  };

  const iconVariants = {
    info: <InformationCircleIcon className="w-5 h-5 text-blue-500" />,
    success: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
    warning: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />,
    error: <XCircleIcon className="w-5 h-5 text-red-500" />,
  };

  const defaultIcon = iconVariants[variant];

  return (
    <div className={clsx(baseStyles, variants[variant], className)} role="alert" {...props}>
      <div className="flex-shrink-0 mt-0.5">{icon || defaultIcon}</div>
      
      <div className="flex-1">
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>

      {closable && onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';

export default Alert;
