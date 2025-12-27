import { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { TrendingUp, ChevronDown } from 'lucide-react';
import Button from '../common/Button';

const ProductivityCharts = () => {
  const { allTasks } = useTask();
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeRange, setTimeRange] = useState('week'); // week, month

  // Calculate data for completion trend
  const getCompletionTrend = () => {
    const now = new Date();
    let dateRange;
    let formatStr;

    if (timeRange === 'week') {
      dateRange = eachDayOfInterval({
        start: startOfWeek(now),
        end: endOfWeek(now),
      });
      formatStr = 'EEE';
    } else {
      dateRange = eachDayOfInterval({
        start: startOfMonth(now),
        end: now,
      });
      formatStr = 'MMM dd';
    }

    return dateRange.map(date => {
      const completed = allTasks.filter(task => {
        if (!task.completed || !task.updatedAt) return false;
        const taskDate = task.updatedAt.toDate ? task.updatedAt.toDate() : new Date(task.updatedAt);
        return format(taskDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      }).length;

      return {
        date: format(date, formatStr),
        completed,
      };
    });
  };

  // Calculate data for priority distribution
  const getPriorityDistribution = () => {
    const activeTasks = allTasks.filter(task => !task.completed);
    const counts = {
      high: activeTasks.filter(t => t.priority === 'high').length,
      medium: activeTasks.filter(t => t.priority === 'medium').length,
      low: activeTasks.filter(t => t.priority === 'low').length,
    };

    return [
      { name: 'High', value: counts.high, color: '#ef4444' },
      { name: 'Medium', value: counts.medium, color: '#f59e0b' },
      { name: 'Low', value: counts.low, color: '#10b981' },
    ].filter(item => item.value > 0);
  };

  // Calculate data for tag distribution
  const getTagDistribution = () => {
    const tagCounts = {};
    allTasks.forEach(task => {
      if (task.tags && task.tags.length > 0) {
        task.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    return Object.entries(tagCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 tags
  };

  const completionTrendData = getCompletionTrend();
  const priorityDistData = getPriorityDistribution();
  const tagDistData = getTagDistribution();

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'];

  if (!isExpanded) {
    return (
      <div className="mb-4">
        <Button
          variant="secondary"
          onClick={() => setIsExpanded(true)}
          className="text-sm"
        >
          <TrendingUp size={16} />
          Productivity Charts
          <ChevronDown size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="secondary"
          onClick={() => setIsExpanded(false)}
          className="text-sm"
        >
          <TrendingUp size={16} />
          Productivity Charts
          <ChevronDown size={16} className="rotate-180" />
        </Button>

        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              timeRange === 'week'
                ? 'bg-accent text-white'
                : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              timeRange === 'month'
                ? 'bg-accent text-white'
                : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Completion Trend Chart */}
        <div className="bg-card-bg border border-border rounded-lg p-4">
          <h3 className="text-text-secondary text-sm font-medium mb-4">Completion Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={completionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f9fafb',
                }}
              />
              <Line type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Distribution */}
        {priorityDistData.length > 0 && (
          <div className="bg-card-bg border border-border rounded-lg p-4">
            <h3 className="text-text-secondary text-sm font-medium mb-4">Active Tasks by Priority</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={priorityDistData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Tag Distribution */}
        {tagDistData.length > 0 && (
          <div className="bg-card-bg border border-border rounded-lg p-4 lg:col-span-2">
            <h3 className="text-text-secondary text-sm font-medium mb-4">Most Used Tags</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tagDistData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb',
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]}>
                  {tagDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductivityCharts;
