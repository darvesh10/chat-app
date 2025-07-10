import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const chatUsers = [
    { id: '0', name: 'Mike', emoji: '👦', pic: 'https://i.pravatar.cc/100?img=1' },
    { id: '1', name: 'Emma', emoji: '👩', pic: 'https://i.pravatar.cc/100?img=2' },
    { id: '2', name: 'Group: Friends', emoji: '👥', pic: 'https://i.pravatar.cc/100?img=3' },
  ];

  const chatPartner = chatUsers[0];

  const [messages, setMessages] = useState([
    { id: 1, sender: chatPartner.name, text: 'Hey bro!', type: 'text' },
    { id: 2, sender: 'You', text: 'Hello!', type: 'text' },
    { id: 3, sender: chatPartner.name, text: 'How are you? 😊', type: 'text' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiCategories = {
    'Smileys': ['😊', '😂', '😍', '😘', '😎', '😭', '😡', '😴', '🤔', '😋', '😇', '🙄', '😤', '😱', '🤗', '🤤'],
    'Gestures': ['👍', '👎', '👏', '🙌', '👋', '✋', '👌', '✌️', '🤝', '🙏', '💪', '👊', '✊', '🤞', '🤟', '🤘'],
    'Hearts': ['❤️', '💕', '💖', '💗', '💙', '💚', '💛', '🧡', '💜', '🖤', '💔', '💯', '💢', '💥', '💫', '⭐'],
    'Objects': ['🔥', '💎', '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🎯', '⚡', '💡', '🔔', '📱', '💻', '🎮', '🚀']
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && !newImage) return;

    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: 'You',
        text: newMessage,
        type: 'text'
      };
      setMessages(prev => [...prev, newMsg]);
    }

    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage);
      const newMsg = {
        id: Date.now() + 1,
        sender: 'You',
        text: imageUrl,
        type: 'image'
      };
      setMessages(prev => [...prev, newMsg]);
      setNewImage(null);
    }

    setNewMessage('');
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={chatPartner.pic} alt="Profile" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              <h2 className="text-base md:text-lg font-semibold text-indigo-700">{chatPartner.name} {chatPartner.emoji}</h2>
            </div>
            <button 
              onClick={() => navigate('/home')}
              className="text-indigo-600 hover:text-indigo-800 text-sm md:text-base px-3 py-1 rounded-md hover:bg-indigo-50"
            >
              🔙 Back
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="bg-white rounded-xl shadow-lg h-[calc(100vh-200px)] md:h-[calc(100vh-180px)] overflow-hidden">
          <div className="h-full overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`group relative max-w-[85%] sm:max-w-[75%] md:max-w-[60%] p-3 rounded-lg shadow-sm ${
                  msg.sender === 'You' 
                    ? 'bg-indigo-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.type === 'text' ? (
                    <>
                      <p className="text-sm md:text-base break-words leading-relaxed">{msg.text}</p>
                      {msg.sender !== 'You' && (
                        <div className="mt-2 text-xs text-gray-500 italic">
                          🌐 Translated: This is a dummy translated text.
                        </div>
                      )}
                    </>
                  ) : (
                    <img 
                      src={msg.text} 
                      alt="Shared" 
                      className="rounded-lg max-w-full h-auto max-h-48 sm:max-h-60 md:max-h-80 object-cover" 
                    />
                  )}

                  {msg.sender === 'You' && (
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                      title="Delete message"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto p-4">
          <div className="relative">
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-xl shadow-lg border max-h-60 overflow-y-auto z-10">
                {Object.entries(emojiCategories).map(([category, emojis]) => (
                  <div key={category} className="p-3 border-b border-gray-100 last:border-b-0">
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">{category}</h3>
                    <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1">
                      {emojis.map((emoji, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleEmojiClick(emoji)}
                          className="text-lg md:text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-xl md:text-2xl hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                😊
              </button>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="cursor-pointer text-xl md:text-2xl hover:bg-gray-200 rounded-full p-2 transition-colors">
                📎
              </label>

              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-lg p-2 text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />

              <button
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                ⬆️
              </button>
            </div>

            {newImage && (
              <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <img 
                    src={URL.createObjectURL(newImage)} 
                    alt="Preview" 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span className="text-sm text-gray-600 flex-1 truncate">{newImage.name}</span>
                  <button 
                    onClick={() => setNewImage(null)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
};

export default Chat;

