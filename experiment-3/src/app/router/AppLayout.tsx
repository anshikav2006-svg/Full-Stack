import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@/shared/hooks';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { FloatingDecor, Toaster } from '@/shared/components';

export function AppLayout() {
  const user = useAppSelector((s) => s.auth.user);
  const location = useLocation();

  if (!user) {
    // Unauthenticated users only see the login page (handled by ProtectedRoute for nested routes)
    return (
      <>
        <FloatingDecor />
        <Toaster />
        <Outlet />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <FloatingDecor />
      <Toaster />
      <Navbar />
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
