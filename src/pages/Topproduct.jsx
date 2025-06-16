import React from 'react';
import topProducts from '../assets/DataTP.json';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';

const TopProductGrid = () => {
  return (
    <div className="p-6 min-h-screen">
      {/* Title dan Keterangan jumlah produk */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-pink-500">Produk</h2>
        <span className="bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow">
          {topProducts.length} Produk
        </span>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {topProducts.map(product => (
          <div
            key={product.id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 p-4 flex flex-col"
          >
            {/* Badge “Promo” */}
            <div className="absolute top-3 left-3 bg-pink-200 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full z-10">
              Promo
            </div>

            {/* Gambar */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Info Produk */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-pink-600 font-bold text-base mb-4">
              Rp {product.price.toLocaleString('id-ID')}
            </p>

            {/* Tombol Aksi */}
            <div className="mt-auto flex items-center justify-between">
              <button className="flex items-center gap-2 bg-pink-300 text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-pink-400 transition">
                <FaShoppingCart />
                Add to Bag
              </button>
              <button className="text-pink-500 hover:text-pink-700">
                <AiOutlineHeart size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductGrid;
