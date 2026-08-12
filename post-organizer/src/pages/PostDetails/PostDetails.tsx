import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Eye, Bookmark, Pencil, Trash2 } from 'lucide-react';
import { Badge, Avatar, Button, Card, EmptyState } from '@/shared/components';
import { PostGrid } from '@/widgets/PostGrid';
import { PostFormModal } from '@/features/create-post';
import { ConfirmDeleteDialog } from '@/features/delete-post';
import { useTrackView } from '@/features/view-post';
import { formatDate } from '@/shared/utils';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { selectAllPosts, selectFavorites, toggleFavorite, toggleLike } from '@/entities/post/model';
import { PERMISSIONS } from '@/shared/constants';
import { cn } from '@/shared/lib';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const posts = useAppSelector(selectAllPosts);
  const favorites = useAppSelector(selectFavorites);

  const post = posts.find((p) => p.id === id);
  useTrackView(post?.id);

  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const related = useMemo(() => {
    if (!post) return [];
    return posts
      .filter((p) => p.id !== post.id && p.category === post.category && p.status === 'published')
      .slice(0, 4);
  }, [posts, post]);

  if (!post || !user) {
    return (
      <EmptyState
        title="Post not found"
        description="This post may have been removed."
        action={
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" /> Back Home
          </Button>
        }
      />
    );
  }

  const perms = PERMISSIONS[user.role];
  const canEdit = perms.canEdit || post.authorId === user.id;
  const isFavorite = favorites.includes(post.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-semibold text-roseGold hover:underline font-body"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border border-white/60 shadow-glow"
      >
        <img src={post.coverImage} alt={post.title} className="h-72 w-full object-cover sm:h-96" />
      </motion.div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="purple">{post.category}</Badge>
          <Badge tone={post.status === 'published' ? 'green' : 'gray'}>{post.status}</Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} tone="pink">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => dispatch(toggleLike(post.id))}>
            <Heart className="h-4 w-4" /> {post.likes}
          </Button>
          <span className="flex items-center gap-1 text-sm text-gray-400 font-body">
            <Eye className="h-4 w-4" /> {post.views}
          </span>
          <button
            onClick={() => dispatch(toggleFavorite(post.id))}
            className={cn('rounded-full p-2', isFavorite ? 'text-roseGold' : 'text-gray-300 hover:text-roseGold')}
          >
            <Bookmark className={cn('h-5 w-5', isFavorite && 'fill-roseGold')} />
          </button>
          {canEdit && (
            <Button size="sm" variant="secondary" onClick={() => setEditOpen(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {perms.canDelete && (
            <Button size="sm" variant="danger" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <h1 className="font-display text-3xl font-extrabold text-gray-700">{post.title}</h1>

      <Card className="flex items-center gap-3 p-4" hover={false}>
        <Avatar name={post.author} />
        <div>
          <p className="font-bold text-gray-700 font-body">{post.author}</p>
          <p className="text-xs text-gray-400 font-body">
            Published {formatDate(post.createdAt)} · Updated {formatDate(post.updatedAt)}
          </p>
        </div>
      </Card>

      <article className="whitespace-pre-line font-body text-gray-600 leading-relaxed">{post.content}</article>

      {related.length > 0 && (
        <section className="pt-6">
          <h2 className="mb-4 font-display text-lg font-bold text-gray-700">Related Posts</h2>
          <PostGrid posts={related} favorites={favorites} onToggleFavorite={(pid) => dispatch(toggleFavorite(pid))} />
        </section>
      )}

      <PostFormModal isOpen={isEditOpen} onClose={() => setEditOpen(false)} editingPost={post} />
      <ConfirmDeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        postId={post.id}
        postTitle={post.title}
      />
    </div>
  );
}
