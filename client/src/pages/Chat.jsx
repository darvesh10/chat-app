import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const chatPartner = { id: '0', name: 'Mike', emoji: '👦', pic: 'https://i.pravatar.cc/100?img=1' };

  const [messages, setMessages] = useState([
    { id: 1, sender: chatPartner.name, text: 'Hey bro!', type: 'text' },
    { id: 2, sender: 'You', text: 'Hello!', type: 'text' },
    { id: 3, sender: chatPartner.name, text: 'How are you? 😊', type: 'text' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [translatedMessages, setTranslatedMessages] = useState({});

 
 const emojiList = ['😊', '😂', '😍', '👍', '❤️', '🔥', '🎉', '💯'];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        type: 'text',
      };
      setMessages(prev => [...prev, newMsg]);
    }

    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage);
      const newMsg = {
        id: Date.now() + 1,
        sender: 'You',
        text: imageUrl,
        type: 'image',
      };
      setMessages(prev => [...prev, newMsg]);
      setNewImage(null);
    }

    setNewMessage('');
  };

  const handleTranslate = (id) => {
    setTranslatedMessages(prev => ({
      ...prev,
      [id]: 'Translated text (dummy)',
    }));
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
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={chatPartner.pic} alt="Profile" className="w-10 h-10 rounded-full" />
            <h2 className="font-semibold text-indigo-700">{chatPartner.name} {chatPartner.emoji}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSummary(true)}
              className="text-indigo-600 hover:text-indigo-800 text-sm px-2 py-1 rounded hover:bg-indigo-50"
            >
              📝 Summarize
            </button>
            <button
              onClick={() => navigate('/home')}
              className="text-indigo-600 hover:text-indigo-800 text-sm px-2 py-1 rounded hover:bg-indigo-50"
            >
              🔙 Back
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="bg-white rounded-xl shadow-lg h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`group relative max-w-[85%] p-3 rounded-lg shadow ${
                msg.sender === 'You' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                {msg.type === 'text' ? (
                  <p className="text-sm break-words">{msg.text}</p>
                ) : (
                  <img src={msg.text} alt="Shared" className="rounded-lg max-w-full h-auto max-h-60 object-cover" />
                )}

                {translatedMessages[msg.id] && (
                  <p className="text-xs text-gray-200 mt-1 italic">{translatedMessages[msg.id]}</p>
                )}

                <button
                  onClick={() => handleTranslate(msg.id)}
                  className="text-xs mt-1 text-white/80 hover:underline"
                >
                  🌐 Translate
                </button>

                {msg.sender === 'You' && (
                  <button
                    onClick={() => setMessages(prev => prev.filter(m => m.id !== msg.id))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs hidden group-hover:flex items-center justify-center"
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

      {/* Input */}
      <div className="bg-white border-t shadow">
        <div className="max-w-4xl mx-auto p-4 flex items-center gap-3">
          
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-xl hover:bg-gray-100 rounded-full p-2"
          >
            😊
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-20 bg-white p-3 rounded-lg shadow grid grid-cols-8 gap-1 border">
              {emojiList.map((emoji, idx) => (
                <button key={idx} onClick={() => handleEmojiClick(emoji)} className="text-xl">{emoji}</button>
              ))}
            </div>
          )}

          <input type="file" id="fileInput" onChange={handleFileChange} accept="image/*" className="hidden" />
          <label htmlFor="fileInput" className="text-xl cursor-pointer hover:bg-gray-100 rounded-full p-2">📎</label>

          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border p-2 rounded-lg"
          />

          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            ⬆️
          </button>
        </div>

        {newImage && (
          <div className="max-w-4xl mx-auto mb-3">
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
              <img src={URL.createObjectURL(newImage)} alt="Preview" className="w-12 h-12 rounded object-cover" />
              <span className="text-sm">{newImage.name}</span>
              <button onClick={() => setNewImage(null)} className="text-red-500">✕</button>
            </div>
          </div>
        )}
      </div>

      {/* Summarize Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
            <h3 className="text-lg font-semibold mb-3 text-indigo-700">Chat Summary</h3>
            <p className="text-gray-600 text-sm mb-5">This is your dummy summary. Future mein AI ka output yahan dikhayenge.</p>
            <button
              onClick={() => setShowSummary(false)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Chat;

