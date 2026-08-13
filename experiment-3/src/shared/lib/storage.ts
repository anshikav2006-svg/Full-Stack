/**
 * Type-safe LocalStorage helper used to simulate persistence
 * across the app (auth, posts, theme, filters, favorites).
 */
export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — fail silently in this demo app
    }
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};
