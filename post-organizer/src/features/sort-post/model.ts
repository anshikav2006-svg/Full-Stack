import type { Post, SortOption } from '@/shared/types';

export function sortPosts(posts: Post[], sort: SortOption): Post[] {
  const copy = [...posts];
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'oldest':
      return copy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case 'mostViewed':
      return copy.sort((a, b) => b.views - a.views);
    case 'mostLiked':
      return copy.sort((a, b) => b.likes - a.likes);
    case 'alphabetical':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
}
