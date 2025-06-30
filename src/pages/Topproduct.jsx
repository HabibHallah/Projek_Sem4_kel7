// File: TopProductGrid.jsx
import React, { useEffect, useState } from 'react';
import { productAPI } from '../assets/services/productAPI';
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { motion } from 'framer-motion';

const TopProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  const fetchProducts = async () => {
    try {
      const data = await productAPI.fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleProdukUpdate = () => {
      fetchProducts();
    };

    window.addEventListener("produk-diupdate", handleProdukUpdate);
    return () => {
      window.removeEventListener("produk-diupdate", handleProdukUpdate);
    };
  }, []);

  const addToCart = (product) => {
    const isLoggedIn = sessionStorage.getItem("userLoggedIn");
    if (isLoggedIn !== "true") {
      alert("Silakan login terlebih dahulu untuk menggunakan fitur keranjang.");
      return;
    }

    const currentCart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const isExist = currentCart.find((item) => item.id === product.id);

    if (!isExist) {
      const newCart = [...currentCart, { ...product, qty: 1 }];
      sessionStorage.setItem('cartItems', JSON.stringify(newCart));
      alert('Produk ditambahkan ke keranjang!');
      window.location.reload();
    } else {
      alert('Produk sudah ada di keranjang.');
    }
  };

  const openDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedProduct(null);
  };

  const toggleWishlist = (product) => {
    let updated;
    if (wishlist.some(item => item.id === product.id)) {
      updated = wishlist.filter(item => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const isLoved = (id) => wishlist.some(item => item.id === id);

  return (
    <motion.div
      className="p-6 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-pink-500">Produk</h2>
        <span className="bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow">
          {loading ? "Memuat..." : `${products.length} Produk`}
        </span>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Sedang memuat produk...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 p-4 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="absolute top-3 left-3 bg-pink-200 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full z-10">
                Promo
              </div>

              <img
                src={product.gambar}
                alt={product.nama}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                {product.nama}
              </h3>
              <p className={`text-sm mb-1 ${product.stok < 5 ? 'text-red-500' : 'text-gray-500'}`}>
                Stok: {product.stok}
              </p>
              <p className="text-pink-600 font-bold text-base mb-4">
                Rp {parseInt(product.harga).toLocaleString('id-ID')}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-300 text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-pink-400 transition"
                  onClick={() => openDetail(product)}
                >
                  Detail Produk
                </motion.button>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => addToCart(product)}
                    whileTap={{ scale: 0.85 }}
                    className="text-pink-500 hover:text-pink-700"
                  >
                    <AiOutlineShoppingCart size={24} />
                  </motion.button>
                  <motion.button
                    onClick={() => toggleWishlist(product)}
                    whileTap={{ scale: 0.85 }}
                    className={isLoved(product.id) ? "text-pink-600" : "text-pink-500 hover:text-pink-700"}
                    title={isLoved(product.id) ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                  >
                    {isLoved(product.id) ? (
                      <AiFillHeart size={24} />
                    ) : (
                      <AiOutlineHeart size={24} />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showDetail && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={closeDetail}
              className="absolute top-2 right-2 text-gray-500 hover:text-pink-500 text-xl"
            >
              &times;
            </button>
            <img
              src={selectedProduct.gambar}
              alt={selectedProduct.nama}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{selectedProduct.nama}</h3>
            <p className="mb-2 text-gray-600">Stok: {selectedProduct.stok}</p>
            <p className="mb-2 text-pink-600 font-bold">
              Rp {parseInt(selectedProduct.harga).toLocaleString('id-ID')}
            </p>
            <p className="text-gray-700">{selectedProduct.deskripsi || "Tidak ada deskripsi."}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TopProductGrid;
