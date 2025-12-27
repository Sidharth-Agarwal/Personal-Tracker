import { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { X, Plus, Check, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { getCustomTagColor } from '../../utils/tagColors';
import Button from '../common/Button';

const KanbanBoard = ({ isOpen, onClose }) => {
  const { allTasks, editTask, toggleTaskComplete, removeTask } = useTask();
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do', status: 'active' },
    { id: 'in-progress', title: 'In Progress', status: 'active' },
    { id: 'completed', title: 'Completed', status: 'completed' },
  ];

  const getTasksByColumn = (columnId) => {
    return allTasks.filter(task => {
      const kanbanStatus = task.kanbanStatus || (task.completed ? 'completed' : 'todo');
      return kanbanStatus === columnId;
    });
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId;
    const shouldComplete = newStatus === 'completed';

    await editTask(draggableId, {
      kanbanStatus: newStatus,
      completed: shouldComplete,
    });
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await removeTask(taskId);
      if (selectedTask?.id === taskId) {
        setSelectedTask(null);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-primary rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-bg-primary z-10">
          <h2 className="text-xl font-bold text-text-primary">Kanban Board</h2>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Kanban Board */}
        <div className="p-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {columns.map(column => {
                const tasks = getTasksByColumn(column.id);
                return (
                  <div key={column.id} className="flex flex-col">
                    {/* Column Header */}
                    <div className="bg-card-bg border border-border rounded-t-lg p-3 flex items-center justify-between">
                      <h3 className="font-semibold text-text-primary">{column.title}</h3>
                      <span className="text-xs text-text-tertiary bg-bg-secondary px-2 py-1 rounded-full">
                        {tasks.length}
                      </span>
                    </div>

                    {/* Column Content */}
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 bg-bg-secondary border border-t-0 border-border rounded-b-lg p-2 min-h-[500px] transition-colors ${
                            snapshot.isDraggingOver ? 'bg-accent bg-opacity-5' : ''
                          }`}
                        >
                          <div className="space-y-2">
                            {tasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => setSelectedTask(task)}
                                    className={`bg-card-bg border border-border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${
                                      snapshot.isDragging ? 'opacity-50' : ''
                                    } ${selectedTask?.id === task.id ? 'ring-2 ring-accent' : ''}`}
                                  >
                                    <h4 className="text-sm font-medium text-text-primary mb-2">
                                      {task.title}
                                    </h4>

                                    {task.description && (
                                      <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                                        {task.description}
                                      </p>
                                    )}

                                    <div className="flex items-center justify-between">
                                      <div className="flex flex-wrap gap-1">
                                        {task.tags?.slice(0, 2).map(tag => {
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
                                        {task.tags?.length > 2 && (
                                          <span className="text-xs text-text-tertiary">
                                            +{task.tags.length - 2}
                                          </span>
                                        )}
                                      </div>

                                      <span className={`text-xs font-medium ${
                                        task.priority === 'high' ? 'text-red-500' :
                                        task.priority === 'medium' ? 'text-yellow-500' :
                                        'text-green-500'
                                      }`}>
                                        {task.priority?.charAt(0).toUpperCase()}
                                      </span>
                                    </div>

                                    {task.dueDate && (
                                      <div className="mt-2 text-xs text-text-tertiary">
                                        Due: {format(new Date(task.dueDate), 'MMM dd')}
                                      </div>
                                    )}

                                    {task.subtasks && task.subtasks.length > 0 && (
                                      <div className="mt-2 text-xs text-text-tertiary flex items-center gap-1">
                                        <Check size={12} />
                                        {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        </div>

        {/* Task Details Panel */}
        {selectedTask && (
          <div className="border-t border-border p-4 bg-card-bg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {selectedTask.title}
                </h3>
                {selectedTask.description && (
                  <p className="text-sm text-text-secondary">{selectedTask.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(selectedTask.id)}
                  className="text-text-tertiary hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-text-tertiary hover:text-text-primary transition-colors p-2"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-text-tertiary">Priority:</span>
                <span className={`ml-2 font-medium ${
                  selectedTask.priority === 'high' ? 'text-red-500' :
                  selectedTask.priority === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {selectedTask.priority?.toUpperCase()}
                </span>
              </div>

              {selectedTask.dueDate && (
                <div>
                  <span className="text-text-tertiary">Due Date:</span>
                  <span className="ml-2 text-text-primary">
                    {format(new Date(selectedTask.dueDate), 'MMM dd, yyyy')}
                  </span>
                </div>
              )}

              <div>
                <span className="text-text-tertiary">Status:</span>
                <span className="ml-2 text-text-primary">
                  {selectedTask.kanbanStatus === 'todo' ? 'To Do' :
                   selectedTask.kanbanStatus === 'in-progress' ? 'In Progress' :
                   'Completed'}
                </span>
              </div>

              {selectedTask.recurrence && selectedTask.recurrence !== 'none' && (
                <div>
                  <span className="text-text-tertiary">Recurrence:</span>
                  <span className="ml-2 text-text-primary capitalize">
                    {selectedTask.recurrence}
                  </span>
                </div>
              )}
            </div>

            {selectedTask.tags && selectedTask.tags.length > 0 && (
              <div className="mt-4">
                <span className="text-sm text-text-tertiary mb-2 block">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.tags.map(tag => {
                    const colors = getCustomTagColor(tag);
                    return (
                      <span
                        key={tag}
                        className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedTask.subtasks && selectedTask.subtasks.length > 0 && (
              <div className="mt-4">
                <span className="text-sm text-text-tertiary mb-2 block">
                  Subtasks ({selectedTask.subtasks.filter(st => st.completed).length}/{selectedTask.subtasks.length}):
                </span>
                <div className="space-y-2">
                  {selectedTask.subtasks.map(subtask => (
                    <div key={subtask.id} className="flex items-center gap-2 text-sm">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                        subtask.completed ? 'bg-accent border-accent' : 'border-border'
                      }`}>
                        {subtask.completed && <Check size={10} className="text-white" />}
                      </span>
                      <span className={subtask.completed ? 'line-through text-text-tertiary' : 'text-text-primary'}>
                        {subtask.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
