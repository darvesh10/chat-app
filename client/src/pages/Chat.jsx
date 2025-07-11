import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, Smile, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

const Chat = () => {
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { name, image } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const userId = 'You';

  const emojiCategories = {
    'Smileys': ['😊', '😂', '😍', '😘', '😎', '🤗', '😋', '😉'],
    'Gestures': ['👍', '🙏', '👏', '🙌', '✌️', '🤝', '👋', '🤘'],
    'Hearts': ['❤️', '💙', '💜', '💛', '💚', '🧡', '💖', '💕'],
    'Objects': ['🔥', '🎉', '🎯', '🚀', '⭐', '✨', '🌟', '💫'],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length === 0) {
        setMessages([
          {
            id: 1,
            sender: name || 'User',
            text: 'Hey! How are you doing?',
            timestamp: new Date(),
            type: 'text',
          },
        ]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [messages.length, name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: userId,
      text: newMessage,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
    setShowEmojiPicker(false);

    setTimeout(() => {
      const replies = [
        "That's great!",
        'I understand.',
        'Tell me more about that.',
        'Interesting!',
        'Thanks for sharing.',
        'How do you feel about that?',
      ];

      const reply = {
        id: Date.now() + 1,
        sender: name || 'User',
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date(),
        type: 'text',
      };

      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {image ? (
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">👤</div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{name || 'Chat'}</h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                msg.sender === userId
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white text-gray-800 border'
              }`}
            >
              <p className="text-sm md:text-base break-words">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === userId ? 'text-indigo-100' : 'text-gray-500'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 border max-h-64 overflow-y-auto">
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <div key={category} className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">{category}</p>
              <div className="grid grid-cols-8 gap-2">
                {emojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-white/20 p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;



