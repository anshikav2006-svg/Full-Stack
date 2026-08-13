import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, LayoutDashboard, Bookmark, Sparkles, X } from 'lucide-react';
import { cn } from '@/shared/lib';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { setSidebarOpen } from '@/app/store/uiSlice';
import { PERMISSIONS } from '@/shared/constants';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresStats: true },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return null;
  const canViewStats = PERMISSIONS[user.role].canViewStats || user.role === 'collaborator';

  return (
    <div className="flex h-full flex-col gap-1 p-4">
      <div className="mb-4 flex items-center gap-2 px-2 font-display text-lg font-extrabold text-roseGold">
        <Sparkles className="h-5 w-5" /> Post Organizer
      </div>
      {links
        .filter((l) => !l.requiresStats || canViewStats)
        .map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold font-body transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-babypink to-pastelPurple text-white shadow-soft'
                  : 'text-gray-500 hover:bg-babypink/20 hover:text-roseGold',
              )
            }
          >
            <Icon className="h-4 w-4" /> {label}
          </NavLink>
        ))}
      <NavLink
        to="/?tab=favorites"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold text-gray-500 font-body transition-colors hover:bg-babypink/20 hover:text-roseGold"
      >
        <Bookmark className="h-4 w-4" /> Favorites
      </NavLink>
    </div>
  );
}

export function Sidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.ui.sidebarOpen);

  return (
    <>
      <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 border-r border-babypink/20 bg-white/50 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(setSidebarOpen(false))}
              className="fixed inset-0 z-40 bg-purple-900/30 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed left-0 top-0 z-50 h-full w-72 bg-cream shadow-glow lg:hidden"
            >
              <button
                onClick={() => dispatch(setSidebarOpen(false))}
                className="absolute right-3 top-3 rounded-full p-2 text-gray-400 hover:bg-babypink/20"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent onNavigate={() => dispatch(setSidebarOpen(false))} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
