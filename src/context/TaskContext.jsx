import { createContext, useContext, useState, useEffect } from 'react';
import { addTask, updateTask, deleteTask, getUserTasks } from '../firebase/firestore';
import { useAuth } from './AuthContext';
import { addDays, addWeeks, addMonths, format } from 'date-fns';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // createdAt, dueDate, priority, title

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    const { tasks: fetchedTasks, error: fetchError } = await getUserTasks(user.uid);

    if (fetchError) {
      setError(fetchError);
    } else {
      setTasks(fetchedTasks);
    }
    setLoading(false);
  };

  const createTask = async (taskData) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    setError(null);
    const { id, error: addError } = await addTask(user.uid, taskData);

    if (addError) {
      setError(addError);
      return { success: false, error: addError };
    }

    await fetchTasks();
    return { success: true, id };
  };

  const editTask = async (taskId, updates) => {
    setError(null);
    const { error: updateError } = await updateTask(taskId, updates);

    if (updateError) {
      setError(updateError);
      return { success: false, error: updateError };
    }

    await fetchTasks();
    return { success: true };
  };

  const removeTask = async (taskId) => {
    setError(null);
    const { error: deleteError } = await deleteTask(taskId);

    if (deleteError) {
      setError(deleteError);
      return { success: false, error: deleteError };
    }

    await fetchTasks();
    return { success: true };
  };

  const toggleTaskComplete = async (taskId, currentStatus) => {
    const task = tasks.find(t => t.id === taskId);

    // If marking as complete and task has recurrence, create next instance
    if (!currentStatus && task?.recurrence && task.recurrence !== 'none') {
      await handleRecurringTask(task);
    }

    return await editTask(taskId, { completed: !currentStatus });
  };

  const handleRecurringTask = async (task) => {
    if (!task.dueDate) return;

    let nextDueDate;
    const currentDueDate = new Date(task.dueDate);

    switch (task.recurrence) {
      case 'daily':
        nextDueDate = addDays(currentDueDate, 1);
        break;
      case 'weekly':
        nextDueDate = addWeeks(currentDueDate, 1);
        break;
      case 'monthly':
        nextDueDate = addMonths(currentDueDate, 1);
        break;
      default:
        return;
    }

    // Create new task with same data but new due date
    const newTaskData = {
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      tags: task.tags || (task.category ? [task.category] : []),
      dueDate: format(nextDueDate, 'yyyy-MM-dd'),
      completed: false,
      recurrence: task.recurrence,
    };

    await createTask(newTaskData);
  };

  const filteredTasks = tasks
    .filter((task) => {
      // Apply status filter
      let passesFilter = true;
      if (filter === 'active') passesFilter = !task.completed;
      if (filter === 'completed') passesFilter = task.completed;

      // Apply search filter
      const passesSearch = searchQuery === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      return passesFilter && passesSearch;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // Default: createdAt (newest first)
      const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return bDate - aDate;
    });

  const value = {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    createTask,
    editTask,
    removeTask,
    toggleTaskComplete,
    refreshTasks: fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
