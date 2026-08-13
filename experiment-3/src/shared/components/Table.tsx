import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
}

export function Table<T>({ columns, data, keyExtractor, emptyMessage = 'No data found' }: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/60 bg-white/50 py-16 text-center text-gray-400 font-body">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl shadow-soft">
      <table className="w-full text-left text-sm font-body">
        <thead>
          <tr className="border-b border-babypink/30 bg-babypink/10">
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 font-semibold text-gray-600">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className="border-b border-babypink/10 transition-colors last:border-0 hover:bg-babypink/10"
            >
              {columns.map((col) => (
                <td key={col.header} className={cn('px-4 py-3 text-gray-600', col.className)}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
