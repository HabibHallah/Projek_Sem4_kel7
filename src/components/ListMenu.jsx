import { NavLink } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { FaFileAlt, FaBox } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

export default function ListMenu() {
  const menuClass = ({ isActive }) =>
    `flex items-center space-x-4 px-4 py-2 rounded-xl transition-colors duration-200 ${
      isActive
        ? "bg-white text-pink-600 font-semibold"
        : "text-gray-700 hover:bg-white/10 hover:text-pink-600"
    }`;

  return (
    <nav className="space-y-6">
      <NavLink to="/Dashboard" className={menuClass}>
        <RiDashboardFill className="text-xl" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/Product" className={menuClass}>
        <FaBox className="text-xl" />
        <span>Manajemen Produk</span>
      </NavLink>
      <NavLink to="/Users" className={menuClass}>
        <FaBox className="text-xl" />
        <span>Pengguna</span>
      </NavLink>
      <NavLink to="/Orders" className={menuClass}>
        <MdSubscriptions className="text-xl" />
        <span>Manajemen Pesanan</span>
      </NavLink>
      <NavLink to="/TestimoniMan" className={menuClass}>
        <FaFileAlt className="text-xl" />
        <span>Manajemen Testimoni</span>
      </NavLink>
      <NavLink to="/Artikel" className={menuClass}>
        <FaFileAlt className="text-xl" />
        <span>Manajemen Artikel</span>
      </NavLink>
      <NavLink to="/faq-admin" className={menuClass}>
        <AiFillHeart className="text-xl" />
        <span>Manajemen FAQ</span>
      </NavLink>
    </nav>
  );
}
