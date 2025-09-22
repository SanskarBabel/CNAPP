// client/src/services/api.js - Create this file for API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app' 
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  DASHBOARD: `${API_BASE_URL}/api/dashboard`,
  WIDGETS: `${API_BASE_URL}/api/widgets`,
  SEARCH: `${API_BASE_URL}/api/widgets/search`,
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  INITIALIZE: `${API_BASE_URL}/api/initialize`
};

// Example usage in components
export const fetchDashboardData = async () => {
  const response = await fetch(API_ENDPOINTS.DASHBOARD);
  return response.json();
};

export const addWidget = async (widgetData) => {
  const response = await fetch(API_ENDPOINTS.WIDGETS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(widgetData),
  });
  return response.json();
};

export const deleteWidget = async (widgetId) => {
  const response = await fetch(`${API_ENDPOINTS.WIDGETS}/${widgetId}`, {
    method: 'DELETE',
  });
  return response.json();
};