import React from 'react';
import AuthForm from '../components/AuthForm';
import FeatureTeaser from '../components/FeatureTeaser';
import Footer from '../components/Footer';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 font-sans">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <header className="text-center mt-12 relative z-10 fade-in">
        <div className="floating-animation">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            PersonaChat AI
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto px-4">
          Welcome Back! Login to Chat Smartly
        </p>
      </header>

      <main className="flex flex-col items-center mt-8 space-y-8 md:space-y-12 px-4 relative z-10">
        <div className="slide-up">
          <AuthForm type="login" />
        </div>
        <div className="slide-up" style={{ animationDelay: '0.2s' }}>
          <FeatureTeaser />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;


