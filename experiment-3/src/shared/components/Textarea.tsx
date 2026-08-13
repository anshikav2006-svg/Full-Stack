import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-gray-600 font-body">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-2xl border-2 border-babypink/40 bg-white/70 backdrop-blur-sm px-4 py-2.5 text-sm text-gray-700 font-body placeholder:text-gray-400 outline-none transition-all focus:border-roseGold/60 focus:ring-4 focus:ring-blush/20 resize-none',
            error && 'border-red-300 focus:border-red-400 focus:ring-red-100',
            className,
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-body">{error}</span>}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
