import { Music2, Sparkles } from 'lucide-react';

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

// ==================== SECTIONS ====================

export const SectionHeaderSkeleton = () => (
  <div className="flex items-center gap-3 mb-4 animate-pulse">
    <div className="w-8 h-8 bg-gray-800 rounded-full" />
    <div className="h-8 bg-gray-800 rounded w-48" />
    <div className="h-4 bg-gray-800 rounded w-16 ml-auto" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="mb-2 w-full min-h-[20rem] rounded-2xl bg-gray-800 animate-pulse flex items-center justify-center">
    <Music2 className="w-12 h-12 text-gray-700" />
  </div>
);

export const MoodCardSkeleton = () => (
  <div className="w-full max-w-sm mx-auto md:mx-0 rounded-2xl bg-gray-800 animate-pulse h-80" />
);

export const QuickPickSkeleton = () => (
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

export const ArtistSkeleton = () => (
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

export const NewReleaseSkeleton = () => {
  <div className="py-6 px-4 md:px-0">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center animate-pulse">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
    </div>
    <div className="flex gap-4 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-32 h-40 bg-gray-800 rounded-xl animate-pulse flex-shrink-0" />
      ))}
    </div>
  </div>
}



// ==================== CAROUSEL / GRID ====================

// For horizontal scrolling sections (ListenAgain, Featured, etc.)
export const CarouselSkeleton = ({ count = 5 }) => (
  <div className="flex gap-4 md:gap-5 overflow-hidden pb-4">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="w-36 flex-shrink-0 space-y-3 animate-pulse">
        <div className="w-full aspect-square bg-gray-800 rounded-xl" />
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-3 bg-gray-800 rounded w-2/3" />
      </div>
    ))}
  </div>
);

// For album/artist detail pages
export const AlbumDetailSkeleton = () => (
  <div className="p-4 md:p-6 space-y-8 animate-pulse">
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="w-48 h-48 bg-gray-800 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-4 pt-4">
        <div className="h-4 bg-gray-800 rounded w-20" />
        <div className="h-10 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-full max-w-md" />
        <div className="flex gap-3 pt-2">
          <div className="h-10 bg-gray-800 rounded-full w-32" />
          <div className="h-10 bg-gray-800 rounded-full w-10" />
        </div>
      </div>
    </div>
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <SongRowSkeleton key={i} />
      ))}
    </div>
  </div>
);

// Full page loader for initial app load
export const FullPageSkeleton = () => (
  <div className="pt-4 md:pt-5 pb-16 md:pb-24 space-y-8 animate-pulse">
    <HeroSkeleton />
    <div>
      <SectionHeaderSkeleton />
      <CarouselSkeleton count={4} />
      <QuickPickSkeleton count={4} />
      <CarouselSkeleton count={4} />
      <ArtistSkeleton count={4} />
    </div>
    <div>
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {[...Array(5)].map((_, i) => (
          <SongCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);