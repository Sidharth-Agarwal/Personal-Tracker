import { useState } from 'react';
import { Filter, X, Save, ChevronDown } from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import Button from '../common/Button';
import { getCustomTagColor } from '../../utils/tagColors';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';

const AdvancedFilters = () => {
  const { allTasks, advancedFilters, setAdvancedFilters, savedViews, saveView, loadView, deleteView } = useTask();
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewName, setViewName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Get unique tags from all tasks
  const allTags = [...new Set(allTasks.flatMap(task => task.tags || []))];

  const handleTagToggle = (tag) => {
    const newTags = advancedFilters.tags?.includes(tag)
      ? advancedFilters.tags.filter(t => t !== tag)
      : [...(advancedFilters.tags || []), tag];

    setAdvancedFilters({ ...advancedFilters, tags: newTags });
  };

  const handlePriorityToggle = (priority) => {
    const newPriorities = advancedFilters.priorities?.includes(priority)
      ? advancedFilters.priorities.filter(p => p !== priority)
      : [...(advancedFilters.priorities || []), priority];

    setAdvancedFilters({ ...advancedFilters, priorities: newPriorities });
  };

  const handleDateRangeChange = (range) => {
    let dateFrom = null;
    let dateTo = null;

    switch (range) {
      case 'today':
        dateFrom = format(new Date(), 'yyyy-MM-dd');
        dateTo = format(new Date(), 'yyyy-MM-dd');
        break;
      case 'week':
        dateFrom = format(startOfWeek(new Date()), 'yyyy-MM-dd');
        dateTo = format(endOfWeek(new Date()), 'yyyy-MM-dd');
        break;
      case 'month':
        dateFrom = format(startOfMonth(new Date()), 'yyyy-MM-dd');
        dateTo = format(endOfMonth(new Date()), 'yyyy-MM-dd');
        break;
      case 'custom':
        // Keep current values for custom
        return;
      case 'all':
      default:
        dateFrom = null;
        dateTo = null;
    }

    setAdvancedFilters({ ...advancedFilters, dateFrom, dateTo, dateRange: range });
  };

  const handleClearFilters = () => {
    setAdvancedFilters({
      tags: [],
      priorities: [],
      dateFrom: null,
      dateTo: null,
      dateRange: 'all',
    });
  };

  const handleSaveView = () => {
    if (viewName.trim()) {
      saveView(viewName, advancedFilters);
      setViewName('');
      setShowSaveDialog(false);
    }
  };

  const activeFilterCount =
    (advancedFilters.tags?.length || 0) +
    (advancedFilters.priorities?.length || 0) +
    (advancedFilters.dateRange && advancedFilters.dateRange !== 'all' ? 1 : 0);

  return (
    <div>
      {/* Filter Toggle Button */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm"
        >
          <Filter size={16} />
          Advanced Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-accent text-white rounded-full text-xs">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>

        {activeFilterCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="bg-card-bg border border-border rounded-lg p-4 space-y-4 mt-2">
          {/* Saved Views */}
          {savedViews && savedViews.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">Saved Views</h4>
              <div className="flex flex-wrap gap-2">
                {savedViews.map((view) => (
                  <div
                    key={view.name}
                    className="flex items-center gap-1 bg-bg-secondary rounded-lg px-3 py-1.5"
                  >
                    <button
                      onClick={() => loadView(view.name)}
                      className="text-sm text-text-primary hover:text-accent transition-colors"
                    >
                      {view.name}
                    </button>
                    <button
                      onClick={() => deleteView(view.name)}
                      className="text-text-tertiary hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Priority Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-2">Priority</h4>
            <div className="flex flex-wrap gap-2">
              {['high', 'medium', 'low'].map((priority) => (
                <button
                  key={priority}
                  onClick={() => handlePriorityToggle(priority)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    advancedFilters.priorities?.includes(priority)
                      ? 'bg-accent text-white'
                      : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const colors = getCustomTagColor(tag);
                  const isSelected = advancedFilters.tags?.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isSelected
                          ? `${colors.bg} ${colors.text} ring-2 ring-accent`
                          : `${colors.bg} ${colors.text} opacity-60 hover:opacity-100`
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Date Range Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-2">Due Date</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' },
              ].map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleDateRangeChange(range.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    advancedFilters.dateRange === range.value
                      ? 'bg-accent text-white'
                      : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Save View Button */}
          <div className="flex gap-2 pt-2 border-t border-border">
            {!showSaveDialog ? (
              <Button
                variant="secondary"
                onClick={() => setShowSaveDialog(true)}
                className="text-sm"
                disabled={activeFilterCount === 0}
              >
                <Save size={16} />
                Save Current View
              </Button>
            ) : (
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  placeholder="View name..."
                  value={viewName}
                  onChange={(e) => setViewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveView()}
                  className="flex-1 px-3 py-1.5 bg-bg-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                  autoFocus
                />
                <Button variant="primary" onClick={handleSaveView} className="text-sm">
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowSaveDialog(false);
                    setViewName('');
                  }}
                  className="text-sm"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
