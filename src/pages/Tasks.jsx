import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskSearch from '../components/tasks/TaskSearch';
import TaskStats from '../components/tasks/TaskStats';
import TaskSort from '../components/tasks/TaskSort';
import { useFocusMode } from '../context/FocusModeContext';

const Tasks = () => {
  const { isFocusMode } = useFocusMode();

  return (
    <div>
      {!isFocusMode && <TaskStats />}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <TaskSearch />
        <TaskSort />
      </div>
      {!isFocusMode && <TaskFilters />}
      <TaskList />
    </div>
  );
};

export default Tasks;
