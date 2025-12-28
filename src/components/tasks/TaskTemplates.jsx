import { useState } from 'react';
import { FileText, Plus, Trash2, CheckCircle, X } from 'lucide-react';
import Button from '../common/Button';
import { useTask } from '../../context/TaskContext';
import { getCustomTagColor } from '../../utils/tagColors';

const TaskTemplates = () => {
  const { taskTemplates, saveTemplate, deleteTemplate, createTaskFromTemplate } = useTask();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateData, setTemplateData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    tags: [],
    category: '',
  });
  const [newTag, setNewTag] = useState('');

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !templateData.title.trim()) {
      alert('Please provide template name and task title');
      return;
    }

    saveTemplate(templateName, templateData);

    // Reset form
    setTemplateName('');
    setTemplateData({
      title: '',
      description: '',
      priority: 'medium',
      tags: [],
      category: '',
    });
    setIsSaving(false);
  };

  const handleCreateFromTemplate = async (template) => {
    await createTaskFromTemplate(template);
  };

  const handleDeleteTemplate = (templateId) => {
    if (confirm('Delete this template?')) {
      deleteTemplate(templateId);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !templateData.tags.includes(newTag.trim())) {
      setTemplateData({
        ...templateData,
        tags: [...templateData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTemplateData({
      ...templateData,
      tags: templateData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  return (
    <div className="bg-card-bg border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-text-primary">Task Templates</h3>
        </div>
        <Button
          variant="secondary"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm"
        >
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Template List */}
          {taskTemplates.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-text-secondary">Saved Templates</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {taskTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-bg-secondary border border-border rounded-lg p-3 hover:border-accent transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-text-primary truncate">
                          {template.name}
                        </h5>
                        <p className="text-xs text-text-tertiary mt-1 truncate">
                          {template.data.title}
                        </p>
                        {template.data.tags && template.data.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {template.data.tags.slice(0, 2).map((tag) => {
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
                            {template.data.tags.length > 2 && (
                              <span className="text-xs text-text-tertiary">
                                +{template.data.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCreateFromTemplate(template)}
                          className="p-1 text-accent hover:bg-accent hover:text-white rounded transition-colors"
                          title="Create task from template"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-1 text-text-tertiary hover:bg-red-500 hover:text-white rounded transition-colors"
                          title="Delete template"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create New Template */}
          {!isSaving ? (
            <Button
              variant="secondary"
              onClick={() => setIsSaving(true)}
              className="w-full"
            >
              <Plus size={16} />
              Create New Template
            </Button>
          ) : (
            <div className="border border-border rounded-lg p-4 bg-bg-secondary space-y-3">
              <h4 className="text-sm font-medium text-text-primary">New Template</h4>

              {/* Template Name */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Weekly Review, Daily Standup"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Task Title */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  placeholder="Task title"
                  value={templateData.title}
                  onChange={(e) => setTemplateData({ ...templateData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Task description"
                  value={templateData.description}
                  onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  rows={2}
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Priority
                </label>
                <select
                  value={templateData.priority}
                  onChange={(e) => setTemplateData({ ...templateData, priority: e.target.value })}
                  className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <Button variant="secondary" onClick={handleAddTag} className="text-sm">
                    Add
                  </Button>
                </div>
                {templateData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {templateData.tags.map((tag) => {
                      const colors = getCustomTagColor(tag);
                      return (
                        <span
                          key={tag}
                          className={`${colors.bg} ${colors.text} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-500"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Category (optional)"
                  value={templateData.category}
                  onChange={(e) => setTemplateData({ ...templateData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="primary" onClick={handleSaveTemplate} className="flex-1">
                  <CheckCircle size={16} />
                  Save Template
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsSaving(false);
                    setTemplateName('');
                    setTemplateData({
                      title: '',
                      description: '',
                      priority: 'medium',
                      tags: [],
                      category: '',
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskTemplates;
