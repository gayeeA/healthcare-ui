import { useEffect } from 'react';

import type { Toast } from '../../types';
// import { useToast as useToastHook } from '../../hooks/useToast';
import { cn } from '../../lib/utils';

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export function ToastComponent({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
        toast.type === 'success' && 'border-success bg-success text-success-foreground',
        toast.type === 'error' && 'border-destructive bg-destructive text-destructive-foreground',
        toast.type === 'info' && 'border-primary bg-primary text-primary-foreground',
        toast.type === 'warning' && 'border-yellow-500 bg-yellow-500/10 text-yellow-500 border-yellow-500/50'
      )}
    >
      <p className="flex flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        className="ml-1 flex h-8 w-8 items-center justify-center rounded-full p-1 opacity-50 transition-opacity hover:opacity-100"
        onClick={() => onRemove(toast.id)}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default ToastComponent;

