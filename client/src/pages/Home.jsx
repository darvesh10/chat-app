import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GroupChatModal from '../components/GroupChatModal';
import { useNavigate } from 'react-router-dom';
import avatarIcon from '../assets/avatar_icon.png';

const dummyChats = [
  { name: 'John' },
  { name: 'Emma' },
  { name: 'Group: Friends' },
  { name: 'Work Chat' },
  { name: 'Besties' },
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  const filteredChats = dummyChats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMagicClick = () => {
    navigate('/magic');
  };

  const handleGroupCreate = (newGroup) => {
    setGroups(prev => [...prev, newGroup]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-200 font-sans">
      <Navbar />

      <main className="flex flex-1 flex-col md:flex-row gap-6 p-6">

        <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full md:w-1/3">

          <button
            onClick={() => setIsGroupModalOpen(true)}
            className="mb-4 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
          >
            ➕ Create Group Chat
          </button>

          <input
            type="text"
            placeholder="Search Chats"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500"
          />

          <h2 className="font-semibold text-indigo-700 mb-3">Your Chats:</h2>

          <ul className="space-y-2">
            {filteredChats.map((chat, idx) => (
              <li
                key={idx}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer shadow-sm"
                onClick={() => navigate(`/chat/${idx}`, { state: { name: chat.name, image: avatarIcon } })}
              >
                <img
                  src={avatarIcon}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover mr-3 border"
                />
                <span className="text-gray-800">{chat.name}</span>
              </li>
            ))}

            {groups.map((group, idx) => (
              <li
                key={`group-${idx}`}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer shadow-sm"
                onClick={() => navigate(`/chat/${group.name}`, { state: { name: group.name, image: group.image || avatarIcon } })}
              >
                <img
                  src={group.image ? group.image : avatarIcon}
                  alt="Group"
                  className="w-8 h-8 rounded-full object-cover mr-3 border"
                />
                <span className="text-gray-800">{group.name}</span>
              </li>
            ))}
          </ul>

        </div>

        <div className="bg-white/90 p-8 rounded-2xl shadow-lg w-full md:w-2/3 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Talk with Different Personalities
          </h2>
          <p className="text-gray-600 max-w-md mb-6">
            Experience AI-powered conversations with unique chat modes like Mother, Friend, Teacher, Girlfriend, and more!
          </p>
          <button
            onClick={handleMagicClick}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow"
          >
            Magic Button ✨
          </button>
        </div>

      </main>

      <Footer />

      <GroupChatModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onCreateGroup={handleGroupCreate}
      />
    </div>
  );
};

export default Home;





