import { Filter, RotateCcw } from 'lucide-react';
import { Select, Button } from '@/shared/components';
import { CATEGORIES } from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { setFilters, resetFilters } from '@/app/store/uiSlice';

export function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.ui.filters);
  const posts = useAppSelector((s) => s.posts.items);
  const authors = Array.from(new Set(posts.map((p) => p.author))).sort();

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex items-center gap-1.5 pb-2.5 text-sm font-semibold text-roseGold font-body">
        <Filter className="h-4 w-4" /> Filters
      </div>
      <div className="w-40">
        <Select
          value={filters.category}
          onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>
      <div className="w-36">
        <Select
          value={filters.status}
          onChange={(e) => dispatch(setFilters({ status: e.target.value as any }))}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </Select>
      </div>
      <div className="w-40">
        <Select
          value={filters.author}
          onChange={(e) => dispatch(setFilters({ author: e.target.value }))}
        >
          <option value="all">All Authors</option>
          {authors.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>
      </div>
      <Button variant="ghost" size="sm" onClick={() => dispatch(resetFilters())}>
        <RotateCcw className="h-4 w-4" /> Reset
      </Button>
    </div>
  );
}
