import { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import AdvancedFilters from '../components/tasks/AdvancedFilters';
import ProductivityCharts from '../components/tasks/ProductivityCharts';
import CalendarView from '../components/tasks/CalendarView';
import KanbanBoard from '../components/tasks/KanbanBoard';
import TaskSearch from '../components/tasks/TaskSearch';
import TaskStats from '../components/tasks/TaskStats';
import TaskSort from '../components/tasks/TaskSort';
import GoogleCalendarSync from '../components/tasks/GoogleCalendarSync';
import TaskTemplates from '../components/tasks/TaskTemplates';
import PomodoroTimer from '../components/tasks/PomodoroTimer';
import Button from '../components/common/Button';
import { Calendar, LayoutGrid } from 'lucide-react';
import { useFocusMode } from '../context/FocusModeContext';

const Tasks = () => {
  const { isFocusMode } = useFocusMode();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isKanbanOpen, setIsKanbanOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      {!isFocusMode && <TaskStats />}

      {/* Search and Controls Bar */}
      <div className="bg-card-bg border border-border rounded-lg p-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
          <TaskSearch />
          <div className="flex gap-2 w-full sm:w-auto">
            <TaskSort />
            {!isFocusMode && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setIsCalendarOpen(true)}
                  className="text-sm px-3"
                  title="Calendar View"
                >
                  <Calendar size={16} />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIsKanbanOpen(true)}
                  className="text-sm px-3"
                  title="Kanban Board"
                >
                  <LayoutGrid size={16} />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <TaskFilters />
          {!isFocusMode && <AdvancedFilters />}
        </div>
      </div>

      {/* Charts */}
      {!isFocusMode && <ProductivityCharts />}

      {/* Google Calendar Sync */}
      {!isFocusMode && <GoogleCalendarSync />}

      {/* Task Templates */}
      {!isFocusMode && <TaskTemplates />}

      {/* Task List */}
      <TaskList />

      {/* Calendar Modal */}
      <CalendarView isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />

      {/* Kanban Board Modal */}
      <KanbanBoard isOpen={isKanbanOpen} onClose={() => setIsKanbanOpen(false)} />

      {/* Pomodoro Timer */}
      <PomodoroTimer />
    </div>
  );
};

export default Tasks;
