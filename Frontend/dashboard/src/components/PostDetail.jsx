import React, { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then(setPost);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      navigate('/protected/posts');
    }
  };

  if (!post) return <p className="text-gray-500 p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mt-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">{post.title}</h2>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(`/protected/posts/edit/${post.id}`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
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
