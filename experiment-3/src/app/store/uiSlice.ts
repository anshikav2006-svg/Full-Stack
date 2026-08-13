import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PostFilters, SortOption } from '@/shared/types';
import { storage } from '@/shared/lib';
import { STORAGE_KEYS } from '@/shared/constants';

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  searchQuery: string;
  filters: PostFilters;
  sort: SortOption;
}

const defaultFilters: PostFilters = { category: 'all', status: 'all', author: 'all' };

const initialState: UiState = {
  theme: storage.get(STORAGE_KEYS.THEME, 'light'),
  sidebarOpen: false,
  searchQuery: '',
  filters: storage.get(STORAGE_KEYS.FILTERS, defaultFilters),
  sort: 'newest',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      storage.set(STORAGE_KEYS.THEME, state.theme);
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<PostFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      storage.set(STORAGE_KEYS.FILTERS, state.filters);
    },
    resetFilters(state) {
      state.filters = defaultFilters;
      storage.set(STORAGE_KEYS.FILTERS, defaultFilters);
    },
    setSort(state, action: PayloadAction<SortOption>) {
      state.sort = action.payload;
    },
  },
});

export const { toggleTheme, setSidebarOpen, setSearchQuery, setFilters, resetFilters, setSort } =
  uiSlice.actions;
export default uiSlice.reducer;
