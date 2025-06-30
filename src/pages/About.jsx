import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function About() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("/data/ourTeam.json")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Failed to load team:", err));
  }, []);

  return (
    <div
      className="min-h-screen p-1 text-gray-800"
      style={{ fontFamily: "Barlow, sans-serif" }}
    >
      {/* Header */}
      <motion.header
        className="text-center py-16 relative"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Tentang <span className="text-[#CC21CC]">Beautiva</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Mewujudkan kecantikan alami melalui produk kosmetik premium, aman, dan berkepedulian.
        </p>
      </motion.header>

      <motion.section
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#D10373] mb-4">Sejarah</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Beautiva berdiri sejak tahun 2015 dengan komitmen menghadirkan produk kosmetik yang aman dan ramah lingkungan.
            Berawal dari industri rumahan, kini Beautiva telah menjangkau ribuan pelanggan di seluruh Indonesia.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#D10373] mb-4">Visi & Misi</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
            <li><strong>Visi:</strong> Menjadi brand kosmetik lokal nomor satu yang dipercaya masyarakat luas.</li>
            <li><strong>Misi:</strong> Menyediakan produk berkualitas tinggi, aman, dan sesuai dengan kebutuhan wanita Indonesia.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#D10373] mb-4">Informasi Perusahaan</h2>
          <p className="text-gray-700 text-sm">
            <strong>Nama:</strong> PT. Beautiva Kosmetik Indonesia<br />
            <strong>Alamat:</strong> Jl. Anggrek No. 88, Jakarta Selatan<br />
            <strong>Telepon:</strong> (021) 123-4567<br />
            <strong>Email:</strong> info@beautiva.co.id
          </p>
        </div>
      </motion.section>

      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#D10373] mb-8 text-center">
          Tim Profesional Kami
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((m, index) => (
            <motion.div
              key={m.name}
              className="bg-white rounded-2xl shadow-lg hover:shadow-pink-200 transition p-6 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={m.image}
                alt={m.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{m.name}</h3>
              <p className="text-[#D10373] mt-2">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
