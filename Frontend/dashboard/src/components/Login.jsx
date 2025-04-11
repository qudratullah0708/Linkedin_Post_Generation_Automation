import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDetails,
      });

      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/protected');
      } else {
        const err = await response.json();
        setError(err.detail || 'Login failed');
      }
    } catch {
      setLoading(false);
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 p-10 rounded-2xl max-w-md w-full shadow-xl backdrop-blur-lg"
      >
        <LogIn className="w-10 h-10 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <div className="relative mb-4">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 w-full py-3 rounded border"
          />
        </div>

        <div className="relative mb-4">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 w-full py-3 rounded border"
          />
        </div>

        {error && <p className="text-sm text-red-600 text-center mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded w-full hover:bg-blue-700"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-sm text-center">
          New here?{' '}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
