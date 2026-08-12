import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/shared/components';
import { useAppDispatch, useAppSelector, useDebounce } from '@/shared/hooks';
import { setSearchQuery } from '@/app/store/uiSlice';

export function SearchBar() {
  const dispatch = useAppDispatch();
  const storeQuery = useAppSelector((s) => s.ui.searchQuery);
  const [value, setValue] = useState(storeQuery);
  const debounced = useDebounce(value, 250);

  useEffect(() => {
    dispatch(setSearchQuery(debounced));
  }, [debounced, dispatch]);

  return (
    <div className="relative">
      <Input
        icon={<Search className="h-4 w-4" />}
        placeholder="Search posts, authors, tags…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-roseGold"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
