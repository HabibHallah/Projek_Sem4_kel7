import { BiUserCircle, BiHome } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineReorder } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function ListMenu() {
  const menuClass = ({ isActive }) =>
    `flex items-center rounded-full px-4 py-2 transition-all duration-200 space-x-2 font-medium font-serif
     ${isActive ? "text-[#D10373] bg-pink-100 shadow-inner" : "text-gray-600 hover:text-[#D10373] hover:bg-pink-50"}`;

  const dropdownItemClass = "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 font-serif";

  return (
    <div id="sidebar-menu" className="w-full bg-white shadow">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-8 px-6">
        {/* Logo */}
        <div className="text-3xl font-beauty text-[#D10373] tracking-wide">
          Beautiva<span className="text-[#CC21CC]">.</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-6 items-center font-serif relative">
          {/* Dropdown HOME */}
          <li className="group relative">
            <button className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#D10373] to-[#CC21CC] text-white font-semibold shadow-md hover:shadow-lg transition">
              Home <span className="ml-1 text-sm">▼</span>
            </button>
            <div className="absolute top-full left-0 w-40 bg-white rounded-xl shadow-lg hidden group-hover:block z-50 pt-2 -mt-1">
              <NavLink to="/" className={dropdownItemClass}>Dashboard</NavLink>
              <NavLink to="/Topproduct" className={dropdownItemClass}>Produk</NavLink>
              <NavLink to="/about" className={dropdownItemClass}>Tentang Kami</NavLink>
              <NavLink to="/Testimoni" className={dropdownItemClass}>Testimoni</NavLink>
            </div>
          </li>

          {/* Other Menus */}
          <li>
            <NavLink to="/" className={menuClass}>
              <BiHome className="text-lg" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Topproduct" className={menuClass}>
              <MdOutlineReorder className="text-lg" />
              <span>Produk</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={menuClass}>
              <MdOutlinePeopleAlt className="text-lg" />
              <span>Tentang Kami</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Testimoni" className={menuClass}>
              <MdOutlinePeopleAlt className="text-lg" />
              <span>Testimoni</span>
            </NavLink>
          </li>

          {/* Search & Login */}
          <li className="flex items-center space-x-4 text-pink-300 text-xl">
            <button className="hover:text-[#D10373] transition">🔍</button>
            <NavLink
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D10373] to-[#CC21CC] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <BiUserCircle className="text-lg" />
              <span>Login</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
