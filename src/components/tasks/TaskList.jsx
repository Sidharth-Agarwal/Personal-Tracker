import { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Button from '../common/Button';
import { Plus } from 'lucide-react';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

const TaskList = () => {
  const { tasks, toggleTaskComplete, removeTask, editTask, createTask, loading, error, refreshTasks } = useTask();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrl: true,
      callback: () => handleCreate(),
    },
    {
      key: 'Escape',
      callback: () => setIsFormOpen(false),
    },
    {
      key: 'r',
      callback: () => {
        if (!isFormOpen) refreshTasks();
      },
    },
  ]);

  const handleToggle = async (taskId, currentStatus) => {
    await toggleTaskComplete(taskId, currentStatus);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await removeTask(taskId);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleSubmit = async (taskData) => {
    if (editingTask) {
      await editTask(editingTask.id, taskData);
    } else {
      await createTask(taskData);
    }
    setEditingTask(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-secondary">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">Error: {error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Tasks</h2>
          <p className="text-text-secondary mt-1 text-sm">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate} className="w-full sm:w-auto">
          <Plus size={20} />
          <span>New Task</span>
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-tertiary mb-4">No tasks yet</p>
            <Button variant="secondary" onClick={handleCreate}>
              Create your first task
            </Button>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialTask={editingTask}
      />
    </div>
  );
};

export default TaskList;
