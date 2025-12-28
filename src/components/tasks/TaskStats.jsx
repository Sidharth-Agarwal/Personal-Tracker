import { useTask } from '../../context/TaskContext';
import { CheckCircle2, Circle, TrendingUp, AlertCircle, Flame } from 'lucide-react';
import { isToday, isThisWeek, isPast } from 'date-fns';
import { calculateStreak } from '../../utils/streakCalculator';

const TaskStats = () => {
  const { allTasks } = useTask();
  const currentStreak = calculateStreak(allTasks);

  const completedTasks = allTasks.filter(task => task.completed);
  const activeTasks = allTasks.filter(task => !task.completed);

  const overdueTasks = allTasks.filter(task =>
    task.dueDate && !task.completed && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate))
  ).length;

  const completedToday = completedTasks.filter(task =>
    task.updatedAt && isToday(task.updatedAt.toDate ? task.updatedAt.toDate() : new Date(task.updatedAt))
  ).length;

  const completedThisWeek = completedTasks.filter(task =>
    task.updatedAt && isThisWeek(task.updatedAt.toDate ? task.updatedAt.toDate() : new Date(task.updatedAt))
  ).length;

  const completionRate = allTasks.length > 0
    ? Math.round((completedTasks.length / allTasks.length) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Completion Rate */}
      <div className="bg-card-bg border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-tertiary text-xs sm:text-sm">Completion Rate</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{completionRate}%</p>
          </div>
          <div className="w-10 h-10 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-accent" size={20} />
          </div>
        </div>
        <div className="mt-3 bg-bg-secondary rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Completed Today */}
      <div className="bg-card-bg border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-tertiary text-xs sm:text-sm">Completed Today</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{completedToday}</p>
          </div>
          <div className="w-10 h-10 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="text-green-500" size={20} />
          </div>
        </div>
        <p className="text-text-tertiary text-xs mt-2">{completedThisWeek} this week</p>
      </div>

      {/* Active Tasks */}
      <div className="bg-card-bg border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-tertiary text-xs sm:text-sm">Active Tasks</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{activeTasks.length}</p>
          </div>
          <div className="w-10 h-10 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <Circle className="text-blue-500" size={20} />
          </div>
        </div>
        <p className="text-text-tertiary text-xs mt-2">{allTasks.length} total tasks</p>
      </div>

      {/* Streak Counter */}
      {currentStreak > 0 && (
        <div className="bg-card-bg border border-orange-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-tertiary text-xs sm:text-sm">Current Streak</p>
              <p className="text-2xl font-bold text-orange-500 mt-1">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
            </div>
            <div className="w-10 h-10 bg-orange-500 bg-opacity-10 rounded-lg flex items-center justify-center">
              <Flame className="text-orange-500" size={20} />
            </div>
          </div>
          <p className="text-text-tertiary text-xs mt-2">Keep it going!</p>
        </div>
      )}

      {/* Overdue Tasks */}
      {overdueTasks > 0 && (
        <div className="bg-card-bg border border-red-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-tertiary text-xs sm:text-sm">Overdue</p>
              <p className="text-2xl font-bold text-red-500 mt-1">{overdueTasks}</p>
            </div>
            <div className="w-10 h-10 bg-red-500 bg-opacity-10 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-red-500" size={20} />
            </div>
          </div>
          <p className="text-text-tertiary text-xs mt-2">Needs attention</p>
        </div>
      )}
    </div>
  );
};

export default TaskStats;
