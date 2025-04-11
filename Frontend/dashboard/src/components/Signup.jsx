import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, User, Lock, Mail } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Optional, depending on backend
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // New state for success message
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    const formDetails = new URLSearchParams();
    formDetails.append('name', name);
    formDetails.append('email', email); // optional
    formDetails.append('password', password);

    try {
      const response = await fetch('http://localhost:9000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        setError('');
        navigate('/login');
      } else {
        const err = await response.json();
        setError(err.detail || 'Signup failed');
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
        <UserPlus className="w-10 h-10 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <div className="relative mb-4">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 w-full py-3 rounded border"
          />
        </div>

        {/* Optional email field if you want it */}
        
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? 'Creating...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
