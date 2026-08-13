import { ArrowUpDown } from 'lucide-react';
import { Select } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { setSort } from '@/app/store/uiSlice';
import type { SortOption } from '@/shared/types';

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'mostViewed', label: 'Most viewed' },
  { value: 'mostLiked', label: 'Most liked' },
  { value: 'alphabetical', label: 'Alphabetical (A–Z)' },
];

export function SortDropdown() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((s) => s.ui.sort);

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-roseGold" />
      <div className="w-44">
        <Select value={sort} onChange={(e) => dispatch(setSort(e.target.value as SortOption))}>
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
