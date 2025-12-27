import { ArrowUpDown } from 'lucide-react';
import { useTask } from '../../context/TaskContext';

const TaskSort = () => {
  const { sortBy, setSortBy } = useTask();

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Alphabetical' },
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      <ArrowUpDown size={16} className="text-text-tertiary" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort by: {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskSort;
