import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost, getPostById, editLinkedInPost } from '../services/api';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch the current post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id);
        setPost(postData);
      } catch (err) {
        setError('Failed to load post');
        console.error('Error loading post:', err);
      }
    };
    fetchPost();
  }, [id]);

  // Handle saving the edited post
  const handleSave = async () => {
    if (!post) return;

    // Reset error state
    setError('');

    // Validate content
    if (!post.content?.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await updatePost(id, post);
      navigate(`/protected/posts/${id}`);
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err.message || 'Failed to save the post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle generating new content using AI
  const handleGenerateContent = async () => {
    if (!post?.content) {
      setError('Please enter some content to improve');
      return;
    }

    setError('');
    setIsGenerating(true);
    try {
      const generatedContent = await editLinkedInPost(post.content);
      setPost(prev => ({ ...prev, content: generatedContent }));
    } catch (err) {
      console.error('Error generating content:', err);
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!post) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mt-6">
      <h3 className="text-md font-bold text-blue-700 mb-4">Edit Post</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={post.title || ''}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter post title"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={post.content || ''}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          rows="8"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your post content..."
        />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {/* AI Generation Button */}
        <button
          onClick={handleGenerateContent}
          className={`flex items-center justify-center gap-2 ${
            isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } text-white font-medium py-2 px-4 rounded-md transition w-full`}
          disabled={isGenerating || loading}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            'Improve with AI'
          )}
        </button>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className={`flex items-center justify-center gap-2 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium py-2 px-4 rounded-md transition flex-1`}
            disabled={loading || isGenerating}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Save'
            )}
          </button>

          <button
            onClick={() => navigate(`/protected/posts/${id}`)}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition flex-1"
            disabled={loading || isGenerating}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
