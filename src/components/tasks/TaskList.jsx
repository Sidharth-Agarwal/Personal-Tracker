import { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import BatchActions from './BatchActions';
import Button from '../common/Button';
import { Plus, CheckSquare } from 'lucide-react';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

const TaskList = () => {
  const { tasks, toggleTaskComplete, removeTask, editTask, createTask, loading, error, refreshTasks, reorderTasks, sortBy } = useTask();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [batchMode, setBatchMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    reorderTasks(result.source.index, result.destination.index);
  };

  const toggleBatchMode = () => {
    setBatchMode(!batchMode);
    setSelectedTasks([]);
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const selectAllTasks = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const clearSelection = () => {
    setSelectedTasks([]);
    setBatchMode(false);
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
        <div className="flex gap-2 w-full sm:w-auto">
          {batchMode && tasks.length > 0 && (
            <Button variant="secondary" onClick={selectAllTasks} className="text-sm">
              <CheckSquare size={16} />
              <span>{selectedTasks.length === tasks.length ? 'Deselect All' : 'Select All'}</span>
            </Button>
          )}
          <Button
            variant={batchMode ? 'primary' : 'secondary'}
            onClick={toggleBatchMode}
            className="text-sm"
            disabled={tasks.length === 0}
          >
            <CheckSquare size={16} />
            <span>{batchMode ? 'Exit Batch' : 'Batch Select'}</span>
          </Button>
          <Button variant="primary" onClick={handleCreate} className="w-full sm:w-auto">
            <Plus size={20} />
            <span>New Task</span>
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks" isDropDisabled={sortBy !== 'custom'}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-text-tertiary mb-4">No tasks yet</p>
                  <Button variant="secondary" onClick={handleCreate}>
                    Create your first task
                  </Button>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                    isDragDisabled={sortBy !== 'custom'}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <TaskItem
                          task={task}
                          onToggle={handleToggle}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          batchMode={batchMode}
                          isSelected={selectedTasks.includes(task.id)}
                          onSelect={() => toggleTaskSelection(task.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Batch Actions Bar */}
      {batchMode && (
        <BatchActions
          selectedTasks={selectedTasks}
          onClearSelection={clearSelection}
        />
      )}

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
