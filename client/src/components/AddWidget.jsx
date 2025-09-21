import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, closeAddWidgetModal } from '../store/widgetSlice';

const AddWidget = () => {
  const dispatch = useDispatch();
  const { isAddWidgetModalOpen, selectedCategoryId, categories } = useSelector(state => state.widgets);

  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!widgetName.trim() || !widgetText.trim()) {
      alert('Please fill in both widget name and text.');
      return;
    }

    dispatch(addWidget({
      categoryId: selectedCategoryId,
      widget: {
        name: widgetName.trim(),
        text: widgetText.trim()
      }
    }));

    // Reset form and close modal
    setWidgetName('');
    setWidgetText('');
    dispatch(closeAddWidgetModal());
  };

  const handleClose = () => {
    setWidgetName('');
    setWidgetText('');
    dispatch(closeAddWidgetModal());
  };

  if (!isAddWidgetModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add Widget to {selectedCategory?.name}</h3>
          <button 
            className="modal-close-btn"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-widget-form">
          <div className="form-group">
            <label htmlFor="widgetName">Widget Name:</label>
            <input
              type="text"
              id="widgetName"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Enter widget name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="widgetText">Widget Text:</label>
            <textarea
              id="widgetText"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              placeholder="Enter widget content"
              className="form-textarea"
              rows="4"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
            >
              Add Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidget;