import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useDarkMode } from '../hooks/useDarkMode';
import { Button } from './ui/Button';
import { Sun, Moon, Menu, X, Home, BarChart3, Users, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Patients', path: '/patients', icon: Users },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const NavLink = ({ name, path, icon: Icon }: { name: string; path: string; icon: any }) => (
    <button
      onClick={() => {
        navigate(path);
        setMobileOpen(false);
      }}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg transition-all w-full text-left',
        location.pathname === path
          ? 'bg-primary text-primary-foreground font-semibold'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <Icon className="h-5 w-5" />
      {name}
    </button>
  );

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            HealthCare Pro
          </button>

          {/* Desktop Nav + Actions */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex gap-1">
              {NAV_LINKS.map(({ name, path, icon: Icon }) => (
                <NavLink key={path} name={name} path={path} icon={Icon} />
              ))}
            </nav>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="ml-2"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map(({ name, path, icon: Icon }) => (
                <NavLink key={path} name={name} path={path} icon={Icon} />
              ))}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="flex-1 justify-start"
                >
                  {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {isDark ? 'Light' : 'Dark'} Mode
                </Button>
                <Button variant="destructive" size="sm" onClick={handleLogout} className="flex-1">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
