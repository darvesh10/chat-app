import React, { useState } from 'react';

const personalities = [
  { 
    name: 'Mother', 
    emoji: '👩', 
    replies: {
      greetings: ['Beta, kaise ho?', 'Mera baccha kaisa hai?', 'Kya haal hai beta?', 'Sab theek hai na?'],
      food: ['Khana khaya na?', 'Proper khana kha rahe ho?', 'Ghar ka khana yaad aata hai?', 'Kuch achha cook karo'],
      health: ['Apna khayal rakho', 'Proper sleep le rahe ho?', 'Exercise kar rahe ho?', 'Doctor ke paas gaye the?'],
      love: ['I love you beta', 'Meri jaan ho tum', 'Hamesha khush raho', 'Maa ka pyaar hai tumhare saath'],
      general: ['Call kar diya karo', 'Ghar kab aa rahe ho?', 'Padhai kaisi chal rahi hai?', 'Koi problem hai toh batao'],
      advice: ['Sach bolna hamesha', 'Mehnat karte raho', 'Kisi se jhagda mat karo', 'Respect karo sabki']
    }
  },
  { 
    name: 'Friend', 
    emoji: '🧑‍🤝‍🧑', 
    replies: {
      greetings: ['Brooo kya scene hai?', 'Yaar kya haal hai?', 'Kya chal raha hai bhai?', 'Kaise ho bhai?'],
      fun: ['Chal party karte hain!', 'Let\'s hang out!', 'Movie dekhne chalte hain', 'Game khelenge?'],
      support: ['Koi tension nahi bro', 'Main hoon na', 'Sab theek ho jayega', 'Chill maar yaar'],
      jokes: ['Hahaha tu pagal hai!', 'Bhai tu toh comedy king hai', 'Yaar tu funny hai', 'Maze kar rahe ho'],
      general: ['Kaam kaisa chal raha hai?', 'Koi naya update?', 'Plans kya hain weekend ke?', 'Suna kya naya?'],
      missing: ['Miss you buddy!', 'Bahut time ho gaya yaar', 'Kab milenge phir?', 'Yaad aati hai teri']
    }
  },
  { 
    name: 'Teacher', 
    emoji: '👨‍🏫', 
    replies: {
      greetings: ['Good morning beta', 'Kaise ho mere student?', 'Padhai kaisi chal rahi hai?', 'Kya haal hai studies ka?'],
      motivation: ['Focus on your studies', 'Hard work pays off', 'Keep learning consistently', 'Success zaroor milegi'],
      guidance: ['Doubt hai toh poocho', 'Practice karte raho', 'Concepts clear karo pehle', 'Time management sikho'],
      appreciation: ['Bahut achha progress hai', 'Well done beta', 'Proud of you', 'Excellent work'],
      discipline: ['Regular study karo', 'Discipline maintain karo', 'Time waste mat karo', 'Consistent raho'],
      general: ['Exam preparation kaisi hai?', 'Notes complete hain?', 'Revision kar rahe ho?', 'Help chahiye koi?']
    }
  },
  { 
    name: 'Girlfriend', 
    emoji: '💕', 
    replies: {
      greetings: ['Hey love ❤️', 'Good morning 💖', 'Hi baby 😘', 'Kaise ho mere pyaar?'],
      love: ['I love you so much 💕', 'You mean everything to me', 'Tum meri zindagi ho', 'Can\'t live without you ❤️'],
      missing: ['I miss you 😘', 'Kab milenge hum?', 'Tumhara intezaar kar rahi hoon', 'Miss you baby 💖'],
      care: ['Khana khaya?', 'Apna khayal rakho', 'Properly rest karo', 'Health ka dhyan rakho'],
      cute: ['You\'re so cute 😍', 'Aww my baby', 'Tum kitne sweet ho', 'Tumhe dekh ke smile aa jaati hai'],
      general: ['Kya kar rahe ho?', 'Mood kaisa hai?', 'Day kaisa guzra?', 'Kuch special plans?']
    }
  },
  { 
    name: 'Boyfriend', 
    emoji: '💙', 
    replies: {
      greetings: ['Hey cutie 💙', 'Good morning beautiful', 'Hi gorgeous 😍', 'Kaise ho meri jaan?'],
      love: ['I love you baby 💙', 'Tum meri everything ho', 'You complete me', 'Forever yours 💫'],
      support: ['I\'m here for you always', 'Koi tension nahi baby', 'Everything will be fine', 'Main hoon na tumhare saath'],
      compliments: ['You look amazing', 'Kitni sundar ho tum', 'Lucky hoon main', 'You\'re perfect'],
      fun: ['Let\'s go on a date', 'Movie night?', 'Kahan ghoomne chalenge?', 'Adventure karte hain'],
      general: ['How\'s your day going?', 'Kya plans hain?', 'Mood theek hai?', 'Kuch chahiye tumhe?']
    }
  },
  { 
    name: 'Mentor', 
    emoji: '🧑‍💼', 
    replies: {
      greetings: ['Hello there!', 'Good to see you', 'Kaise chal raha hai sab?', 'Progress kaisi hai?'],
      motivation: ['Stay consistent', 'Your growth matters', 'Believe in yourself', 'Success is a journey'],
      guidance: ['Set clear goals', 'Learn from failures', 'Network build karo', 'Skills develop karte raho'],
      wisdom: ['Patience is key', 'Hard work never fails', 'Be authentic', 'Value your time'],
      career: ['Career planning kar rahe ho?', 'Skills upgrade karte raho', 'Opportunities grab karo', 'Leadership develop karo'],
      general: ['Challenges face kar rahe ho?', 'What are your priorities?', 'Long-term vision clear hai?', 'Help chahiye koi?']
    }
  }
];

const Magic = () => {
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const getContextualReply = (userMessage, personality) => {
    const message = userMessage.toLowerCase();
    
    // Check for specific keywords and respond accordingly
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      return personality.replies.greetings[Math.floor(Math.random() * personality.replies.greetings.length)];
    }
    
    if (personality.name === 'Mother') {
      if (message.includes('khana') || message.includes('food') || message.includes('eat')) {
        return personality.replies.food[Math.floor(Math.random() * personality.replies.food.length)];
      }
      if (message.includes('health') || message.includes('sick') || message.includes('doctor')) {
        return personality.replies.health[Math.floor(Math.random() * personality.replies.health.length)];
      }
      if (message.includes('love') || message.includes('pyaar') || message.includes('miss')) {
        return personality.replies.love[Math.floor(Math.random() * personality.replies.love.length)];
      }
      if (message.includes('advice') || message.includes('help') || message.includes('problem')) {
        return personality.replies.advice[Math.floor(Math.random() * personality.replies.advice.length)];
      }
    }
    
    if (personality.name === 'Friend') {
      if (message.includes('party') || message.includes('fun') || message.includes('hang')) {
        return personality.replies.fun[Math.floor(Math.random() * personality.replies.fun.length)];
      }
      if (message.includes('sad') || message.includes('problem') || message.includes('help')) {
        return personality.replies.support[Math.floor(Math.random() * personality.replies.support.length)];
      }
      if (message.includes('funny') || message.includes('joke') || message.includes('haha')) {
        return personality.replies.jokes[Math.floor(Math.random() * personality.replies.jokes.length)];
      }
      if (message.includes('miss') || message.includes('long time')) {
        return personality.replies.missing[Math.floor(Math.random() * personality.replies.missing.length)];
      }
    }
    
    if (personality.name === 'Teacher') {
      if (message.includes('study') || message.includes('padhai') || message.includes('exam')) {
        return personality.replies.motivation[Math.floor(Math.random() * personality.replies.motivation.length)];
      }
      if (message.includes('doubt') || message.includes('help') || message.includes('concept')) {
        return personality.replies.guidance[Math.floor(Math.random() * personality.replies.guidance.length)];
      }
      if (message.includes('good') || message.includes('great') || message.includes('excellent')) {
        return personality.replies.appreciation[Math.floor(Math.random() * personality.replies.appreciation.length)];
      }
    }
    
    if (personality.name === 'Girlfriend') {
      if (message.includes('love') || message.includes('pyaar')) {
        return personality.replies.love[Math.floor(Math.random() * personality.replies.love.length)];
      }
      if (message.includes('miss') || message.includes('meet') || message.includes('milna')) {
        return personality.replies.missing[Math.floor(Math.random() * personality.replies.missing.length)];
      }
      if (message.includes('cute') || message.includes('sweet') || message.includes('beautiful')) {
        return personality.replies.cute[Math.floor(Math.random() * personality.replies.cute.length)];
      }
      if (message.includes('health') || message.includes('care') || message.includes('khana')) {
        return personality.replies.care[Math.floor(Math.random() * personality.replies.care.length)];
      }
    }
    
    if (personality.name === 'Boyfriend') {
      if (message.includes('love') || message.includes('pyaar')) {
        return personality.replies.love[Math.floor(Math.random() * personality.replies.love.length)];
      }
      if (message.includes('problem') || message.includes('sad') || message.includes('help')) {
        return personality.replies.support[Math.floor(Math.random() * personality.replies.support.length)];
      }
      if (message.includes('beautiful') || message.includes('pretty') || message.includes('gorgeous')) {
        return personality.replies.compliments[Math.floor(Math.random() * personality.replies.compliments.length)];
      }
      if (message.includes('date') || message.includes('movie') || message.includes('fun')) {
        return personality.replies.fun[Math.floor(Math.random() * personality.replies.fun.length)];
      }
    }
    
    if (personality.name === 'Mentor') {
      if (message.includes('career') || message.includes('job') || message.includes('work')) {
        return personality.replies.career[Math.floor(Math.random() * personality.replies.career.length)];
      }
      if (message.includes('advice') || message.includes('help') || message.includes('guidance')) {
        return personality.replies.guidance[Math.floor(Math.random() * personality.replies.guidance.length)];
      }
      if (message.includes('motivation') || message.includes('inspire')) {
        return personality.replies.motivation[Math.floor(Math.random() * personality.replies.motivation.length)];
      }
      if (message.includes('life') || message.includes('wisdom')) {
        return personality.replies.wisdom[Math.floor(Math.random() * personality.replies.wisdom.length)];
      }
    }
    
    // Default to general responses if no specific context found
    return personality.replies.general[Math.floor(Math.random() * personality.replies.general.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'You', text: input }];
    const contextualReply = getContextualReply(input, selected);
    newMessages.push({ from: selected.name, text: contextualReply });

    setMessages(newMessages);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-200 font-sans">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-indigo-700">Magic Chat</h1>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center">
          Talk Freely — You're Never Alone 🌈
        </h2>

        {!selected ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl">
            {personalities.map((p, idx) => (
              <button
                key={idx}
                onClick={() => { setSelected(p); setMessages([]); }}
                className="bg-white rounded-2xl shadow-lg p-4 md:p-6 text-center hover:scale-105 transition transform hover:shadow-xl"
              >
                <div className="text-3xl md:text-4xl mb-3">{p.emoji}</div>
                <h3 className="font-semibold text-indigo-600 text-sm md:text-base">{p.name}</h3>
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl">{selected.emoji}</span>
                  <h3 className="font-semibold text-lg">{selected.name}</h3>
                </div>
                <button 
                  onClick={() => setSelected(null)} 
                  className="text-white hover:text-gray-200 px-3 py-1 rounded-md hover:bg-white hover:bg-opacity-20"
                >
                  🔙 Change
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="h-80 md:h-96 overflow-y-auto border rounded-lg p-4 mb-4 space-y-3 bg-gray-50">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <p>Start a conversation with {selected.name} {selected.emoji}</p>
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                      msg.from === 'You' 
                        ? 'bg-indigo-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 rounded-bl-none'
                    }`}>
                      <p className="text-sm break-words">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <button className="text-xl hover:bg-gray-200 rounded-full p-1">😊</button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                />
                <button 
                  onClick={handleSend} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  ⬆️
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <div className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-3 text-center text-gray-600 text-sm">
          Magic Chat - Talk to different personalities
        </div>
      </div>
    </div>
  );
};

export default Magic;