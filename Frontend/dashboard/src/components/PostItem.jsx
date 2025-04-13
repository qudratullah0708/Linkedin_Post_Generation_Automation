import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostToLinkedInButton from './PostToLinkedinButton';

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/protected/posts/${post.id}`);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 mb-4 transition-all">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-blue-700">{post.title}</h4>
        <PostToLinkedInButton post={post} />
      </div>

      <button
        onClick={handleViewDetails}
        className="text-blue-600 underline text-sm hover:text-blue-800"
      >
        View Details
      </button>
    </div>
  );
};

export default PostItem;
