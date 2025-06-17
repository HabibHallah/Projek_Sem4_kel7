import React, { useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import GaleriCosmetic from "../components/GaleriCosmetic";

// Mask scroll
function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, #000, #000 0%, #000 80%, #0000)`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(maskImage, `linear-gradient(90deg, #000, #000 0%, #000 80%, #0000)`);
    } else if (value === 1) {
      animate(maskImage, `linear-gradient(90deg, #0000, #000 20%, #000 100%, #000)`);
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(maskImage, `linear-gradient(90deg, #0000, #000 20%, #000 80%, #0000)`);
    }
  });

  return maskImage;
}

// Galeri component
function GaleriMotion() {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

  return (
    <motion.section
      className="max-w-6xl mx-auto my-16 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-[#D10373] mb-8 text-center">Galeri Kami</h2>

      <div ref={ref} className="overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
        <motion.ul style={{ maskImage }} className="flex flex-nowrap space-x-4 w-max">
          {images.map((img, i) => (
            <motion.li
              key={i}
              className="min-w-[250px] h-[200px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={`/images/galeri/${img}`}
                alt={`Galeri ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}

// About page
export default function About() {
  return (
    <div className="min-h-screen font-sans text-gray-800 p-8">
      {/* Header */}
      <motion.header
        className="text-center py-16 relative"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-extrabold text-[#D10373] mb-4">
          Tentang <span className="text-[#CC21CC]">Beautiva</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Mewujudkan kecantikan alami melalui produk kosmetik premium, aman, dan&nbsp;berkepedulian.
        </p>
        <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
          <svg className="w-64 h-24 opacity-20" viewBox="0 0 200 20">
            <path fill="#FCE4EC" d="M0,20 C50,0 150,40 200,20 L200,0 L0,0 Z" />
          </svg>
        </div>
      </motion.header>

      {/* Cerita Kami */}
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#D10373] mb-4">Cerita Kami</h2>
        <p className="text-gray-700 leading-relaxed">
          Beautiva lahir dari semangat untuk menonjolkan kecantikan alami—dengan bahan yang aman, ramah lingkungan,
          dan dikemas elegan. Setiap produk kami dirancang agar mendukung kepercayaan diri tanpa mengabaikan
          kesehatan kulit.
        </p>
      </motion.section>

      {/* Tim Profesional */}
      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#D10373] mb-8 text-center">Tim Profesional Kami</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Nadia", role: "Designer", image: "https://avatar.iran.liara.run/public/51" },
            { name: "Habib", role: "Product Manager", image: "https://avatar.iran.liara.run/public/50" },
            { name: "Jefry", role: "Designer & Programmer", image: "https://avatar.iran.liara.run/public/39" },
          ].map((m, index) => (
            <motion.div
              key={m.name}
              className="bg-white rounded-2xl shadow-lg hover:shadow-pink-200 transition p-6 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-2 right-2 opacity-10">
                <svg className="w-12 h-12 text-[#D10373]">
                  <circle cx="6" cy="6" r="6" fill="currentColor" />
                </svg>
              </div>
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

      {/* Misi & Nilai */}
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#D10373] mb-4 text-center">Misi & Nilai Kami</h2>
        <div className="space-y-4">
          {[
            { title: "Alami & Vegan", desc: "Menggunakan bahan-bahan alami dan formula vegan-friendly." },
            { title: "Ramah Lingkungan", desc: "Kemasan ramah lingkungan dan proses yang berkelanjutan." },
            { title: "Untuk Semua", desc: "Diformulasikan agar aman dan cocok untuk semua jenis kulit." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-[#D10373] text-2xl mt-1">✔️</div>
              <div>
                <h4 className="font-semibold">{v.title}</h4>
                <p className="text-gray-700">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.footer
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => window.location.href = "/contact"}
          className="bg-[#D10373] text-white px-8 py-3 rounded-full text-lg shadow hover:bg-[#CC21CC] transition"
        >
          Hubungi Kami
        </button>
      </motion.footer>
    </div>
  );
}
