const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Widget Schema
const widgetSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },  
  text: { type: String, required: true },
  categoryId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Widget = mongoose.model('Widget', widgetSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);

// Routes

// Get all dashboard data
app.get('/api/dashboard', async (req, res) => {
  try {
    const categories = await Category.find();
    const widgets = await Widget.find();

    const dashboardData = {
      dashboardName: "Security Dashboard",
      categories: categories.map(category => ({
        id: category.id,
        name: category.name,
        widgets: widgets.filter(widget => widget.categoryId === category.id)
      }))
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new widget
app.post('/api/widgets', async (req, res) => {
  try {
    const { name, text, categoryId } = req.body;

    const widget = new Widget({
      id: `widget${Date.now()}`,
      name,
      text,
      categoryId
    });

    await widget.save();
    res.status(201).json(widget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update widget
app.put('/api/widgets/:id', async (req, res) => {
  try {
    const { name, text } = req.body;

    const widget = await Widget.findOneAndUpdate(
      { id: req.params.id },
      { name, text, updatedAt: new Date() },
      { new: true }
    );

    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' });
    }

    res.json(widget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete widget
app.delete('/api/widgets/:id', async (req, res) => {
  try {
    const widget = await Widget.findOneAndDelete({ id: req.params.id });

    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' });
    }

    res.json({ message: 'Widget deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search widgets
app.get('/api/widgets/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const widgets = await Widget.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { text: { $regex: q, $options: 'i' } }
      ]
    });

    res.json(widgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create category
app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body;

    const category = new Category({
      id: `category${Date.now()}`,
      name
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Initialize default data
app.post('/api/initialize', async (req, res) => {
  try {
    // Check if data already exists
    const existingCategories = await Category.find();
    if (existingCategories.length > 0) {
      return res.json({ message: 'Data already initialized' });
    }

    // Create default categories
    const defaultCategories = [
      { id: 'cspm', name: 'CSPM Executive Dashboard' },
      { id: 'cwpp', name: 'CWPP Dashboard' },
      { id: 'registry', name: 'Registry Scan' }
    ];

    await Category.insertMany(defaultCategories);

    // Create default widgets
    const defaultWidgets = [
      {
        id: 'widget1',
        name: 'Cloud Accounts',
        text: 'Connected: 2, Not Connected: 2',
        categoryId: 'cspm'
      },
      {
        id: 'widget2',
        name: 'Cloud Account Risk Assessment', 
        text: 'Failed: 1689, Warning: 681, Not Available: 36, Passed: 7253',
        categoryId: 'cspm'
      },
      {
        id: 'widget3',
        name: 'Top 5 Namespace Specific Alerts',
        text: 'No graph data available',
        categoryId: 'cwpp'
      },
      {
        id: 'widget4',
        name: 'Workload Alerts',
        text: 'No graph data available', 
        categoryId: 'cwpp'
      },
      {
        id: 'widget5',
        name: 'Image Risk Assessment',
        text: 'Critical: 9, High: 150, Medium: 8, Low: 8',
        categoryId: 'registry'
      },
      {
        id: 'widget6',
        name: 'Image Security Issues',
        text: 'Critical: 2, High: 2, Medium: 8, Low: 8',
        categoryId: 'registry'
      }
    ];

    await Widget.insertMany(defaultWidgets);

    res.json({ message: 'Default data initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});