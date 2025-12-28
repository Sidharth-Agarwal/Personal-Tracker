import { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { getCustomTagColor } from '../../utils/tagColors';
import Button from '../common/Button';

const CalendarView = ({ isOpen, onClose }) => {
  const { allTasks, toggleTaskComplete } = useTask();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getTasksForDate = (date) => {
    return allTasks.filter(task => {
      if (!task.dueDate) return false;
      try {
        const taskDate = parseISO(task.dueDate);
        return isSameDay(taskDate, date);
      } catch {
        return false;
      }
    });
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const tasksForSelectedDate = selectedDate ? getTasksForDate(selectedDate) : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-primary rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-bg-primary z-10">
          <div className="flex items-center gap-3">
            <CalendarIcon size={24} className="text-accent" />
            <h2 className="text-xl font-bold text-text-primary">Calendar View</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Calendar Controls */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Button variant="secondary" onClick={handlePrevMonth}>
            <ChevronLeft size={20} />
          </Button>

          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-text-primary">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
            <Button variant="secondary" onClick={handleToday}>
              Today
            </Button>
          </div>

          <Button variant="secondary" onClick={handleNextMonth}>
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map(day => {
              const tasksForDay = getTasksForDate(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = isSameDay(day, new Date());
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const completedTasks = tasksForDay.filter(t => t.completed).length;
              const totalTasks = tasksForDay.length;

              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`min-h-[80px] p-2 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-accent bg-accent bg-opacity-20'
                      : isToday
                      ? 'border-accent'
                      : isCurrentMonth
                      ? 'border-border hover:border-accent'
                      : 'border-border opacity-40'
                  } ${isCurrentMonth ? 'bg-card-bg' : 'bg-bg-secondary'}`}
                >
                  <div className="flex flex-col h-full">
                    <span className={`text-sm font-medium mb-1 ${
                      isToday
                        ? 'text-accent font-bold'
                        : isCurrentMonth
                        ? 'text-text-primary'
                        : 'text-text-tertiary'
                    }`}>
                      {format(day, 'd')}
                    </span>
                    {totalTasks > 0 && (
                      <div className="flex flex-col gap-1 flex-1">
                        <div className={`text-xs font-medium ${
                          completedTasks === totalTasks ? 'text-green-500' : 'text-accent'
                        }`}>
                          {completedTasks}/{totalTasks}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {tasksForDay.slice(0, 2).map((task, idx) => (
                            <div
                              key={idx}
                              className={`w-full text-xs px-1.5 py-1 rounded truncate font-medium ${
                                task.completed
                                  ? 'bg-green-500 bg-opacity-20 text-green-400'
                                  : 'bg-accent bg-opacity-30 text-accent'
                              }`}
                            >
                              {task.title}
                            </div>
                          ))}
                          {tasksForDay.length > 2 && (
                            <div className="text-xs text-accent font-medium">
                              +{tasksForDay.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Tasks */}
        {selectedDate && tasksForSelectedDate.length > 0 && (
          <div className="p-4 border-t border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Tasks for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tasksForSelectedDate.map(task => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 bg-bg-secondary border border-border rounded-lg hover:border-accent transition-colors"
                >
                  <button
                    onClick={() => toggleTaskComplete(task.id, task.completed)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-accent border-accent'
                        : 'border-text-tertiary hover:border-accent'
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${
                      task.completed ? 'line-through text-text-tertiary' : 'text-text-primary'
                    }`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-xs text-text-secondary mt-1">{task.description}</p>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map(tag => {
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
                  </div>
                  <span className={`text-xs font-medium ${
                    task.priority === 'high' ? 'text-red-500' :
                    task.priority === 'medium' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {task.priority?.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDate && tasksForSelectedDate.length === 0 && (
          <div className="p-4 border-t border-border">
            <p className="text-text-tertiary text-center">
              No tasks scheduled for {format(selectedDate, 'MMMM d, yyyy')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
