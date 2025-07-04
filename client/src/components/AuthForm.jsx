import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/details');
  };

  return (
    <div className="bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md max-w-md w-full text-center">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Create Account</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
          Sign Up
        </button>

        <div className="flex flex-col space-y-2 mt-4">
          <button className="border py-2 rounded-lg hover:bg-gray-100">Continue with Google</button>
          <button className="border py-2 rounded-lg hover:bg-gray-100">Use as Guest</button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <span className="text-indigo-600 cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
