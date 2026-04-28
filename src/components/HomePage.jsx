import { useState, useEffect } from 'react';
import { Loader2, Music2 } from 'lucide-react';
import Albums from './Albums';
import QuickPlay from './QickPlay';
import ListenAgain from './ListenAgain';
import Featured from './Featured';
import Artist from './Artist';

// Skeleton Components
const HeroSkeleton = () => (
  <div className="px-4 md:px-0 mb-6">
    <div className="w-full h-48 md:h-64 lg:h-80 rounded-2xl bg-gray-800 animate-pulse" />
  </div>
);

const SectionHeaderSkeleton = () => (
  <div className="flex items-center gap-3 mb-4 px-4 md:px-0">
    <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />
    <div className="h-6 w-40 bg-gray-800 rounded animate-pulse" />
    <div className="h-4 w-16 bg-gray-800 rounded animate-pulse ml-auto" />
  </div>
);

const SongRowSkeleton = () => (
  <div className="px-4 md:px-0 mb-6">
    <SectionHeaderSkeleton />
    <div className="flex gap-3 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-32 md:w-40">
          <div className="w-full aspect-square bg-gray-800 rounded-xl animate-pulse mb-2" />
          <div className="h-4 w-24 bg-gray-800 rounded animate-pulse mb-1" />
          <div className="h-3 w-16 bg-gray-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

const QuickPickSkeleton = () => (
  <div className="px-4 md:px-0 mb-6">
    <SectionHeaderSkeleton />
    <div className="flex gap-3 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-64 md:w-72">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-800/50 animate-pulse">
            <div className="w-12 h-12 bg-gray-800 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ArtistSkeleton = () => (
  <div className="px-4 md:px-0 mb-6">
    <SectionHeaderSkeleton />
    <div className="flex gap-3 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-24 md:w-32 text-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 rounded-full animate-pulse mx-auto mb-2" />
          <div className="h-4 w-20 bg-gray-800 rounded animate-pulse mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

const FullPageSkeleton = () => (
  <div className="pt-4 md:pt-5 pb-16 md:pb-24 space-y-8">
    <HeroSkeleton />
    <QuickPickSkeleton />
    <SongRowSkeleton />
    <SongRowSkeleton />
    <ArtistSkeleton />
  </div>
);

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for actual data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust based on your actual load time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullPageSkeleton />;
  }

  return (
    <div className='pt-4 md:pt-5 pb-16 md:pb-24'>
      <Albums />
      <QuickPlay />
      <ListenAgain />
      <Featured />
      <Artist />
    </div>
  );
};

export default HomePage;