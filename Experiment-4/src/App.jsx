import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Toast from './components/Toast/Toast';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import PostsPage from './pages/PostsPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

/**
 * App owns only routing and layout — no business logic. Keeping App.jsx
 * this thin is what the spec means by "do not put the entire application
 * inside App.jsx": every page fetches its own data and every piece of
 * shared state lives in Redux, not here.
 */
function App() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <Navbar />
        <main className="layout__content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/create" element={<CreatePostPage />} />
            <Route path="/posts/:id/edit" element={<EditPostPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <Toast />
    </div>
  );
}

export default App;
