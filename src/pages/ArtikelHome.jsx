import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const ArtikelHome = () => {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtikel, setSelectedArtikel] = useState(null);

  useEffect(() => {
    fetchArtikel();
  }, []);

  const fetchArtikel = async () => {
    const { data, error } = await supabase
      .from('artikel')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setArtikel(data);
    setLoading(false);
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-pink-600 mb-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Artikel Kosmetik
      </motion.h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : artikel.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artikel.map((item, index) => (
            <motion.div
              key={item.id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedArtikel(item)}
            >
              {item.gambar && (
                <motion.img
                  src={item.gambar}
                  alt={item.judul}
                  className="h-48 w-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-pink-700">
                  {item.judul}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(item.tanggal).toLocaleDateString('id-ID')}
                </p>
                <p className="text-gray-700 line-clamp-3">{item.isi}</p>
                <p className="text-xs mt-3 text-gray-400">Oleh: {item.penulis}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedArtikel && (
          <motion.div
            className="fixed inset-0  bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {selectedArtikel.gambar && (
                <img
                  src={selectedArtikel.gambar}
                  alt={selectedArtikel.judul}
                  className="w-full h-64 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-pink-700 mb-2">
                {selectedArtikel.judul}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {new Date(selectedArtikel.tanggal).toLocaleDateString('id-ID')}
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Oleh: {selectedArtikel.penulis}
              </p>
              <p className="text-gray-800 whitespace-pre-line">
                {selectedArtikel.isi}
              </p>
              <button
                onClick={() => setSelectedArtikel(null)}
                className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default ArtikelHome;
