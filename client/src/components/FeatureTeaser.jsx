import React from 'react';
import { Check, MessageCircle, Users, Globe, Bot, Sparkles } from 'lucide-react';

const FeatureTeaser = () => {
  const features = [
    { icon: MessageCircle, text: 'Normal Chat & Group Chat', color: 'text-blue-600' },
    { icon: Users, text: 'Media Sharing', color: 'text-green-600' },
    { icon: Bot, text: 'AI Chat Personalities: Mother, Friend, Teacher, Girlfriend, Boyfriend', color: 'text-purple-600' },
    { icon: Sparkles, text: 'Long Chat Summary', color: 'text-pink-600' },
    { icon: Globe, text: 'Translate Any Language', color: 'text-indigo-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto text-center px-4">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        Why Choose PersonaChat AI?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-effect p-4 md:p-6 rounded-2xl hover-lift cursor-pointer group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-3">
              <div className={`${feature.color} bg-white rounded-full p-2 shadow-sm group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {feature.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
        <p className="text-gray-600 text-sm md:text-base">
          Experience the future of AI-powered conversations with personalities that understand and respond naturally to your needs.
        </p>
      </div>
    </div>
  );
};

export default FeatureTeaser;
