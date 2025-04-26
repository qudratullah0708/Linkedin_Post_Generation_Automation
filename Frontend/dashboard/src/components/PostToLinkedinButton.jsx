import React, { useState } from 'react';

const convertMarkdownToLinkedInFormat = (markdown) => {
  let text = markdown;
  
  // Convert headers (# Text) to uppercase with line breaks
  text = text.replace(/^#\s+(.*?)$/gm, (match, group1) => {
    return `${group1.toUpperCase()}\n`;
  });
  
  // Convert ## and ### headers to mixed case with line breaks
  text = text.replace(/^#{2,3}\s+(.*?)$/gm, (match, group1) => {
    return `${group1}\n`;
  });

  // Convert bold (**text**) to uppercase for emphasis
  text = text.replace(/\*\*(.*?)\*\*/g, (match, group1) => {
    return group1.toUpperCase();
  });
  
  // Remove single asterisks or underscores
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');
  
  // Convert links [text](url) to format: text (url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
  
  // Convert bullet points to • with proper spacing
  text = text.replace(/^\s*[-*+]\s+/gm, '• ');
  
  // Preserve line breaks but remove excessive ones
  text = text.replace(/\n{3,}/g, '\n\n');
  
  return text.trim();
};

const PostToLinkedInButton = ({ post }) => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [timestamp, setTimestamp] = useState(null);

  const handlePostToLinkedIn = async () => {
    setStatus('loading'); // immediate click feedback

    try {
      const linkedInContent = convertMarkdownToLinkedInFormat(post.content);
      
      const res = await fetch('http://localhost:9000/post_to_linkedin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: linkedInContent }),
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
