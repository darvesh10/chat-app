import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');
  const [bio, setBio] = useState(localStorage.getItem('bio') || '');
  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem('profilePic', profilePic);
    localStorage.setItem('bio', bio);
    navigate('/home');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Update Your Profile</h2>

        <img src={profilePic || 'https://i.pravatar.cc/100'} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />

        <input type="file" onChange={handleFileChange} className="mb-4" />

        <textarea
          placeholder="Write your bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        ></textarea>

        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
