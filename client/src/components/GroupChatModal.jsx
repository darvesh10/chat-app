import React, { useState, useRef } from 'react';
import avatarIcon from '../assets/avatar_icon.png'; 
import { X, Camera, Plus, Users, Check } from 'lucide-react';

const dummyUsers = [
  { id: 1, name: 'ram', avatar: avatarIcon },
  { id: 2, name: 'rohan', avatar: avatarIcon },
  { id: 3, name: 'simran', avatar: avatarIcon },
  { id: 4, name: 'Sarah', avatar: avatarIcon },
  { id: 5, name: 'Mayank', avatar: avatarIcon },
];

const GroupChatModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleCheckboxChange = (user) => {
    if (selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedUsers.length === 0) {
      alert('Please enter Group Name and select users.');
      return;
    }

    const newGroup = {
      name: groupName,
      image: groupImage,
      members: selectedUsers,
    };

    onCreateGroup(newGroup);
    setGroupName('');
    setGroupImage(null);
    setSelectedUsers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Create Group Chat</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden">
                {groupImage ? (
                  <img src={groupImage} alt="Group" className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-10 h-10 text-indigo-600" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition-colors shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Add Members</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {dummyUsers.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedUsers.find((u) => u.id === user.id) !== undefined}
                      onChange={() => handleCheckboxChange(user)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedUsers.find((u) => u.id === user.id)
                          ? 'bg-indigo-600 border-indigo-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedUsers.find((u) => u.id === user.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span className="text-gray-800 font-medium">{user.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCreateGroup}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              Create Group
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
