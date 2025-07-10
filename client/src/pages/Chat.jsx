import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import axios from 'axios';

const Chat = () => {
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('defaultRoom');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const userId = localStorage.getItem('userId') || 'You';  // ✅ Get real user id

  const emojiCategories = {
    'Smileys': ['😊', '😂', '😍', '😘', '😎'],
    'Gestures': ['👍', '🙏', '👏', '🙌'],
    'Hearts': ['❤️', '💙', '💜', '💛'],
    'Objects': ['🔥', '🎉', '🎯', '🚀'],
  };

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    axios.get(`http://localhost:5000/api/chat/${roomId}`)
      .then(res => setMessages(res.data))
      .catch(console.error);

    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('receiveMessage');
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;

    const formData = new FormData();
    formData.append('sender', userId);
    formData.append('text', newMessage);
    formData.append('roomId', roomId);
    if (selectedFile) formData.append('file', selectedFile);

    try {
      const { data } = await axios.post('http://localhost:5000/api/chat/send', formData);
      socket.emit('sendMessage', { roomId, message: data });
      setMessages(prev => [...prev, data]);
      setNewMessage('');
      setSelectedFile(null);
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200">
      
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4 flex justify-between">
        <h2 className="text-indigo-700 font-semibold">Chat Room</h2>
        <button onClick={() => navigate('/home')} className="text-indigo-600">🔙 Back</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg shadow-sm ${msg.sender === userId ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {msg.type === 'image' ? (
                <img src={msg.text} alt="Shared" className="max-h-48 rounded-lg" />
              ) : (
                <p className="break-words">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4 flex items-center gap-2">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="hidden" id="fileInput" />
        <label htmlFor="fileInput">📎</label>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded p-2"
        />
        <button onClick={handleSendMessage} className="bg-indigo-600 text-white px-4 py-2 rounded">Send</button>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-20 left-0 right-0 p-3 bg-white rounded-lg shadow-lg">
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <div key={category} className="mb-2">
              <p className="text-xs text-gray-500">{category}</p>
              <div className="flex flex-wrap gap-1">
                {emojis.map((emoji, idx) => (
                  <button key={idx} onClick={() => handleEmojiClick(emoji)}>{emoji}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Chat;



