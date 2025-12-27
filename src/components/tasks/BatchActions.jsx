import { useState } from 'react';
import { CheckSquare, Trash2, Tag, AlertCircle, X } from 'lucide-react';
import Button from '../common/Button';
import { useTask } from '../../context/TaskContext';

const BatchActions = ({ selectedTasks, onClearSelection }) => {
  const { batchCompleteTasks, batchDeleteTasks, batchUpdateTasks, allTasks } = useTask();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [newTag, setNewTag] = useState('');

  const selectedCount = selectedTasks.length;

  // Get all unique tags from tasks
  const allTags = [...new Set(allTasks.flatMap(task => task.tags || []))];

  const handleComplete = async () => {
    setIsProcessing(true);
    await batchCompleteTasks(selectedTasks, true);
    setIsProcessing(false);
    onClearSelection();
  };

  const handleUncomplete = async () => {
    setIsProcessing(true);
    await batchCompleteTasks(selectedTasks, false);
    setIsProcessing(false);
    onClearSelection();
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ${selectedCount} task${selectedCount > 1 ? 's' : ''}?`)) {
      return;
    }
    setIsProcessing(true);
    await batchDeleteTasks(selectedTasks);
    setIsProcessing(false);
    onClearSelection();
  };

  const handleSetPriority = async (priority) => {
    setIsProcessing(true);
    await batchUpdateTasks(selectedTasks, { priority });
    setIsProcessing(false);
    setShowPriorityMenu(false);
    onClearSelection();
  };

  const handleAddTag = async (tag) => {
    setIsProcessing(true);

    // For each selected task, add the tag if it doesn't already have it
    const updatePromises = selectedTasks.map(async (taskId) => {
      const task = allTasks.find(t => t.id === taskId);
      if (task) {
        const existingTags = task.tags || [];
        if (!existingTags.includes(tag)) {
          const updatedTags = [...existingTags, tag];
          await batchUpdateTasks([taskId], { tags: updatedTags });
        }
      }
    });

    await Promise.all(updatePromises);
    setIsProcessing(false);
    setShowTagMenu(false);
    setNewTag('');
    onClearSelection();
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-card-bg border-2 border-accent rounded-lg shadow-2xl p-3 z-50 max-w-4xl w-full mx-4">
      <div className="flex items-center justify-between gap-3">
        {/* Selection Info */}
        <div className="flex items-center gap-2">
          <CheckSquare size={20} className="text-accent" />
          <span className="text-sm font-medium text-text-primary">
            {selectedCount} task{selectedCount > 1 ? 's' : ''} selected
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Complete */}
          <Button
            variant="secondary"
            onClick={handleComplete}
            disabled={isProcessing}
            className="text-xs sm:text-sm px-2 sm:px-3"
            title="Mark as complete"
          >
            <CheckSquare size={16} />
            <span className="hidden sm:inline">Complete</span>
          </Button>

          {/* Uncomplete */}
          <Button
            variant="secondary"
            onClick={handleUncomplete}
            disabled={isProcessing}
            className="text-xs sm:text-sm px-2 sm:px-3"
            title="Mark as incomplete"
          >
            <X size={16} />
            <span className="hidden sm:inline">Uncomplete</span>
          </Button>

          {/* Priority Menu */}
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowPriorityMenu(!showPriorityMenu)}
              disabled={isProcessing}
              className="text-xs sm:text-sm px-2 sm:px-3"
              title="Set priority"
            >
              <AlertCircle size={16} />
              <span className="hidden sm:inline">Priority</span>
            </Button>

            {showPriorityMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-card-bg border border-border rounded-lg shadow-lg p-2 min-w-[120px]">
                {['high', 'medium', 'low'].map(priority => (
                  <button
                    key={priority}
                    onClick={() => handleSetPriority(priority)}
                    className="w-full text-left px-3 py-2 rounded text-sm hover:bg-bg-secondary transition-colors capitalize"
                  >
                    <span className={`font-medium ${
                      priority === 'high' ? 'text-red-500' :
                      priority === 'medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {priority}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tags Menu */}
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowTagMenu(!showTagMenu)}
              disabled={isProcessing}
              className="text-xs sm:text-sm px-2 sm:px-3"
              title="Add tag"
            >
              <Tag size={16} />
              <span className="hidden sm:inline">Tag</span>
            </Button>

            {showTagMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-card-bg border border-border rounded-lg shadow-lg p-3 min-w-[200px]">
                {/* Add new tag */}
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="New tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTag.trim()) {
                        handleAddTag(newTag.trim());
                      }
                    }}
                    className="w-full px-2 py-1.5 bg-bg-secondary border border-border rounded text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Existing tags */}
                {allTags.length > 0 && (
                  <div className="border-t border-border pt-2 max-h-40 overflow-y-auto">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleAddTag(tag)}
                        className="w-full text-left px-2 py-1.5 rounded text-sm hover:bg-bg-secondary transition-colors text-text-primary"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Delete */}
          <Button
            variant="secondary"
            onClick={handleDelete}
            disabled={isProcessing}
            className="text-xs sm:text-sm px-2 sm:px-3 hover:bg-red-500 hover:text-white"
            title="Delete"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </Button>

          {/* Clear Selection */}
          <button
            onClick={onClearSelection}
            className="text-text-tertiary hover:text-text-primary transition-colors p-1"
            title="Clear selection"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchActions;
