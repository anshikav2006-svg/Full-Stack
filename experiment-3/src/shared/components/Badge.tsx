import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

type Tone = 'pink' | 'purple' | 'gold' | 'green' | 'gray';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  pink: 'bg-babypink/40 text-pink-700 border-babypink/60',
  purple: 'bg-pastelPurple/30 text-purple-700 border-pastelPurple/50',
  gold: 'bg-roseGold/20 text-roseGold border-roseGold/40',
  green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
};

export function Badge({ className, tone = 'pink', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold font-body',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
