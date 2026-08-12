import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser, Role } from '@/shared/types';
import { storage } from '@/shared/lib';
import { STORAGE_KEYS } from '@/shared/constants';

interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: storage.get<AuthUser | null>(STORAGE_KEYS.AUTH, null),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; role: Role }>) {
      const user: AuthUser = {
        id: `user_${action.payload.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: action.payload.name,
        role: action.payload.role,
        avatar: action.payload.name.slice(0, 2).toUpperCase(),
      };
      state.user = user;
      storage.set(STORAGE_KEYS.AUTH, user);
    },
    logout(state) {
      state.user = null;
      storage.remove(STORAGE_KEYS.AUTH);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
