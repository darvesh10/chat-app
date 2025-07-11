import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, HelpCircle, Sparkles } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="relative z-20 bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <h1 className="text-xl md:text-2xl font-bold gradient-text">PersonaChat AI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => alert('Group chat feature coming soon!')}
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="hidden md:block">Groups</span>
            </button>
            
            <button
              onClick={() => alert('Help section coming soon!')}
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="hidden md:block">Help</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
