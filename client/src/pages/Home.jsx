import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GroupChatModal from '../components/GroupChatModal';
import avatarIcon from '../assets/avatar_icon.png'; 

import { useNavigate } from 'react-router-dom';
import { Search, Plus, Settings, Sparkles, MessageCircle, Users } from 'lucide-react';

const dummyChats = [
  { name: 'ram', image: avatarIcon },
  { name: 'rohan', image: avatarIcon },
  { name: 'simran', image: avatarIcon },
  { name: 'Sarah', image: avatarIcon },
  { name: 'Mayank', image: avatarIcon },
];


const Home = () => {
  const [search, setSearch] = useState('');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [profilePic, setProfilePic] = useState('👤');
  const [bio, setBio] = useState('Hey there! I am using PersonaChat AI');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.profilePic) setProfilePic(user.profilePic);
    if (user.bio) setBio(user.bio);
  }, []);

  const filteredChats = dummyChats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMagicClick = () => {
    navigate('/magic');
  };

  const handleGroupCreate = (newGroup) => {
    setGroups(prev => [...prev, newGroup]);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-3xl p-6 shadow-lg">
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {typeof profilePic === 'string' && profilePic.startsWith('data:') ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">{profilePic}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">You</p>
                  <p className="text-sm text-gray-600 truncate">{bio}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={handleSettingsClick}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl hover:from-amber-500 hover:to-orange-600 transition-all duration-300 hover:scale-105"
                >
                  <Settings className="w-5 h-5" />
                  <span>Profile Settings</span>
                </button>

                <button
                  onClick={() => setIsGroupModalOpen(true)}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl hover:from-green-500 hover:to-blue-600 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Group Chat</span>
                </button>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Your Chats
                </h3>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredChats.map((chat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/50 cursor-pointer transition-all duration-300 hover:scale-102"
                      onClick={() => navigate(`/chat/${idx}`, { state: { name: chat.name, image: chat.image } })}
                    >
                      <img
                        src={chat.image}
                        alt={chat.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{chat.name}</p>
                        <p className="text-sm text-gray-500 truncate">Online</p>
                      </div>
                    </div>
                  ))}

                  {groups.map((group, idx) => (
                    <div
                      key={`group-${idx}`}
                      className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/50 cursor-pointer transition-all duration-300 hover:scale-102"
                      onClick={() => navigate(`/chat/${group.name}`, { state: { name: group.name, image: group.image } })}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{group.name}</p>
                        <p className="text-sm text-gray-500 truncate">Group • {group.members?.length || 0} members</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-lg text-center space-y-8">
              <div className="floating-animation">
                <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-indigo-600 mx-auto mb-6" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                  Talk with Different Personalities
                </h2>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Experience AI-powered conversations with unique chat modes like Mother, Friend, Teacher, Girlfriend, and more! Each personality responds naturally to your messages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-2xl">
                  <div className="text-4xl mb-3">👩</div>
                  <h3 className="font-semibold text-gray-800">Caring</h3>
                  <p className="text-sm text-gray-600">Motherly love and support</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-2xl">
                  <div className="text-4xl mb-3">🧑‍🤝‍🧑</div>
                  <h3 className="font-semibold text-gray-800">Friendly</h3>
                  <p className="text-sm text-gray-600">Casual and fun conversations</p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl">
                  <div className="text-4xl mb-3">💕</div>
                  <h3 className="font-semibold text-gray-800">Romantic</h3>
                  <p className="text-sm text-gray-600">Sweet and loving chats</p>
                </div>
              </div>

              <button
                onClick={handleMagicClick}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 shadow-lg transition-all duration-300 text-lg"
              >
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>Start Magic Chat</span>
                </span>
              </button>
            </div>
          </div>
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








