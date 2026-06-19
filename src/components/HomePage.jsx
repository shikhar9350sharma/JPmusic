import { useState, useEffect } from 'react';
import { Loader2, Music2 } from 'lucide-react';
import Albums from './Albums';
import QuickPlay from './QickPlay';
import ListenAgain from './ListenAgain';
import Featured from './Featured';
import Artist from './Artist';

const HomePage = () => {

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