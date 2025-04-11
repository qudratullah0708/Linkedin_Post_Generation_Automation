import React, { useState, useEffect } from 'react';
import { createPost, updatePost, getPostById } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = ({ editMode = false }) => {
  const [post, setPost] = useState({ title: '', content: '', user_id: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      getPostById(id).then(setPost).catch(err => setError("Failed to load post"));
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success message

    try {
      if (editMode) {
        await updatePost(id, post);
        setSuccess('Post updated successfully!');
      } else {
        await createPost(post);
        setSuccess('Post created successfully!');
      }
      navigate('/posts');
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <input
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Title"
          className="input mb-4"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="Content"
          className="input h-32 mb-4"
        />
        <input
          name="user_id"
          value={post.user_id}
          onChange={handleChange}
          placeholder="User ID"
          className="input mb-4"
        />
        <button type="submit" className="btn-primary">
          {editMode ? 'Update' : 'Create'} Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
