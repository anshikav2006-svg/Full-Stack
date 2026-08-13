import type { Post, PostFilters } from '@/shared/types';

export function filterPosts(posts: Post[], filters: PostFilters): Post[] {
  return posts.filter((p) => {
    if (filters.category !== 'all' && p.category !== filters.category) return false;
    if (filters.status !== 'all' && p.status !== filters.status) return false;
    if (filters.author !== 'all' && p.author !== filters.author) return false;
    return true;
  });
}
