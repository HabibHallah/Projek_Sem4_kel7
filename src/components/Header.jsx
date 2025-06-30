import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { HiBell } from "react-icons/hi";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();

  // ambil query search dari URL
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  // tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold">Overview</h2>

      {/* Right Section */}
      <div className="flex items-center space-x-4 relative">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="rounded-full pl-10 pr-4 py-2 bg-white shadow text-sm focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Bell Icon */}
        <HiBell className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800 transition" />

        {/* Profile Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:shadow-lg transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl overflow-hidden z-50 animate-fade-in-up">
              <div className="px-5 py-4 border-b text-sm text-gray-800 font-medium bg-gray-50">
                👋 Hello, <span className="font-semibold">Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
