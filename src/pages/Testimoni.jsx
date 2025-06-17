import React from "react";
import testimonials from "../assets/testimoni.json";
import { AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";

// Variasi typing animation pada heading
const typingText = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04 },
  }),
};

export default function Testimoni() {
  const kata = "Apa kata mereka tentang Beautiva ✨".split("");

  return (
    <section
      className="relative bg-gradient-to-br from-pink-50 via-pink-100 to-white overflow-hidden py-16 px-6"
      style={{
        backgroundAttachment: "fixed",
        backgroundImage:
          "linear-gradient(to bottom right, #ffe4e6, #fff1f2, #ffffff)",
      }}
    >
      {/* Animated decorative blobs (bergerak) */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-0 left-0 w-64 h-64 bg-pink-200 opacity-40 rounded-full filter blur-3xl"
      ></motion.div>

      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 opacity-30 rounded-full filter blur-2xl"
      ></motion.div>

      {/* Judul animasi */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto text-center mb-6"
      >
        <h2 className="text-3xl font-bold text-green-600 mb-2">Testimoni 💬</h2>
        <p className="text-lg text-gray-600 flex justify-center flex-wrap">
          {kata.map((char, i) => (
            <motion.span key={i} custom={i} variants={typingText}>
              {char}
            </motion.span>
          ))}
        </p>
      </motion.div>

      {/* Ringkasan Rating */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-sm text-gray-500 mb-8"
      >
        ⭐ 4.9 dari 5 — Berdasarkan lebih dari 100+ review pelanggan puas
      </motion.div>

      {/* Card Testimoni */}
      <div className="relative max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map(
          ({ id, name, avatar, review, rating, product, platform, video }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
              }}
              className="bg-white rounded-2xl p-6 shadow-md transition-transform relative flex flex-col items-center text-center"
            >
              {/* Avatar atau Video */}
              {video ? (
                <video
                  src={video}
                  controls
                  className="w-full rounded-xl mb-4 object-cover max-h-52"
                />
              ) : (
                <img
                  src={avatar}
                  alt={name}
                  className="w-20 h-20 rounded-full mb-4 ring-4 ring-pink-100 object-cover"
                />
              )}

              {/* Bintang */}
              <div className="flex items-center space-x-1 mb-2">
                {Array(rating || 5)
                  .fill()
                  .map((_, i) => (
                    <AiFillStar key={i} className="text-yellow-400" />
                  ))}
              </div>

              {/* Nama */}
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

              {/* Badge */}
              <div className="flex flex-col items-center gap-1 text-xs text-gray-500 mt-1 mb-2">
                <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                  ✅ Pelanggan Terverifikasi
                </span>
                {product && (
                  <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
                    🧴 Produk: {product}
                  </span>
                )}
                {platform && (
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">
                    🛍️ Pembelian melalui {platform}
                  </span>
                )}
              </div>

              {/* Review */}
              <p className="mt-2 text-gray-600 text-sm leading-relaxed relative px-4">
                <span className="absolute -top-2 -left-2 text-pink-300 text-2xl">
                  “
                </span>
                {review} <span className="text-pink-400">💖</span>
                <span className="absolute -bottom-2 -right-2 text-pink-300 text-2xl">
                  ”
                </span>
              </p>
            </motion.div>
          )
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <a
          href="/form-testimoni"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow transition"
        >
          ✍️ Tulis Testimoni Kamu
        </a>
      </div>
    </section>
  );
}
