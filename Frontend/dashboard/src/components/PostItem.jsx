import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <Link
      to={`/protected/posts/${post.id}`}
      className="block bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 mb-4 hover:bg-gray-50"
    >
      <h4 className="text-sm font-semibold text-blue-700 mb-1">{post.title}</h4>
      {/* <p className="text-gray-600 truncate">{post.content}</p> */}
    </Link>
  );
};

export default PostItem;
