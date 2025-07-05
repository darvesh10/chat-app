import React, { useState } from 'react';

const ProfileCard = ({ profilePic, setProfilePic }) => {
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProfilePic(imageUrl);ja
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setProfilePic('👤');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div
        className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md cursor-pointer"
        onClick={() => {
          if (preview) setIsModalOpen(true);
        }}
      >
        {preview ? (
          <img src={preview} alt="Profile" className="object-cover w-full h-full" />
        ) : (
          <span className="text-4xl">{profilePic}</span>
        )}
      </div>

      <label className="mt-2 cursor-pointer text-indigo-600 text-sm underline">
        Choose Profile Picture
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>

      {preview && (
        <button
          onClick={handleRemoveImage}
          className="mt-2 text-red-500 text-sm underline hover:text-red-700"
        >
          Remove Picture
        </button>
      )}

      {/* Modal with Close Button */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl hover:text-red-500"
          >
            &times;
          </button>

          <img
            src={preview}
            alt="Enlarged Preview"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;




