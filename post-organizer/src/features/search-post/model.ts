import type { Post } from '@/shared/types';

export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) return posts;
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}
