import { AiOutlineHeart } from "react-icons/ai"; 
import React, { useState, useEffect } from "react";
import { BiUserCircle, BiHome, BiCart, BiLogOut } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineReorder } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { orderAPI } from "../assets/services/orderAPI";
import { productAPI } from "../assets/services/productAPI";

export default function ListMenu() {
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    setUserLoggedIn(sessionStorage.getItem("userLoggedIn") === "true");
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const syncCart = (event) => {
      if (event.key === "cartItems") {
        const newCart = event.newValue ? JSON.parse(event.newValue) : [];
        setCartItems(newCart);
      }
    };
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const toggleCartModal = () => setShowCartModal(!showCartModal);
  const handleRemoveItem = (id) => setCartItems(cartItems.filter((item) => item.id !== id));
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item
      )
    );
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserLoggedIn(false);
    navigate("/login");
  };

  const handleCheckout = async () => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      Swal.fire("Oops", "Kamu harus login untuk checkout.", "warning");
      return;
    }
    try {
      for (const item of cartItems) {
        const qty = item.qty || 1;
        const total = item.harga * qty;
        await orderAPI.createOrder({
          user_id: parseInt(user_id),
          produk_id: item.id,
          jumlah: qty,
          total,
        });
        await productAPI.updateStock(item.id, -qty);
      }
      setCartItems([]);
      sessionStorage.removeItem("cartItems");
      Swal.fire("Berhasil", "Checkout berhasil! Pesanan kamu telah dicatat.", "success");
      setShowCartModal(false);
    } catch (error) {
      console.error("Checkout gagal:", error);
      Swal.fire("Error", "Checkout gagal. Coba lagi nanti.", "error");
    }
  };

  const totalHarga = cartItems.reduce((total, item) => total + item.harga * (item.qty || 1), 0);

  const menuClass = ({ isActive }) =>
    `flex items-center rounded-full px-3 py-1 text-sm transition-all duration-200 space-x-2 font-medium font-serif ${
      isActive ? "text-[#D10373] bg-pink-100 shadow-inner" : "text-gray-600 hover:text-[#D10373] hover:bg-pink-50"
    }`;

  const dropdownItemClass = "block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 font-serif";

  return (
    <div id="sidebar-menu" className="w-full bg-white shadow z-50 relative">
      <div className="max-w-full mx-auto flex flex-wrap items-center justify-between py-4 px-6">
        <div className="text-2xl font-beauty text-[#D10373] tracking-wide mb-2 md:mb-0">
          Beautiva<span className="text-[#CC21CC]">.</span>
        </div>

        <ul className="flex flex-wrap gap-2 items-center font-serif justify-end w-full md:w-auto">
          <li className="group relative">
            <button className="flex items-center px-4 py-2 text-sm rounded-full bg-gradient-to-r from-[#D10373] to-[#CC21CC] text-white font-semibold shadow-md hover:shadow-lg transition">
              Home <span className="ml-1 text-xs">▼</span>
            </button>
            <div className="absolute top-full left-0 w-40 bg-white rounded-xl shadow-lg hidden group-hover:block z-50 pt-2 -mt-1">
              <NavLink to="/" className={dropdownItemClass}>Dashboard</NavLink>
              <NavLink to="/about" className={dropdownItemClass}>About Us</NavLink>
              <NavLink to="/Topproduct" className={dropdownItemClass}>List Produk</NavLink>
              <NavLink to="/artikel-home" className={dropdownItemClass}>Article</NavLink>
              <NavLink to="/faq" className={dropdownItemClass}>FAQ & Contact</NavLink>
              <NavLink to="/katalog" className={dropdownItemClass}>Katalog Media</NavLink>
              <NavLink to="/Testimoni" className={dropdownItemClass}>Testimoni dan Customer Review</NavLink>
            </div>
          </li>

          <li><NavLink to="/" className={menuClass}><BiHome className="text-lg" /><span>Dashboard</span></NavLink></li>
          <li><NavLink to="/Topproduct" className={menuClass}><MdOutlineReorder className="text-lg" /><span>List Product</span></NavLink></li>
          <li><NavLink to="/katalog" className={menuClass}><MdOutlinePeopleAlt className="text-lg" /><span>Katalog Media</span></NavLink></li>

          {/* Ikon: Cart, Wishlist, Profile */}
          <li className="flex items-center gap-3 relative">
            {/* Cart */}
            <button
              onClick={toggleCartModal}
              title="Keranjang"
              className={`p-2 rounded-full hover:bg-pink-50 transition ${showCartModal ? "text-[#D10373]" : "text-gray-500"}`}
            >
              <BiCart size={28} />
            </button>

            {/* Wishlist */}
            <NavLink
              to="/wishlist"
              title="Produk Favorit"
              className={({ isActive }) =>
                `p-2 rounded-full hover:bg-pink-50 transition ${isActive ? "text-[#D10373]" : "text-gray-500"}`
              }
            >
              <AiOutlineHeart size={28} />
            </NavLink>

            {/* Profile */}
            {userLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  title="Profil"
                  className={`p-2 rounded-full hover:bg-pink-50 transition ${showUserMenu ? "text-[#D10373]" : "text-gray-500"}`}
                >
                  <BiUserCircle size={28} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 flex items-center gap-2"
                    >
                      <BiLogOut className="text-lg" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                title="Login"
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#D10373] to-[#CC21CC] text-white font-semibold shadow-md hover:shadow-lg transition ${isActive ? "ring-2 ring-[#D10373]" : ""}`
                }
              >
                <BiUserCircle size={24} />
                <span className="text-sm">Login</span>
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {/* Modal Keranjang */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg w-full max-w-md p-6 relative border border-pink-200">
            <h2 className="text-xl font-semibold mb-4 text-[#D10373]">Keranjang Belanja</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Keranjang kosong</p>
            ) : (
              <ul className="space-y-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b pb-2 text-gray-800">
                    <div>
                      <span className="font-medium">{item.nama}</span>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 bg-pink-300 rounded-full hover:bg-pink-400">-</button>
                        <span>{item.qty || 1}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 bg-pink-300 rounded-full hover:bg-pink-400">+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-pink-600 font-semibold">Rp {(item.harga * (item.qty || 1)).toLocaleString("id-ID")}</span>
                      <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-sm mt-1">Hapus</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Total Qty:</span>
                <span className="font-medium">{cartItems.reduce((total, item) => total + (item.qty || 1), 0)} item</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-pink-600 text-lg">Rp {totalHarga.toLocaleString("id-ID")}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button onClick={toggleCartModal} className="text-sm text-gray-600 hover:text-gray-800 transition">Tutup</button>
              <button onClick={handleCheckout} className="bg-[#D10373] text-white px-4 py-2 rounded-lg hover:bg-[#b3025f] transition">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
