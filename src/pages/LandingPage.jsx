import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [produkUnggulan, setProdukUnggulan] = useState([]);
  const [testimoni, setTestimoni] = useState([]);

  useEffect(() => {
    fetch("/data/produkUnggulan.json")
      .then((res) => res.json())
      .then((data) => setProdukUnggulan(data))
      .catch((err) => console.error("Gagal fetch produkUnggulan.json", err));

    fetch("/data/testimoni.json")
      .then((res) => res.json())
      .then((data) => setTestimoni(data))
      .catch((err) => console.error("Gagal fetch testimoni.json", err));
  }, []);

  return (
    <div className="font-serif min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-pink-100 to-pink-200 px-8 py-16 grid md:grid-cols-2 items-center rounded-3xl shadow-inner"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-6 leading-tight">
            Cantik Alami, Bersinar Setiap Hari
          </h1>
          <p className="mb-6 text-gray-700 text-lg">
            Temukan koleksi kosmetik terbaik untuk wajah berseri & kulit sehat. Dipercaya oleh 100+ pelanggan setia!
          </p>
          <div className="space-x-4">
            <Link to="/Topproduct">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-400 to-pink-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-pink-500 hover:to-pink-400 transition-all"
              >
                Mulai Belanja
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-pink-300 text-pink-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-pink-100 transition-all"
              >
                About Us
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center md:justify-end mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img
            src="https://i.pinimg.com/736x/32/de/19/32de1908e2adba92bdc92be1663c70d0.jpg"
            alt="Produk Kosmetik"
            className="w-1/3 md:w-1/2 rounded-full border-8 border-pink-200 shadow"
          />
        </motion.div>
      </motion.section>

      {/* Produk Unggulan */}
      <section className="px-8 pt-16 pb-12">
        <h2 className="text-2xl font-semibold text-center text-pink-700 mb-8">
          Produk Unggulan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {produkUnggulan.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-grow p-6">
                <div>
                  <h3 className="text-lg font-semibold text-pink-700 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-pink-300 to-pink-200 text-gray-800 font-medium px-5 py-2 rounded-full shadow hover:from-pink-400 hover:to-pink-400"
                >
                  Beli Sekarang
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <motion.section
        className="bg-pink-50 py-16 px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-center text-pink-700 mb-8">
          Apa Kata Pelanggan Kami?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
          {testimoni.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-center mb-4 space-x-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-pink-300"
                />
                <h4 className="text-pink-700 font-semibold">{item.name}</h4>
              </div>
              <p className="text-gray-600 italic">"{item.message}"</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
