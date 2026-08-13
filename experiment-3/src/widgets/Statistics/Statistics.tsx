import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Tag, FileEdit, Heart, Eye } from 'lucide-react';
import { Card } from '@/shared/components';
import type { Post } from '@/shared/types';
import { CATEGORIES } from '@/shared/constants';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ElementType;
  tone: string;
}

function StatCard({ label, value, icon: Icon, tone }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-700 font-display">{value}</p>
        <p className="text-xs font-semibold text-gray-400 font-body">{label}</p>
      </div>
    </Card>
  );
}

function CategoryBarChart({ posts }: { posts: Post[] }) {
  const counts = CATEGORIES.map((cat) => ({
    category: cat,
    count: posts.filter((p) => p.category === cat).length,
  })).sort((a, b) => b.count - a.count);
  const max = Math.max(1, ...counts.map((c) => c.count));

  return (
    <Card className="p-6">
      <h3 className="mb-4 font-display text-base font-bold text-gray-700">Posts by Category</h3>
      <div className="space-y-3">
        {counts.map(({ category, count }) => (
          <div key={category} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-xs font-semibold text-gray-500 font-body">{category}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-babypink/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(count / max) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-babypink via-blush to-pastelPurple"
              />
            </div>
            <span className="w-6 text-right text-xs font-bold text-roseGold font-body">{count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function WeeklyActivityChart({ posts }: { posts: Post[] }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const counts = days.map((day) => {
    return posts.filter((p) => {
      const created = new Date(p.createdAt);
      return created.toDateString() === day.toDateString();
    }).length;
  });
  const max = Math.max(1, ...counts);

  return (
    <Card className="p-6">
      <h3 className="mb-4 font-display text-base font-bold text-gray-700">Recent Activity</h3>
      <div className="flex h-40 items-end justify-between gap-2">
        {days.map((day, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(counts[i] / max) * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="w-full min-h-[6px] rounded-t-xl bg-gradient-to-t from-pastelPurple to-babypink"
            />
            <span className="text-[10px] font-semibold text-gray-400 font-body">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function Statistics({ posts }: { posts: Post[] }) {
  const totalPosts = posts.length;
  const collaborators = new Set(posts.map((p) => p.author)).size;
  const categories = new Set(posts.map((p) => p.category)).size;
  const drafts = posts.filter((p) => p.status === 'draft').length;
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Posts" value={totalPosts} icon={FileText} tone="bg-babypink/30 text-roseGold" />
        <StatCard label="Collaborators" value={collaborators} icon={Users} tone="bg-pastelPurple/30 text-purple-600" />
        <StatCard label="Categories" value={categories} icon={Tag} tone="bg-lavender/40 text-purple-500" />
        <StatCard label="Draft Posts" value={drafts} icon={FileEdit} tone="bg-blush/30 text-pink-600" />
        <StatCard label="Total Likes" value={totalLikes} icon={Heart} tone="bg-rose-100 text-rose-500" />
        <StatCard label="Total Views" value={totalViews} icon={Eye} tone="bg-cream text-roseGold" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CategoryBarChart posts={posts} />
        <WeeklyActivityChart posts={posts} />
      </div>
    </div>
  );
}
