import React, { useState } from 'react';

const PostToLinkedInButton = ({ post }) => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [timestamp, setTimestamp] = useState(null);

  const handlePostToLinkedIn = async () => {
    setStatus('loading'); // immediate click feedback

    try {
      const res = await fetch('http://localhost:9000/post_to_linkedin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: post.content }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || 'Something went wrong');

      setStatus('success');
      setTimestamp(new Date().toLocaleString());
    } catch (err) {
      console.error('Error posting to LinkedIn:', err);
      setStatus('error');
    }
  };

  const getButtonStyle = () => {
    switch (status) {
      case 'loading':
        return 'bg-indigo-500 hover:bg-indigo-600';
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      case 'error':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handlePostToLinkedIn}
        className={`px-3 py-1 rounded text-white transition-all duration-200 ${getButtonStyle()}`}
        disabled={status === 'loading'}
      >
        {status === 'loading'
          ? 'Posting...'
          : status === 'success'
          ? 'Posted to LinkedIn'
          : 'Post to LinkedIn'}
      </button>

      {status === 'success' && timestamp && (
        <p className="text-sm text-green-700 mt-1">Posted on {timestamp}</p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600 mt-1">Failed to post to LinkedIn</p>
      )}
    </div>
  );
};

export default PostToLinkedInButton;
