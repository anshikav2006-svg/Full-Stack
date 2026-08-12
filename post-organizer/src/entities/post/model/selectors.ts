import type { RootState } from '@/app/store';

export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectFavorites = (state: RootState) => state.posts.favorites;
export const selectPostById = (id: string) => (state: RootState) =>
  state.posts.items.find((p) => p.id === id);
