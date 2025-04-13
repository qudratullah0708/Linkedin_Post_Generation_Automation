import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, PlusCircle, FileText, Link as LinkIcon } from 'lucide-react';

const ProtectedPageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-md p-6 space-y-8">
        <div className="text-3xl font-extrabold tracking-tight">📌 Dashboard</div>
        
        <nav className="space-y-4">
          <Link
            to="posts"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition duration-150 
              ${isActive('posts') && !isActive('new') ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <FileText size={18} /> All Posts
          </Link>

          <Link
            to="posts/new"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition duration-150 
              ${isActive('new') ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <PlusCircle size={18} /> New Post
          </Link>

          {/* Add the new LinkedIn Post link */}
          <Link
            to="linkedin"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition duration-150 
              ${isActive('linkedin') ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <LinkIcon size={18} /> LinkedIn Post
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 mt-auto text-red-300 hover:text-red-100 hover:bg-red-500 rounded-lg transition duration-150"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedPageLayout;
