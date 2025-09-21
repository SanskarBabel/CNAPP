import React from 'react';
import { useDispatch } from 'react-redux';
import { openAddWidgetModal } from '../store/widgetSlice';
import Widget from './Widget';

const CategorySection = ({ category }) => {
  const dispatch = useDispatch();

  const handleAddWidget = () => {
    dispatch(openAddWidgetModal(category.id));
  };

  return (
    <section className="category-section">
      <div className="category-header">
        <h2 className="category-title">{category.name}</h2>
        <button 
          className="add-widget-btn"
          onClick={handleAddWidget}
        >
          + Add Widget
        </button>
      </div>

      <div className="widgets-grid">
        {category.widgets.map(widget => (
          <Widget 
            key={widget.id} 
            widget={widget} 
            categoryId={category.id}
          />
        ))}

        {category.widgets.length === 0 && (
          <div className="no-widgets">
            <p>No widgets available. Click "Add Widget" to create one.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;