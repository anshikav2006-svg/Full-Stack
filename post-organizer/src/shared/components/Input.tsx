import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-gray-600 font-body">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-roseGold/70">{icon}</span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full rounded-2xl border-2 border-babypink/40 bg-white/70 backdrop-blur-sm px-4 py-2.5 text-sm text-gray-700 font-body placeholder:text-gray-400 outline-none transition-all focus:border-roseGold/60 focus:ring-4 focus:ring-blush/20',
              icon && 'pl-10',
              error && 'border-red-300 focus:border-red-400 focus:ring-red-100',
              className,
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-500 font-body">{error}</span>}
      </div>
    );
  },
);
Input.displayName = 'Input';
