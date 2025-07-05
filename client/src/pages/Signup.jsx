import React from 'react';
import AuthForm from '../components/AuthForm';
import FeatureTeaser from '../components/FeatureTeaser';
import Footer from '../components/Footer';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-200 font-sans">
      <header className="text-center mt-8">
        <h1 className="text-5xl font-bold text-indigo-800">PersonaChat AI</h1>
        <p className="text-lg text-gray-600 mt-2">Smart. Simple. Human-like Conversations.</p>
      </header>

      <main className="flex flex-col items-center mt-10 space-y-12">
      <AuthForm type="signup" />
        <FeatureTeaser />
      </main>

      <Footer />
    </div>
  );
};

export default Signup;

