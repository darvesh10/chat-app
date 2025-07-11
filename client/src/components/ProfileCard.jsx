import React, { useState } from 'react';
import { Camera, X, Upload } from 'lucide-react';

const ProfileCard = ({ profilePic, setProfilePic }) => {
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProfilePic(imageUrl);
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
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div
          className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => {
            if (preview) setIsModalOpen(true);
          }}
        >
          {preview ? (
            <img src={preview} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <span className="text-4xl md:text-5xl">{profilePic}</span>
          )}
        </div>

        <div className="absolute -bottom-2 -right-2">
          <label className="bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg hover:scale-110 transform">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="text-center space-y-2">
        <label className="cursor-pointer text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors flex items-center justify-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Choose Profile Picture</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        {preview && (
          <button
            onClick={handleRemoveImage}
            className="text-red-500 text-sm hover:text-red-700 transition-colors flex items-center justify-center space-x-1 mx-auto"
          >
            <X className="w-4 h-4" />
            <span>Remove Picture</span>
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-3xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={preview}
              alt="Profile Preview"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;




