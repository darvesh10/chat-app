import React, { useState, useEffect, useRef } from 'react';

const dummyUsers = [
  { id: 1, name: 'John', pic: '👨' },
  { id: 2, name: 'Emma', pic: '👩' },
  { id: 3, name: 'Alex', pic: '🧑' },
  { id: 4, name: 'Sarah', pic: '👧' },
  { id: 5, name: 'Mike', pic: '👦' },
];

const GroupChatModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);

  const fileInputRef = useRef(null); // Reference for hidden file input

  useEffect(() => {
    const savedImage = localStorage.getItem('groupImage');
    if (savedImage) setGroupImage(savedImage);
  }, []);

  const handleCheckboxChange = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter(u => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupImage(reader.result);
        localStorage.setItem('groupImage', reader.result);
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
    localStorage.removeItem('groupImage');
    onClose();
  };

  const handleClickImageIcon = () => {
    fileInputRef.current.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">Create Group Chat</h2>

        <div className="relative flex flex-col items-center mb-4">
          {groupImage ? (
            <img src={groupImage} alt="Group" className="w-20 h-20 rounded-full object-cover border" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
              📷
            </div>
          )}

          <button
            onClick={handleClickImageIcon}
            className="absolute bottom-0 right-28 bg-indigo-600 text-white rounded-full p-1 text-xs hover:bg-indigo-700"
            title="Change Group Image"
          >
            +
          </button>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>

        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <div className="space-y-3 mb-6">
          {dummyUsers.map((user) => (
            <label key={user.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user)}
                onChange={() => handleCheckboxChange(user)}
                className="accent-indigo-600"
              />
              <span className="text-xl">{user.pic}</span>
              <span className="text-gray-800 font-medium">{user.name}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleCreateGroup}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 mb-3"
        >
          Create Group
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 text-sm text-gray-500 hover:text-indigo-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GroupChatModal;
