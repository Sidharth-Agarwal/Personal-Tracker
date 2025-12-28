import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { X } from 'lucide-react';
import { getCustomTagColor, getTagSuggestions } from '../../utils/tagColors';

const TaskForm = ({ isOpen, onClose, onSubmit, initialTask = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    tags: [],
    dueDate: '',
    completed: false,
    recurrence: 'none',
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title || '',
        description: initialTask.description || '',
        priority: initialTask.priority || 'medium',
        tags: initialTask.tags || (initialTask.category ? [initialTask.category] : []),
        dueDate: initialTask.dueDate || '',
        completed: initialTask.completed || false,
        recurrence: initialTask.recurrence || 'none',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        tags: [],
        dueDate: '',
        completed: false,
        recurrence: 'none',
      });
    }
    setTagInput('');
  }, [initialTask, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !formData.tags.includes(tag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tag],
        }));
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTask ? 'Edit Task' : 'New Task'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialTask ? 'Update' : 'Create'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          label="Task Title"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Add more details..."
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => {
              const colors = getCustomTagColor(tag);
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-medium`}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-opacity-70 rounded-full p-0.5 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              );
            })}
          </div>
          <input
            type="text"
            placeholder="Add tags (press Enter)..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            onBlur={handleAddTag}
            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-text-tertiary mt-2">
            Press Enter to add tags. Examples: work, personal, urgent
          </p>
        </div>

        <Input
          type="date"
          name="dueDate"
          label="Due Date"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Recurrence
          </label>
          <select
            name="recurrence"
            value={formData.recurrence}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {formData.recurrence !== 'none' && (
            <p className="text-xs text-text-tertiary mt-2">
              When completed, a new task will be created for the next {formData.recurrence === 'daily' ? 'day' : formData.recurrence === 'weekly' ? 'week' : 'month'}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
