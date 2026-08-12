import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-xl p-2 text-roseGold transition-colors hover:bg-babypink/30 disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, i) => (
        <span key={p} className="flex items-center">
          {i > 0 && pages[i - 1] !== p - 1 && <span className="px-1 text-gray-300">…</span>}
          <button
            onClick={() => onChange(p)}
            className={cn(
              'h-9 w-9 rounded-xl text-sm font-semibold font-body transition-colors',
              p === page
                ? 'bg-gradient-to-r from-babypink to-pastelPurple text-white shadow-soft'
                : 'text-gray-500 hover:bg-babypink/20',
            )}
          >
            {p}
          </button>
        </span>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-xl p-2 text-roseGold transition-colors hover:bg-babypink/30 disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
