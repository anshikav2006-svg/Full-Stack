import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye, Heart } from 'lucide-react';
import { Table, Badge, Avatar, Button } from '@/shared/components';
import type { Column } from '@/shared/components';
import { formatDate } from '@/shared/utils';
import { useAppSelector } from '@/shared/hooks';
import { PERMISSIONS } from '@/shared/constants';
import { PostFormModal } from '@/features/create-post';
import { ConfirmDeleteDialog } from '@/features/delete-post';
import type { Post } from '@/shared/types';

interface PostTableProps {
  posts: Post[];
}

export function PostTable({ posts }: PostTableProps) {
  const user = useAppSelector((s) => s.auth.user);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);

  if (!user) return null;
  const perms = PERMISSIONS[user.role];

  const columns: Column<Post>[] = [
    {
      header: 'Post',
      accessor: (p) => (
        <Link to={`/posts/${p.id}`} className="flex items-center gap-3 hover:text-roseGold">
          <img src={p.coverImage} className="h-10 w-10 rounded-xl object-cover" alt="" />
          <span className="line-clamp-1 font-semibold text-gray-700">{p.title}</span>
        </Link>
      ),
    },
    {
      header: 'Author',
      accessor: (p) => (
        <div className="flex items-center gap-2">
          <Avatar name={p.author} size="sm" />
          <span>{p.author}</span>
        </div>
      ),
    },
    { header: 'Category', accessor: (p) => <Badge tone="purple">{p.category}</Badge> },
    {
      header: 'Status',
      accessor: (p) => <Badge tone={p.status === 'published' ? 'green' : 'gray'}>{p.status}</Badge>,
    },
    { header: 'Created', accessor: (p) => formatDate(p.createdAt) },
    {
      header: 'Stats',
      accessor: (p) => (
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {p.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" /> {p.likes}
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (p) => (
        <div className="flex items-center gap-2">
          {(perms.canEdit || p.authorId === user.id) && (
            <Button size="sm" variant="secondary" onClick={() => setEditingPost(p)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
          {perms.canDelete && (
            <Button size="sm" variant="danger" onClick={() => setDeletingPost(p)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} data={posts} keyExtractor={(p) => p.id} emptyMessage="No posts to manage yet" />
      <PostFormModal isOpen={Boolean(editingPost)} onClose={() => setEditingPost(null)} editingPost={editingPost} />
      <ConfirmDeleteDialog
        isOpen={Boolean(deletingPost)}
        onClose={() => setDeletingPost(null)}
        postId={deletingPost?.id ?? null}
        postTitle={deletingPost?.title}
      />
    </>
  );
}
