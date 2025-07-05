import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 shadow flex justify-between items-center px-6 py-4 rounded-b-2xl">
      <h1 className="text-2xl font-bold text-indigo-700">PersonaChat AI</h1>
      <div className="space-x-6 text-indigo-600 font-medium">
        <button onClick={() => alert('Coming Soon!')}>Group Chat</button>
        <button onClick={() => alert('Coming Soon!')}>How to Use</button>
        <button onClick={handleLogout} className="text-red-500">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
