import { createContext, useContext, useState, useEffect } from 'react';
import { addTask, updateTask, deleteTask, getUserTasks } from '../firebase/firestore';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { addDays, addWeeks, addMonths, format, isWithinInterval, parseISO } from 'date-fns';

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
  const toast = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // createdAt, dueDate, priority, title, custom

  // Advanced Filters
  const [advancedFilters, setAdvancedFilters] = useState({
    tags: [],
    priorities: [],
    dateFrom: null,
    dateTo: null,
    dateRange: 'all',
  });

  // Saved Views
  const [savedViews, setSavedViews] = useState(() => {
    const saved = localStorage.getItem('savedViews');
    return saved ? JSON.parse(saved) : [];
  });

  // Task Templates
  const [taskTemplates, setTaskTemplates] = useState(() => {
    const saved = localStorage.getItem('taskTemplates');
    return saved ? JSON.parse(saved) : [];
  });

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
      toast.error('Failed to create task');
      return { success: false, error: addError };
    }

    await fetchTasks();
    toast.success('Task created successfully');
    return { success: true, id };
  };

  const editTask = async (taskId, updates, silent = false) => {
    setError(null);
    const { error: updateError } = await updateTask(taskId, updates);

    if (updateError) {
      setError(updateError);
      if (!silent) toast.error('Failed to update task');
      return { success: false, error: updateError };
    }

    await fetchTasks();
    if (!silent) toast.success('Task updated successfully');
    return { success: true };
  };

  const removeTask = async (taskId, silent = false) => {
    setError(null);
    const { error: deleteError } = await deleteTask(taskId);

    if (deleteError) {
      setError(deleteError);
      if (!silent) toast.error('Failed to delete task');
      return { success: false, error: deleteError };
    }

    await fetchTasks();
    if (!silent) toast.success('Task deleted successfully');
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

  // Saved Views Functions
  const saveView = (name, filters) => {
    const newView = { name, filters };
    const updatedViews = [...savedViews.filter(v => v.name !== name), newView];
    setSavedViews(updatedViews);
    localStorage.setItem('savedViews', JSON.stringify(updatedViews));
  };

  const loadView = (name) => {
    const view = savedViews.find(v => v.name === name);
    if (view) {
      setAdvancedFilters(view.filters);
    }
  };

  const deleteView = (name) => {
    const updatedViews = savedViews.filter(v => v.name !== name);
    setSavedViews(updatedViews);
    localStorage.setItem('savedViews', JSON.stringify(updatedViews));
  };

  const reorderTasks = async (startIndex, endIndex) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    // Update customOrder for all affected tasks
    const updates = result.map((task, index) =>
      editTask(task.id, { customOrder: index })
    );

    await Promise.all(updates);
    await fetchTasks();
  };

  // Batch Operations
  const batchUpdateTasks = async (taskIds, updates) => {
    setError(null);
    try {
      const updatePromises = taskIds.map(taskId => editTask(taskId, updates, true));
      await Promise.all(updatePromises);
      toast.success(`Updated ${taskIds.length} task${taskIds.length > 1 ? 's' : ''}`);
      return { success: true };
    } catch (err) {
      setError('Failed to update tasks');
      toast.error('Failed to update tasks');
      return { success: false, error: 'Failed to update tasks' };
    }
  };

  const batchDeleteTasks = async (taskIds) => {
    setError(null);
    try {
      const deletePromises = taskIds.map(taskId => removeTask(taskId, true));
      await Promise.all(deletePromises);
      toast.success(`Deleted ${taskIds.length} task${taskIds.length > 1 ? 's' : ''}`);
      return { success: true };
    } catch (err) {
      setError('Failed to delete tasks');
      toast.error('Failed to delete tasks');
      return { success: false, error: 'Failed to delete tasks' };
    }
  };

  const batchCompleteTasks = async (taskIds, completed = true) => {
    return batchUpdateTasks(taskIds, { completed });
  };

  // Template Functions
  const saveTemplate = (name, templateData) => {
    const template = {
      id: Date.now().toString(),
      name,
      data: templateData,
      createdAt: new Date().toISOString(),
    };
    const updatedTemplates = [...taskTemplates.filter(t => t.name !== name), template];
    setTaskTemplates(updatedTemplates);
    localStorage.setItem('taskTemplates', JSON.stringify(updatedTemplates));
    return { success: true, template };
  };

  const deleteTemplate = (templateId) => {
    const updatedTemplates = taskTemplates.filter(t => t.id !== templateId);
    setTaskTemplates(updatedTemplates);
    localStorage.setItem('taskTemplates', JSON.stringify(updatedTemplates));
    return { success: true };
  };

  const createTaskFromTemplate = async (template) => {
    const taskData = {
      ...template.data,
      createdAt: new Date(),
    };
    return createTask(taskData);
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

      // Apply advanced tag filter
      const passesTagFilter = advancedFilters.tags.length === 0 ||
        (task.tags && task.tags.some(tag => advancedFilters.tags.includes(tag)));

      // Apply advanced priority filter
      const passesPriorityFilter = advancedFilters.priorities.length === 0 ||
        advancedFilters.priorities.includes(task.priority);

      // Apply advanced date filter
      let passesDateFilter = true;
      if (advancedFilters.dateFrom && advancedFilters.dateTo && task.dueDate) {
        try {
          const taskDate = parseISO(task.dueDate);
          const fromDate = parseISO(advancedFilters.dateFrom);
          const toDate = parseISO(advancedFilters.dateTo);
          passesDateFilter = isWithinInterval(taskDate, { start: fromDate, end: toDate });
        } catch (e) {
          passesDateFilter = true;
        }
      }

      return passesFilter && passesSearch && passesTagFilter && passesPriorityFilter && passesDateFilter;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === 'custom') {
        const aOrder = a.customOrder ?? 999999;
        const bOrder = b.customOrder ?? 999999;
        return aOrder - bOrder;
      }
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
    advancedFilters,
    setAdvancedFilters,
    savedViews,
    saveView,
    loadView,
    deleteView,
    taskTemplates,
    saveTemplate,
    deleteTemplate,
    createTaskFromTemplate,
    createTask,
    editTask,
    removeTask,
    toggleTaskComplete,
    reorderTasks,
    batchUpdateTasks,
    batchDeleteTasks,
    batchCompleteTasks,
    refreshTasks: fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
