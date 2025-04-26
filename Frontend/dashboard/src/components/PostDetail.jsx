import React, { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../services/api'; // Remove editLinkedInPost import
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Fetch the post by ID when the component mounts
  useEffect(() => {
    getPostById(id).then(setPost);
  }, [id]);

  // Handle the post deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      navigate('/protected/posts');
    }
  };

  // Navigate to the Edit page without calling the editLinkedInPost endpoint
  const handleEdit = () => {
    navigate(`/protected/posts/edit/${post.id}`, { state: { content: post.content } });
  };

  // Show loading text if the post is still being fetched
  if (!post) return <p className="text-gray-500 p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mt-6">
      <h3 className="text-md font-bold text-blue-700 mb-4">{post.title}</h3>
      <p className="text-gray-700 leading-relaxed">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEdit} // Just navigate to the Edit page without making the API call
          className={`flex items-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-4 rounded-md transition`}
          disabled={loading} // Disable the button during loading
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            <Pencil className="w-4 h-4" />
          )}
          {loading ? 'Loading...' : 'Edit'}
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
