import { Search, X } from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { useRef } from 'react';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

const TaskSearch = () => {
  const { searchQuery, setSearchQuery } = useTask();
  const searchInputRef = useRef(null);

  // Keyboard shortcut: Ctrl+K to focus search
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrl: true,
      callback: () => {
        searchInputRef.current?.focus();
      },
    },
  ]);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative mb-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          size={18}
        />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search tasks... (Ctrl+K)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskSearch;
