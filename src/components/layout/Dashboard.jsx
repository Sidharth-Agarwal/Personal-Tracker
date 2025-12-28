import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CommandPalette from '../common/CommandPalette';
import PWAInstallPrompt from '../common/PWAInstallPrompt';
import { useFocusMode } from '../../context/FocusModeContext';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

const Dashboard = () => {
  const { isFocusMode, toggleFocusMode } = useFocusMode();

  // Keyboard shortcut for focus mode
  useKeyboardShortcuts([
    {
      key: 'f',
      callback: () => toggleFocusMode(),
    },
  ]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {!isFocusMode && <Navbar />}
      <div className="flex">
        {!isFocusMode && <Sidebar />}
        <main className={`flex-1 ${isFocusMode ? 'p-8 sm:p-12' : 'p-4 sm:p-6 md:p-8'}`}>
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <CommandPalette />
      <PWAInstallPrompt />
    </div>
  );
};

export default Dashboard;
