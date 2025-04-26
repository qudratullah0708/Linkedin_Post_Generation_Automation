import React, { useState, useEffect } from 'react';
import { createPost, updatePost, getPostById } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const PostForm = ({ editMode = false }) => {
  const [post, setPost] = useState({ title: '', content: '', user_id: '' });
  const [topic, setTopic] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      getPostById(id).then(setPost).catch(() => setError('Failed to load post'));
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleGenerateContent = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate content.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:9000/generate_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (response.ok) {
        setPost({ ...post, content: data.generated_post });
      } else {
        throw new Error(data.detail || 'Failed to generate content');
      }
    } catch (error) {
      setError('An error occurred while generating content.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (editMode) {
        await updatePost(id, post);
        setSuccess('Post updated successfully!');
      } else {
        await createPost(post);
        setSuccess('Post created successfully!');
      }
      setTimeout(() => navigate('/protected/posts'), 1500);
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {editMode ? 'Edit Post' : 'Create New Post'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}

        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Enter post title"
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-semibold text-gray-700">
            Topic
          </label>
          <input
            id="topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., AI in Education, Real Estate Trends"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>

        {/* Editable Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            placeholder="Write your post content here..."
            required
            rows="6"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Markdown Preview (Read-only) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Content Preview
          </label>
          <div className="prose border border-gray-300 p-4 rounded-lg bg-gray-50 max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleGenerateContent}
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-600'} hover:${loading ? '' : 'bg-green-700'} text-white font-semibold py-3 rounded-lg transition duration-300 mb-4`}
          >
            {loading ? 'Generating Post Content...' : 'Generate Content from Topic'}
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {editMode ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
