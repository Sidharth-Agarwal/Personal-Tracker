import { useTask } from '../../context/TaskContext';

const TaskFilters = () => {
  const { filter, setFilter, allTasks } = useTask();

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const getCount = (filterValue) => {
    if (filterValue === 'all') return allTasks.length;
    if (filterValue === 'active')
      return allTasks.filter((task) => !task.completed).length;
    if (filterValue === 'completed')
      return allTasks.filter((task) => task.completed).length;
    return 0;
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => setFilter(option.value)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
            filter === option.value
              ? 'bg-accent text-white'
              : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
          }`}
        >
          {option.label}
          <span className="ml-2 opacity-75">({getCount(option.value)})</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
