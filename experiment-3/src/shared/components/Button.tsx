import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-babypink via-blush to-pastelPurple text-white shadow-soft hover:shadow-glow hover:scale-[1.02]',
  secondary: 'bg-lavender/60 text-purple-800 hover:bg-lavender/80',
  outline: 'border-2 border-roseGold/40 text-roseGold bg-transparent hover:bg-roseGold/10',
  ghost: 'bg-transparent text-gray-600 hover:bg-babypink/20',
  danger: 'bg-gradient-to-r from-rose-400 to-red-400 text-white hover:shadow-soft',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-2xl',
  lg: 'px-7 py-3.5 text-base rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold font-body transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
        ) : null}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
