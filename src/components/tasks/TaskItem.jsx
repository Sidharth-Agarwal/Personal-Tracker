import { useState } from 'react';
import { Check, Trash2, Edit, AlertCircle, Repeat, ChevronDown, Plus, X } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { getCustomTagColor } from '../../utils/tagColors';
import { useTask } from '../../context/TaskContext';

const TaskItem = ({ task, onToggle, onDelete, onEdit, batchMode = false, isSelected = false, onSelect }) => {
  const { editTask } = useTask();
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500',
  };

  const isOverdue = task.dueDate && !task.completed && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate));
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter(st => st.completed).length;

  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return;

    const updatedSubtasks = [...subtasks, {
      id: Date.now().toString(),
      text: newSubtask.trim(),
      completed: false,
    }];

    await editTask(task.id, { subtasks: updatedSubtasks });
    setNewSubtask('');
    setIsAddingSubtask(false);
  };

  const handleToggleSubtask = async (subtaskId) => {
    const updatedSubtasks = subtasks.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    await editTask(task.id, { subtasks: updatedSubtasks });
  };

  const handleDeleteSubtask = async (subtaskId) => {
    const updatedSubtasks = subtasks.filter(st => st.id !== subtaskId);
    await editTask(task.id, { subtasks: updatedSubtasks });
  };

  return (
    <div className={`group bg-card-bg border rounded-lg p-3 hover:border-accent transition-all duration-200 ${
      isOverdue ? 'border-red-500 border-l-4 pl-2' : isSelected ? 'border-accent border-2' : 'border-border'
    }`}>
      <div className="flex items-start gap-3">
        {/* Batch Selection Checkbox or Task Completion Checkbox */}
        {batchMode ? (
          <button
            onClick={onSelect}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-accent border-accent'
                : 'border-border hover:border-accent'
            }`}
          >
            {isSelected && <Check size={14} className="text-white" />}
          </button>
        ) : (
          <button
            onClick={() => onToggle(task.id, task.completed)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-accent border-accent'
                : 'border-border hover:border-accent'
            }`}
          >
            {task.completed && <Check size={14} className="text-white" />}
          </button>
        )}

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm sm:text-base text-text-primary font-medium ${
              task.completed ? 'line-through text-text-tertiary' : ''
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs sm:text-sm text-text-secondary mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs text-text-tertiary">
            {task.priority && (
              <span className={`font-medium ${priorityColors[task.priority]}`}>
                {task.priority.toUpperCase()}
              </span>
            )}
            {task.dueDate && (
              <span className={`hidden sm:inline flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
                {isOverdue && <AlertCircle size={12} />}
                {isOverdue ? 'Overdue: ' : 'Due: '}{format(new Date(task.dueDate), 'MMM dd, yyyy')}
              </span>
            )}
            {task.dueDate && (
              <span className={`sm:hidden flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
                {isOverdue && <AlertCircle size={12} />}
                {format(new Date(task.dueDate), 'MMM dd')}
              </span>
            )}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => {
                  const colors = getCustomTagColor(tag);
                  return (
                    <span
                      key={tag}
                      className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded-full text-xs font-medium`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
            {task.category && !task.tags && (
              <span className="bg-bg-tertiary px-2 py-0.5 rounded">{task.category}</span>
            )}
            {task.recurrence && task.recurrence !== 'none' && (
              <span className="flex items-center gap-1 text-accent">
                <Repeat size={12} />
                {task.recurrence}
              </span>
            )}
            {subtasks.length > 0 && (
              <span className="flex items-center gap-1">
                <Check size={12} />
                {completedSubtasks}/{subtasks.length} subtasks
              </span>
            )}
          </div>
        </div>

        {/* Actions - Always visible on mobile, hover on desktop */}
        <div className="flex-shrink-0 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          {subtasks.length > 0 && (
            <button
              onClick={() => setShowSubtasks(!showSubtasks)}
              className="text-text-tertiary hover:text-accent transition-colors p-1"
            >
              <ChevronDown size={16} className={`transition-transform ${showSubtasks ? 'rotate-180' : ''}`} />
            </button>
          )}
          <button
            onClick={() => setIsAddingSubtask(!isAddingSubtask)}
            className="text-text-tertiary hover:text-accent transition-colors p-1"
            title="Add subtask"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="text-text-tertiary hover:text-accent transition-colors p-1"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-text-tertiary hover:text-red-500 transition-colors p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Add Subtask Input */}
      {isAddingSubtask && (
        <div className="mt-3 flex gap-2 pl-8">
          <input
            type="text"
            placeholder="Add a subtask..."
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
            className="flex-1 px-3 py-2 bg-bg-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
            autoFocus
          />
          <button
            onClick={handleAddSubtask}
            className="px-3 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            Add
          </button>
          <button
            onClick={() => {
              setIsAddingSubtask(false);
              setNewSubtask('');
            }}
            className="px-3 py-2 bg-bg-secondary text-text-tertiary rounded-lg text-sm font-medium hover:bg-bg-tertiary transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Subtasks List */}
      {showSubtasks && subtasks.length > 0 && (
        <div className="mt-3 pl-8 space-y-2">
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-2 group/subtask">
              <button
                onClick={() => handleToggleSubtask(subtask.id)}
                className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  subtask.completed
                    ? 'bg-accent border-accent'
                    : 'border-border hover:border-accent'
                }`}
              >
                {subtask.completed && <Check size={10} className="text-white" />}
              </button>
              <span
                className={`flex-1 text-sm ${
                  subtask.completed ? 'line-through text-text-tertiary' : 'text-text-primary'
                }`}
              >
                {subtask.text}
              </span>
              <button
                onClick={() => handleDeleteSubtask(subtask.id)}
                className="opacity-0 group-hover/subtask:opacity-100 text-text-tertiary hover:text-red-500 transition-all p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
