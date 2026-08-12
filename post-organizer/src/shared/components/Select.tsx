import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-gray-600 font-body">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              'w-full appearance-none rounded-2xl border-2 border-babypink/40 bg-white/70 backdrop-blur-sm px-4 py-2.5 pr-10 text-sm text-gray-700 font-body outline-none transition-all focus:border-roseGold/60 focus:ring-4 focus:ring-blush/20',
              error && 'border-red-300',
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-roseGold/60" />
        </div>
        {error && <span className="text-xs text-red-500 font-body">{error}</span>}
      </div>
    );
  },
);
Select.displayName = 'Select';
