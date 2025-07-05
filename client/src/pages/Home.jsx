import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [search, setSearch] = useState('');
  const chats = ['John', 'Emma', 'Group: Friends', 'Work Chat', 'Besties'];

  const filteredChats = chats.filter(chat => chat.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-200 font-sans">
      <Navbar />

      <main className="flex flex-1 flex-col md:flex-row gap-6 p-6">

        {/* Left: Chat List */}
        <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Chats"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500"
          />
          <h2 className="font-semibold text-indigo-700 mb-3">Recent Chats:</h2>
          <ul className="space-y-2">
            {filteredChats.map((chat, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer shadow-sm"
              >
                {chat}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Feature Teaser */}
        <div className="bg-white/90 p-8 rounded-2xl shadow-lg w-full md:w-2/3 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Talk with Different Personalities
          </h2>
          <p className="text-gray-600 max-w-md mb-6">
            Experience AI-powered conversations with unique chat modes like Mother, Friend, Teacher, Girlfriend, and more!
          </p>
          <button
            onClick={() => alert('Magic Coming Soon!')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow"
          >
            Magic Button ✨
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
