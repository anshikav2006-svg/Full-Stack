import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Oops, something went wrong',
  description = 'Please try again in a moment.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-red-200 bg-red-50/60 py-20 text-center">
      <div className="rounded-full bg-red-100 p-4 text-red-500">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="font-display text-lg font-bold text-gray-600">{title}</h3>
      <p className="max-w-xs text-sm text-gray-400 font-body">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
