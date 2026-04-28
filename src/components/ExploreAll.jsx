import { useState } from 'react';
import {
  Heart,
  CloudRain,
  PartyPopper,
  Compass,
  Moon,
  Flame,
  Music2,
  ChevronRight
} from 'lucide-react';
import LoveTheme from './LoveTheme';
import Sad from './Sad';
import Party from './Party';
import Adventure from './Adventure';
import Sleepy from './Sleepy';

const moodCategories = [
  { id: 'love', label: 'Love', icon: Heart, color: 'from-pink-500 to-rose-600', component: LoveTheme },
  { id: 'sad', label: 'Sad', icon: CloudRain, color: 'from-blue-500 to-indigo-600', component: Sad },
  { id: 'party', label: 'Party', icon: PartyPopper, color: 'from-purple-500 to-violet-600', component: Party },
  { id: 'adventure', label: 'Adventure', icon: Compass, color: 'from-orange-500 to-red-600', component: Adventure },
  { id: 'sleepy', label: 'Sleepy', icon: Moon, color: 'from-teal-500 to-cyan-600', component: Sleepy },
];

const ExploreAll = () => {
  const [activeMood, setActiveMood] = useState('love');

  const ActiveComponent = moodCategories.find(m => m.id === activeMood)?.component;

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-4 md:px-0 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Explore</h1>
            <p className="text-sm text-gray-400">Discover music by mood</p>
          </div>
        </div>
      </div>

      {/* Mood Selector - Horizontal Scroll */}
      <div className="px-4 md:px-0 mb-8">
        <div className="flex items-center gap-3 overflow-x-auto scroll-hidden pb-2">
          {moodCategories.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood.id)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all duration-300
                ${activeMood === mood.id
                  ? `bg-gradient-to-r ${mood.color} text-white shadow-lg scale-105`
                  : 'bg-[#2b2b2b] text-gray-400 hover:text-white hover:bg-[#3b3b3b]'
                }
              `}
            >
              <mood.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{mood.label}</span>
              {activeMood === mood.id && (
                <ChevronRight className="w-4 h-4 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Mood Content */}
      <div className="px-4 md:px-0">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default ExploreAll;