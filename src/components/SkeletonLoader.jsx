import { Music2 } from 'lucide-react';

export const SongCardSkeleton = () => (
  <div className="flex flex-col gap-3 w-full animate-pulse">
    <div className="w-full aspect-square bg-gray-800 rounded-2xl" />
    <div className="space-y-2 px-1">
      <div className="h-4 bg-gray-800 rounded w-3/4" />
      <div className="h-3 bg-gray-800 rounded w-1/2" />
    </div>
  </div>
);

export const SongRowSkeleton = () => (
  <div className="flex items-center gap-3 p-3 animate-pulse">
    <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-800 rounded w-3/4" />
      <div className="h-3 bg-gray-800 rounded w-1/2" />
    </div>
  </div>
);

export const SectionHeaderSkeleton = () => (
  <div className="flex items-center gap-3 mb-4 animate-pulse">
    <div className="w-8 h-8 bg-gray-800 rounded-full" />
    <div className="h-8 bg-gray-800 rounded w-48" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="w-full min-h-[20rem] rounded-2xl bg-gray-800 animate-pulse flex items-center justify-center">
    <Music2 className="w-12 h-12 text-gray-700" />
  </div>
);

export const MoodCardSkeleton = () => (
  <div className="w-full max-w-sm mx-auto md:mx-0 rounded-2xl bg-gray-800 animate-pulse h-80" />
);