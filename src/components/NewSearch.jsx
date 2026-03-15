import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// Note: Make sure 'toast' is imported in your actual file since you use it in handleLogout!
// import { toast } from 'react-hot-toast'; 

const NewSearch = () => {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 1. New state for the dropdown
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/app/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://music-api-gamma.vercel.app/logout', { method: 'POST', credentials: 'include' });
      if (response.ok) {
        toast.success('Logout successfully!');
        navigate('/');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-full px-2 sm:px-4 md:px-8">
        <div className=" flex items-center justify-between gap-0 sm:gap-2">

          {/* Search Input */}
          <div className=" flex items-center gap-3 bg-[#3b3b3b] border-transparent rounded-full px-4 py-2 hover:border-gray-200 transition-all duration-100 w-full sm:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M17 17L21 21" />
              <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" />
            </svg>

            <input
              type="search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search by artists, songs, or albums"
              className="w-full sm:min-w-[120px] md:min-w-[300px] lg:min-w-[400px] bg-transparent outline-none text-white text-sm placeholder-gray-300"
            />
          </div>

          {/* Profile Icon & Dropdown Wrapper */}
          <div className="relative">

            {/* Profile Icon */}
            <div
              className=" text-center border-2 border-black p-2 rounded-full bg-[#3b3b3b] cursor-pointer hover:bg-[#4b4b4b] transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // 3. Toggle state on click
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" />
                <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" />
              </svg>
            </div>

            {/* 4. The Dropdown Box */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-5 w-40 bg-[#2b2b2b] border border-gray-600 rounded-lg shadow-xl overflow-hidden z-50">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false); // Close dropdown
                    handleLogout();           // Trigger your logout function
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-white hover:bg-red-600 transition-colors font-medium"
                >
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