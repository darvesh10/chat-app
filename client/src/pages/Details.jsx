import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import Footer from '../components/Footer';

const Details = () => {
  const [bio, setBio] = useState('');
  const [selectedBio, setSelectedBio] = useState('');
  const [profilePic, setProfilePic] = useState('👤');  
  const navigate = useNavigate();

  const presetBios = [
    "😴 Sleeping",
    "💼 Busy at Work",
    "🏠 At Home",
    "🎉 At Party",
    "📚 Studying Hard",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const updatedUser = { ...user, bio: bio || selectedBio, profilePic };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-200 font-sans">
      <header className="text-center mt-8">
        <h1 className="text-4xl font-bold text-indigo-800">Set Up Your Persona</h1>
        <p className="text-lg text-gray-600 mt-2">Choose your vibe and let’s get chatting</p>
      </header>

      <main className="flex justify-center items-start mt-12">
        <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-2xl flex flex-col items-center space-y-6">

          <ProfileCard profilePic={profilePic} setProfilePic={setProfilePic} />

          <div className="w-full text-left">
            <label className="block mb-2 font-medium text-indigo-700">Short Bio</label>
            <input
              type="text"
              placeholder="Type your own bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
            />

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Or choose from presets:</p>
              <div className="flex flex-wrap gap-2">
                {presetBios.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedBio(preset)}
                    className={`border px-4 py-2 rounded-full ${selectedBio === preset ? 'bg-indigo-500 text-white' : 'hover:bg-gray-100'}`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            Save & Continue
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Details;

