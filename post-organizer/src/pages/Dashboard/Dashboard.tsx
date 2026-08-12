import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components';
import { Statistics } from '@/widgets/Statistics';
import { PostTable } from '@/widgets/PostTable';
import { PostFormModal } from '@/features/create-post';
import { useAppSelector } from '@/shared/hooks';
import { selectAllPosts } from '@/entities/post/model';
import { PERMISSIONS } from '@/shared/constants';

export default function Dashboard() {
  const user = useAppSelector((s) => s.auth.user);
  const posts = useAppSelector(selectAllPosts);
  const [isCreateOpen, setCreateOpen] = useState(false);

  const scopedPosts = useMemo(() => {
    if (!user) return [];
    return user.role === 'admin' ? posts : posts.filter((p) => p.authorId === user.id);
  }, [posts, user]);

  if (!user) return null;
  const perms = PERMISSIONS[user.role];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-gray-700">
            {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
          </h1>
          <p className="text-sm text-gray-400 font-body">
            {user.role === 'admin'
              ? 'A full overview of everything happening on Post Organizer.'
              : 'Manage the posts you have created.'}
          </p>
        </div>
        {perms.canCreate && (
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" /> Create Post
          </Button>
        )}
      </div>

      {perms.canViewStats && <Statistics posts={posts} />}

      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-gray-700">
          {user.role === 'admin' ? 'Manage All Posts' : 'Your Posts'}
        </h2>
        <PostTable posts={scopedPosts} />
      </div>

      <PostFormModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
