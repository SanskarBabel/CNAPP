# MERN Dashboard Widget Management System

## Project Overview
Complete MERN stack dashboard application with dynamic widget management functionality based on assignment requirements.

## Features
- Dynamic JSON-driven dashboard with categories
- Add/remove widgets functionality
- Real-time search across all widgets
- Redux state management
- Responsive design
- MongoDB persistence

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm/yarn

### Installation

1. **Backend Setup**
```bash
cd server
npm install
echo "MONGODB_URI=mongodb://localhost:27017/dashboard" > .env
echo "PORT=5000" >> .env
npm run dev
```

2. **Frontend Setup**
```bash
cd client
npm install
npm start
```

3. **Initialize Database**
```bash
curl -X POST http://localhost:5000/api/initialize
```

## Usage
- Open http://localhost:3000
- Click "+Add Widget" to add widgets
- Use search bar for filtering
- Click ✕ on widgets to remove them

## Tech Stack
- Frontend: React.js, Redux Toolkit, CSS3
- Backend: Node.js, Express.js, MongoDB, Mongoose
- State Management: Redux Toolkit
