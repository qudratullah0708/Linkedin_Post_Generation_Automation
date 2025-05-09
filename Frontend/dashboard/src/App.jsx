import React from 'react';
import './index.css'; // adjust path if needed

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';

import ProtectedRoute from './components/ProtectedRoute';
import ProtectedPageLayout from './components/ProtectedPageLayout';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import DeletePostButton from './components/DeletePostButton';  // New component
import UpdatePostForm from './components/UpdatePostForm';  // New component
import CreateLinkedInPost from './components/CreateLinkedInPost'; //Import component
import PostEdit from './components/PostEdit'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <ProtectedPageLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="posts" />} />

          {/* Post routes */}
          <Route path="posts" element={<PostList />} />
          <Route path="posts/new" element={<PostForm />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="posts/edit/:id" element={<PostEdit />} />
          <Route path="posts/delete/:id" element={<DeletePostButton />} /> {/* Delete post route */}
          <Route path="posts/update/:id" element={<UpdatePostForm />} /> {/* Update post route */}
          {/* ✅ New LinkedIn Post Generator Route */}
          <Route path="linkedin" element={<CreateLinkedInPost />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


