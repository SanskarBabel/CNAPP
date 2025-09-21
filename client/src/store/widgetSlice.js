import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dashboardName: "Security Dashboard",
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "widget1",
          name: "Cloud Accounts",
          text: "Connected: 2, Not Connected: 2"
        },
        {
          id: "widget2", 
          name: "Cloud Account Risk Assessment",
          text: "Failed: 1689, Warning: 681, Not Available: 36, Passed: 7253"
        }
      ]
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard", 
      widgets: [
        {
          id: "widget3",
          name: "Top 5 Namespace Specific Alerts",
          text: "No graph data available"
        },
        {
          id: "widget4",
          name: "Workload Alerts", 
          text: "No graph data available"
        }
      ]
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "widget5",
          name: "Image Risk Assessment",
          text: "Critical: 9, High: 150, Medium: 8, Low: 8"
        },
        {
          id: "widget6",
          name: "Image Security Issues",
          text: "Critical: 2, High: 2, Medium: 8, Low: 8"
        }
      ]
    }
  ],
  searchTerm: '',
  isAddWidgetModalOpen: false,
  selectedCategoryId: null
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        widget.id = `widget${Date.now()}`;
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    openAddWidgetModal: (state, action) => {
      state.isAddWidgetModalOpen = true;
      state.selectedCategoryId = action.payload;
    },
    closeAddWidgetModal: (state) => {
      state.isAddWidgetModalOpen = false;
      state.selectedCategoryId = null;
    },
    updateWidget: (state, action) => {
      const { categoryId, widgetId, updatedWidget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        const widgetIndex = category.widgets.findIndex(widget => widget.id === widgetId);
        if (widgetIndex !== -1) {
          category.widgets[widgetIndex] = { ...category.widgets[widgetIndex], ...updatedWidget };
        }
      }
    }
  }
});

export const { 
  addWidget, 
  removeWidget, 
  setSearchTerm, 
  openAddWidgetModal, 
  closeAddWidgetModal,
  updateWidget 
} = widgetSlice.actions;

export default widgetSlice.reducer;