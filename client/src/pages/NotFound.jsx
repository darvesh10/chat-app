import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="floating-animation">
          <div className="text-8xl md:text-9xl font-bold gradient-text">404</div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back to chatting!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={() => navigate('/home')}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;