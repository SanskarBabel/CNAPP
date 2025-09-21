import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/widgetSlice';

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this widget?')) {
      dispatch(removeWidget({ categoryId, widgetId: widget.id }));
    }
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">{widget.name}</h3>
        <button 
          className="widget-remove-btn"
          onClick={handleRemove}
          aria-label="Remove widget"
        >
          ✕
        </button>
      </div>

      <div className="widget-content">
        <p className="widget-text">{widget.text}</p>
      </div>
    </div>
  );
};

export default Widget;