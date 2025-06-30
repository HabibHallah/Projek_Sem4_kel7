import React, { useState } from "react";
import katalog from "../data/katalog.json";
import { motion } from "framer-motion";

const Katalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredKatalog = katalog.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-2xl font-bold text-pink-600 mb-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Katalog Produk
      </motion.h1>

      {/* 🔍 Search Bar */}
      <motion.div
        className="mb-6 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari katalog..."
          className="w-full max-w-2xl border border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </motion.div>

      {filteredKatalog.length === 0 ? (
        <p className="text-center text-gray-500">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredKatalog.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative group overflow-hidden rounded-xl shadow hover:shadow-lg bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-full h-64 overflow-hidden">
                <motion.img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-full object-cover transition duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm py-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg px-4 text-center drop-shadow-lg">
                  {item.nama}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Katalog;
