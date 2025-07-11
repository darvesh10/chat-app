import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import Footer from '../components/Footer';
import { Sparkles, User } from 'lucide-react';

const Details = () => {
  const [bio, setBio] = useState('');
  const [selectedBio, setSelectedBio] = useState('');
  const [profilePic, setProfilePic] = useState('👤');
  const navigate = useNavigate();

  const presetBios = [
    { emoji: '😴', text: 'Sleeping', color: 'bg-blue-100 text-blue-700' },
    { emoji: '💼', text: 'Busy at Work', color: 'bg-green-100 text-green-700' },
    { emoji: '🏠', text: 'At Home', color: 'bg-purple-100 text-purple-700' },
    { emoji: '🎉', text: 'At Party', color: 'bg-pink-100 text-pink-700' },
    { emoji: '📚', text: 'Studying Hard', color: 'bg-indigo-100 text-indigo-700' },
    { emoji: '🎵', text: 'Listening to Music', color: 'bg-yellow-100 text-yellow-700' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...user, bio: bio || selectedBio, profilePic };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 font-sans">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <header className="text-center mt-8 md:mt-12 relative z-10 fade-in px-4">
        <div className="floating-animation">
          <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
            Set Up Your Persona
          </h1>
        </div>
        <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
          Choose your vibe and let's get chatting
        </p>
      </header>

      <main className="flex justify-center items-start mt-8 md:mt-12 px-4 relative z-10">
        <form 
          onSubmit={handleSubmit} 
          className="glass-effect p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-2xl space-y-6 md:space-y-8 slide-up"
        >
          <ProfileCard profilePic={profilePic} setProfilePic={setProfilePic} />

          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-indigo-600" />
              <label className="block font-semibold text-gray-700">Your Bio</label>
            </div>

            <input
              type="text"
              placeholder="Tell everyone what you're up to..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
            />

            <div className="space-y-4">
              <p className="text-sm text-gray-600 font-medium">Or choose from presets:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {presetBios.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedBio(`${preset.emoji} ${preset.text}`)}
                    className={`p-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedBio === `${preset.emoji} ${preset.text}` 
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-200 hover:border-gray-300 bg-white/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{preset.emoji}</div>
                    <div className="text-xs font-medium">{preset.text}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 shadow-lg transition-all duration-300"
          >
            Save & Continue to Chat
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Details;

