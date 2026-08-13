import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { Button, Pagination, Badge } from '@/shared/components';
import { PostGrid } from '@/widgets/PostGrid';
import { FilterBar } from '@/features/filter-post';
import { SortDropdown } from '@/features/sort-post';
import { PostFormModal } from '@/features/create-post';
import { searchPosts } from '@/features/search-post';
import { filterPosts } from '@/features/filter-post';
import { sortPosts } from '@/features/sort-post';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { selectAllPosts, selectFavorites, toggleFavorite, toggleLike } from '@/entities/post/model';
import { PERMISSIONS, CATEGORIES } from '@/shared/constants';

const PAGE_SIZE = 12;

export default function Home() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const posts = useAppSelector(selectAllPosts);
  const favorites = useAppSelector(selectFavorites);
  const searchQuery = useAppSelector((s) => s.ui.searchQuery);
  const filters = useAppSelector((s) => s.ui.filters);
  const sort = useAppSelector((s) => s.ui.sort);

  const [searchParams] = useSearchParams();
  const showFavoritesOnly = searchParams.get('tab') === 'favorites';

  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCreateOpen, setCreateOpen] = useState(false);

  if (!user) return null;
  const perms = PERMISSIONS[user.role];

  const processed = useMemo(() => {
    let result = posts.filter((p) => p.status === 'published' || p.authorId === user.id);
    if (showFavoritesOnly) result = result.filter((p) => favorites.includes(p.id));
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory);
    result = searchPosts(result, searchQuery);
    result = filterPosts(result, filters);
    result = sortPosts(result, sort);
    return result;
  }, [posts, showFavoritesOnly, favorites, activeCategory, searchQuery, filters, sort, user.id]);

  const trending = useMemo(() => [...posts].sort((a, b) => b.views - a.views).slice(0, 5), [posts]);

  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const paginated = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-8 pb-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-babypink/70 via-blush/60 to-pastelPurple/60 p-8 shadow-soft sm:p-12"
      >
        <Sparkles className="absolute right-8 top-8 h-10 w-10 text-white/50" />
        <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-white/80">
          Hello, {user.name.split(' ')[0]} 🌸
        </p>
        <h1 className="max-w-lg font-display text-3xl font-extrabold text-white sm:text-4xl">
          Organize your prettiest posts, effortlessly.
        </h1>
        <p className="mt-3 max-w-md font-body text-white/90">
          Browse trending stories, discover fresh inspiration, and keep everything beautifully in one place.
        </p>
        {perms.canCreate && (
          <Button className="mt-6 bg-white text-roseGold hover:bg-white" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" /> Create Post
          </Button>
        )}
      </motion.section>

      {/* Trending */}
      {!showFavoritesOnly && trending.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-gray-700">🔥 Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {trending.map((p) => (
              <Link
                key={p.id}
                to={`/posts/${p.id}`}
                className="group flex w-56 shrink-0 flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/60 shadow-soft transition-transform hover:-translate-y-1"
              >
                <img src={p.coverImage} className="h-28 w-full object-cover transition-transform group-hover:scale-105" alt="" />
                <div className="p-3">
                  <p className="line-clamp-1 text-sm font-bold text-gray-700 font-body">{p.title}</p>
                  <p className="text-xs text-gray-400 font-body">{p.views} views</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory('all')}>
          <Badge tone={activeCategory === 'all' ? 'gold' : 'gray'} className="cursor-pointer px-3 py-1.5">
            All
          </Badge>
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setActiveCategory(c)}>
            <Badge tone={activeCategory === c ? 'gold' : 'gray'} className="cursor-pointer px-3 py-1.5">
              {c}
            </Badge>
          </button>
        ))}
      </div>

      {/* Filter + Sort row */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <FilterBar />
        <SortDropdown />
      </div>

      <h2 className="font-display text-lg font-bold text-gray-700">
        {showFavoritesOnly ? '💖 Your Favorites' : '🌷 All Posts'}
        <span className="ml-2 text-sm font-normal text-gray-400">({processed.length})</span>
      </h2>

      <PostGrid
        posts={paginated}
        favorites={favorites}
        onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
        onLike={(id) => dispatch(toggleLike(id))}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <PostFormModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
