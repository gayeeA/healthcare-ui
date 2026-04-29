import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer } from './ui/ToastContainer';
import { useDarkMode } from '../hooks/useDarkMode';
import { useToast } from '../hooks/useToast';

export function Layout() {
  const { isDark } = useDarkMode();
  const { toasts } = useToast();

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <Navbar />
      <main className="container mx-auto p-6 pb-12 md:p-8 lg:p-12">
        <Outlet />
      </main>
      {toasts.length > 0 && <ToastContainer />}
    </div>
  );
}

