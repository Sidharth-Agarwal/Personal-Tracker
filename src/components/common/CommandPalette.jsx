import { useState, useEffect, useRef } from 'react';
import { Search, Plus, Moon, Sun, LogOut, Filter, RefreshCw, Maximize2, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useFocusMode } from '../../context/FocusModeContext';
import { useTask } from '../../context/TaskContext';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

const CommandPalette = ({ onCreateTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isFocusMode, toggleFocusMode } = useFocusMode();
  const { setFilter, refreshTasks } = useTask();

  const commands = [
    {
      id: 'new-task',
      label: 'Create New Task',
      icon: Plus,
      action: () => {
        setIsOpen(false);
        onCreateTask?.();
      },
      keywords: 'create new task add',
    },
    {
      id: 'toggle-theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
      keywords: 'theme dark light mode',
    },
    {
      id: 'toggle-focus',
      label: `${isFocusMode ? 'Exit' : 'Enter'} Focus Mode`,
      icon: Maximize2,
      action: () => {
        toggleFocusMode();
        setIsOpen(false);
      },
      keywords: 'focus distraction zen mode',
    },
    {
      id: 'filter-all',
      label: 'Show All Tasks',
      icon: Filter,
      action: () => {
        setFilter('all');
        setIsOpen(false);
      },
      keywords: 'filter all tasks',
    },
    {
      id: 'filter-active',
      label: 'Show Active Tasks',
      icon: Filter,
      action: () => {
        setFilter('active');
        setIsOpen(false);
      },
      keywords: 'filter active incomplete tasks',
    },
    {
      id: 'filter-completed',
      label: 'Show Completed Tasks',
      icon: Filter,
      action: () => {
        setFilter('completed');
        setIsOpen(false);
      },
      keywords: 'filter completed done tasks',
    },
    {
      id: 'refresh',
      label: 'Refresh Tasks',
      icon: RefreshCw,
      action: () => {
        refreshTasks();
        setIsOpen(false);
      },
      keywords: 'refresh reload sync',
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      action: async () => {
        await logout();
        navigate('/login');
        setIsOpen(false);
      },
      keywords: 'logout sign out exit',
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    `${cmd.label} ${cmd.keywords}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useKeyboardShortcuts([
    {
      key: 'p',
      ctrl: true,
      callback: (e) => {
        e.preventDefault();
        setIsOpen(true);
      },
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Command Palette */}
      <div className="relative bg-card-bg border border-border rounded-xl shadow-2xl w-full max-w-2xl animate-scale-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="text-text-tertiary" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-tertiary"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-bg-secondary border border-border rounded text-text-tertiary">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-text-tertiary">
              <p>No commands found</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredCommands.map((command, index) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.id}
                    onClick={command.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      selectedIndex === index
                        ? 'bg-accent text-white'
                        : 'text-text-primary hover:bg-bg-secondary'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="flex-1 text-left font-medium">{command.label}</span>
                    {selectedIndex === index && (
                      <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-white bg-opacity-20 border border-white border-opacity-30 rounded text-white">
                        ↵
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-text-tertiary bg-bg-secondary bg-opacity-50">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-bg-tertiary border border-border rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-bg-tertiary border border-border rounded">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-bg-tertiary border border-border rounded">↵</kbd>
              Select
            </span>
          </div>
          <span>Ctrl+P to open</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
