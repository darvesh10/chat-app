import React, { useState } from 'react';
import { Send, ArrowLeft, Sparkles, Heart, Users, GraduationCap, FolderHeart as UserHeart, Brain } from 'lucide-react';

const personalities = [
  { 
    name: 'Mother', 
    emoji: '👩', 
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    description: 'Caring, nurturing, and always worried about you',
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
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    description: 'Your buddy who\'s always up for fun',
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
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    description: 'Wise, patient, and always encouraging',
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
    icon: UserHeart,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    description: 'Sweet, loving, and always there for you',
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
    icon: UserHeart,
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-50',
    description: 'Supportive, romantic, and your biggest fan',
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
    icon: Brain,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    description: 'Experienced, wise, and focused on your growth',
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
    }

    return personality.replies.general[Math.floor(Math.random() * personality.replies.general.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'You', text: input, timestamp: new Date() }];
    const contextualReply = getContextualReply(input, selected);

    setTimeout(() => {
      setMessages([...newMessages, { from: selected.name, text: contextualReply, timestamp: new Date() }]);
    }, 1000);

    setMessages(newMessages);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <h1 className="text-xl md:text-2xl font-bold gradient-text">Magic Chat</h1>
            </div>
            {selected && (
              <button
                onClick={() => setSelected(null)}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:block">Back to Personalities</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="relative z-10 p-4 md:p-6">
        {!selected ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12 fade-in">
              <div className="floating-animation">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                  Talk Freely — You're Never Alone 🌈
                </h2>
              </div>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                Choose a personality and experience natural, meaningful conversations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {personalities.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => { setSelected(p); setMessages([]); }}
                  className="glass-effect rounded-3xl p-6 md:p-8 text-center hover-lift cursor-pointer group slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <p.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2">{p.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{p.description}</p>
                  <div className="mt-4 text-2xl md:text-3xl">{p.emoji}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden">
              <div className={`bg-gradient-to-r ${selected.color} text-white p-4 md:p-6`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <selected.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl">{selected.name}</h3>
                    <p className="text-white/80 text-sm md:text-base">{selected.description}</p>
                  </div>
                </div>
              </div>

              <div className="h-80 md:h-96 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50">
                {messages.length === 0 && (
                  <div className="text-center py-8 md:py-12">
                    <div className="text-6xl md:text-8xl mb-4">{selected.emoji}</div>
                    <p className="text-gray-500 text-lg md:text-xl">
                      Start a conversation with {selected.name}
                    </p>
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      msg.from === 'You' 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                        : 'bg-white text-gray-800 border'
                    }`}>
                      <p className="text-sm md:text-base break-words">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-60">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 md:p-6 bg-white border-t">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-2xl hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Magic;
