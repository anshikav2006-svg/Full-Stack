import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title = 'Nothing here yet',
  description = 'Try adjusting your search or filters ✨',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-babypink/50 bg-white/40 py-20 text-center">
      <div className="rounded-full bg-babypink/30 p-4 text-roseGold">{icon ?? <Sparkles className="h-8 w-8" />}</div>
      <h3 className="font-display text-lg font-bold text-gray-600">{title}</h3>
      <p className="max-w-xs text-sm text-gray-400 font-body">{description}</p>
      {action}
    </div>
  );
}
