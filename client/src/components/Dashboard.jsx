import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/widgetSlice';
import SearchBar from './SearchBar';
import CategorySection from './CategorySection';
import AddWidget from './AddWidget';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardName, categories, searchTerm } = useSelector(state => state.widgets);

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => 
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>{dashboardName}</h1>
        <SearchBar />
      </header>

      <main className="dashboard-content">
        {filteredCategories.map(category => (
          <CategorySection 
            key={category.id} 
            category={category} 
          />
        ))}
      </main>

      <AddWidget />
    </div>
  );
};

export default Dashboard;