import { Check, Trash2, Edit, AlertCircle, Repeat } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { getCustomTagColor } from '../../utils/tagColors';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500',
  };

  const isOverdue = task.dueDate && !task.completed && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate));

  return (
    <div className={`group bg-card-bg border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 ${
      isOverdue ? 'border-red-500 border-l-4' : 'border-border'
    }`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
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
          </div>
        </div>

        {/* Actions - Always visible on mobile, hover on desktop */}
        <div className="flex-shrink-0 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
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
    </div>
  );
};

export default TaskItem;
