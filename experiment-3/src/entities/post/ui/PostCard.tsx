import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, Bookmark } from 'lucide-react';
import { Badge, Avatar } from '@/shared/components';
import { timeAgo } from '@/shared/utils';
import { cn } from '@/shared/lib';
import type { Post } from '@/shared/types';

interface PostCardProps {
  post: Post;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onLike?: (id: string) => void;
}

export function PostCard({ post, isFavorite, onToggleFavorite, onLike }: PostCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl shadow-soft transition-shadow hover:shadow-glow"
    >
      <Link to={`/posts/${post.id}`} className="block">
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <Badge tone={post.status === 'published' ? 'green' : 'gray'} className="absolute left-3 top-3">
            {post.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>
        <div className="space-y-2 p-4">
          <Badge tone="purple">{post.category}</Badge>
          <h3 className="line-clamp-1 font-display text-base font-bold text-gray-700">{post.title}</h3>
          <p className="line-clamp-2 text-sm text-gray-500 font-body">{post.description}</p>
          <div className="flex items-center gap-2 pt-1">
            <Avatar name={post.author} size="sm" />
            <div className="text-xs font-body">
              <p className="font-semibold text-gray-600">{post.author}</p>
              <p className="text-gray-400">{timeAgo(post.createdAt)}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-babypink/20 px-4 py-2.5">
        <div className="flex items-center gap-3 text-xs text-gray-400 font-body">
          <button
            onClick={() => onLike?.(post.id)}
            className="flex items-center gap-1 transition-colors hover:text-roseGold"
          >
            <Heart className="h-3.5 w-3.5" /> {post.likes}
          </button>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {post.views}
          </span>
        </div>
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(post.id)}
            className={cn(
              'rounded-full p-1.5 transition-colors',
              isFavorite ? 'text-roseGold' : 'text-gray-300 hover:text-roseGold',
            )}
          >
            <Bookmark className={cn('h-4 w-4', isFavorite && 'fill-roseGold')} />
          </button>
        )}
      </div>
    </motion.article>
  );
}
