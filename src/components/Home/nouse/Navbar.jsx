import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [card, setCard] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/songs')
      .then((res) => res.json())
      .then((data) => setCard(data.slice(0, 4)))
      .catch((err) => console.log('Fetching Navbar images error:', err));
  }, []);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <div className="sm:hidden fixed bottom-4 left-4 z-50">
        <button onClick={toggleDrawer} className="text-white p-2 bg-[#1b1b1b] rounded-md">
          {/* Icon SVG */}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleDrawer} />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full min-w-[60px] bg-black p-2 z-50 transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0 sm:w-16 md:w-24`}
      >
        <div className="flex flex-col justify-between h-full py-2 rounded-xl bg-[#1b1b1b] border border-white">
          <div className="flex flex-col items-start gap-4 p-2">
            {/* Nav Items */}
            <NavLink to="/" className="flex items-center gap-2 text-white" activeClassName="font-bold">
              <div>{/* Home Icon */}</div>
              <span className="hidden md:inline">Home</span>
            </NavLink>
            <NavLink to="/search" className="flex items-center gap-2 text-white" activeClassName="font-bold">
              <div>{/* Search Icon */}</div>
              <span className="hidden md:inline">Search</span>
            </NavLink>
            <NavLink to="/library" className="flex items-center gap-2 text-white" activeClassName="font-bold">
              <div>{/* Library Icon */}</div>
              <span className="hidden md:inline">Library</span>
            </NavLink>

            <div className="font-semibold text-white">Quick Play</div>
            {card.map((post) => (
              <div key={post.id} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl overflow-hidden">
                  <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs text-white truncate w-20">{post.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;