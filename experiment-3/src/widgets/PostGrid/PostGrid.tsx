import { AnimatePresence } from 'framer-motion';
import { PostCard } from '@/entities/post/ui';
import { EmptyState, SkeletonCard } from '@/shared/components';
import type { Post } from '@/shared/types';

interface PostGridProps {
  posts: Post[];
  isLoading?: boolean;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onLike?: (id: string) => void;
}

export function PostGrid({ posts, isLoading, favorites = [], onToggleFavorite, onLike }: PostGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return <EmptyState title="No posts found" description="Try a different search, filter, or category ✨" />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isFavorite={favorites.includes(post.id)}
            onToggleFavorite={onToggleFavorite}
            onLike={onLike}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
