import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '@/shared/types';
import { storage, generateId } from '@/shared/lib';
import { STORAGE_KEYS } from '@/shared/constants';
import { generateMockPosts } from '@/shared/utils';

interface PostsState {
  items: Post[];
  favorites: string[];
}

function loadInitialPosts(): Post[] {
  const stored = storage.get<Post[] | null>(STORAGE_KEYS.POSTS, null);
  if (stored && stored.length > 0) return stored;
  const mock = generateMockPosts(50);
  storage.set(STORAGE_KEYS.POSTS, mock);
  return mock;
}

const initialState: PostsState = {
  items: loadInitialPosts(),
  favorites: storage.get<string[]>(STORAGE_KEYS.FAVORITES, []),
};

function persist(items: Post[]) {
  storage.set(STORAGE_KEYS.POSTS, items);
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.items.unshift(action.payload);
        persist(state.items);
      },
      prepare(payload: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'views'>) {
        const now = new Date().toISOString();
        return {
          payload: {
            ...payload,
            id: generateId('post'),
            createdAt: now,
            updatedAt: now,
            likes: 0,
            views: 0,
          },
        };
      },
    },
    updatePost(state, action: PayloadAction<Partial<Post> & { id: string }>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
        persist(state.items);
      }
    },
    deletePost(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
      persist(state.items);
    },
    incrementViews(state, action: PayloadAction<string>) {
      const post = state.items.find((p) => p.id === action.payload);
      if (post) {
        post.views += 1;
        persist(state.items);
      }
    },
    toggleLike(state, action: PayloadAction<string>) {
      const post = state.items.find((p) => p.id === action.payload);
      if (post) {
        post.likes += 1;
        persist(state.items);
      }
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
      storage.set(STORAGE_KEYS.FAVORITES, state.favorites);
    },
    resetMockData(state) {
      const mock = generateMockPosts(50);
      state.items = mock;
      persist(mock);
    },
  },
});

export const {
  createPost,
  updatePost,
  deletePost,
  incrementViews,
  toggleLike,
  toggleFavorite,
  resetMockData,
} = postsSlice.actions;
export default postsSlice.reducer;
