import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        console.log(data)
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handlePostDelete = (deletedId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            
            onPostUpdated={handlePostUpdate}
            onPostDeleted={handlePostDelete}
          />
        ))
        
      )}
    </div>
  );
};

export default PostList;
