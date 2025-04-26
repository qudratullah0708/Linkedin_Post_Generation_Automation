const BASE_URL = 'http://localhost:9000';

const token = () => localStorage.getItem('token');

export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.json();
};

export const getPostById = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.json();
};

export const createPost = async (post) => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const updatePost = async (id, post) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const deletePost = async (id) => {
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token()}` },
  });
};




export const editLinkedInPost = async (content) => {
  const res = await fetch(`${BASE_URL}/edit_post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error('Failed to edit post');
  }

  const data = await res.json();
  return data.generated_post;
};





