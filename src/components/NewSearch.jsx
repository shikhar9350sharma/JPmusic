import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Search, User, LogOut, X, ChevronDown } from 'lucide-react';

const NewSearch = () => {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/app/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://music-api-gamma.vercel.app/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        toast.success('Logged out successfully!');
        setIsDropdownOpen(false);
        navigate('/');
      }
    } catch (err) {
      console.error('Error during logout:', err);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-full px-2 sm:px-4 md:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">

          {/* Search Input */}
          <div className="flex items-center gap-3 bg-[#3b3b3b] border border-transparent focus-within:border-gray-400 rounded-full px-4 py-2.5 hover:bg-[#444444] transition-all duration-200 w-full sm:w-auto group">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors flex-shrink-0" />

            <input
              type="search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search artists, songs, or albums..."
              className="w-full sm:min-w-[160px] md:min-w-[320px] lg:min-w-[420px] bg-transparent outline-none text-white text-sm placeholder-gray-400"
            />

            {/* Clear Button */}
            {query && (
              <button
                onClick={clearSearch}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Profile Icon & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 border-2 border-black p-2 rounded-full bg-[#3b3b3b] hover:bg-[#4b4b4b] transition-colors"
            >
              <User className="w-5 h-5 text-white" />
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-[#2b2b2b] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium text-white truncate">User</p>
                </div>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-white hover:bg-red-600/20 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSearch;