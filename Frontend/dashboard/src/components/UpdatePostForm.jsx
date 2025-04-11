// components/UpdatePostForm.jsx
import React, { useState } from 'react';
import { updatePost } from '../services/api';

const UpdatePostForm = ({ post, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updatePost(post.id, formData);
    onUpdate(updated); // callback to update parent state
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Content"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Post
      </button>
    </form>
  );
};

export default UpdatePostForm;
