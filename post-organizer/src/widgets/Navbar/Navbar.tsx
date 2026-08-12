import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, LayoutDashboard, Sparkles, Moon, Sun } from 'lucide-react';
import { Avatar, Dropdown, DropdownItem, Button } from '@/shared/components';
import { RoleBadge } from '@/widgets/RoleBadge';
import { SearchBar } from '@/features/search-post';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { logout } from '@/entities/user/model';
import { toggleTheme, setSidebarOpen } from '@/app/store/uiSlice';
import { PERMISSIONS } from '@/shared/constants';
import toast from 'react-hot-toast';

export function Navbar() {
  const user = useAppSelector((s) => s.auth.user);
  const theme = useAppSelector((s) => s.ui.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) return null;
  const canViewStats = PERMISSIONS[user.role].canViewStats || user.role === 'collaborator';

  function handleLogout() {
    dispatch(logout());
    toast.success('See you soon, gorgeous! 🌸');
    navigate('/login');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-babypink/30 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={() => dispatch(setSidebarOpen(true))}
          className="rounded-xl p-2 text-roseGold hover:bg-babypink/20 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold text-roseGold">
          <Sparkles className="h-5 w-5" />
          <span className="hidden sm:inline">Post Organizer</span>
        </Link>

        <div className="mx-auto hidden max-w-md flex-1 md:block">
          <SearchBar />
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="rounded-xl p-2 text-roseGold hover:bg-babypink/20"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        {canViewStats && (
          <Link to="/dashboard">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Button>
          </Link>
        )}

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 rounded-2xl p-1 pr-2 hover:bg-babypink/20">
              <Avatar name={user.name} size="sm" />
              <span className="hidden text-sm font-semibold text-gray-600 sm:inline">{user.name}</span>
            </button>
          }
        >
          <div className="px-3 py-2">
            <p className="text-sm font-bold text-gray-700">{user.name}</p>
            <div className="mt-1">
              <RoleBadge role={user.role} />
            </div>
          </div>
          <div className="my-1 h-px bg-babypink/30" />
          <DropdownItem onClick={handleLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-4 w-4" /> Log out
          </DropdownItem>
        </Dropdown>
      </div>
      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}
