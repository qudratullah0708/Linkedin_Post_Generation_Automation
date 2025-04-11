// components/DeletePostButton.jsx
import React from 'react';
import { deletePost } from '../services/api';

const DeletePostButton = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    await deletePost(postId);
    onDelete(postId); // callback to update parent state
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded ml-2"
    >
      Delete
    </button>
  );
};

export default DeletePostButton;
