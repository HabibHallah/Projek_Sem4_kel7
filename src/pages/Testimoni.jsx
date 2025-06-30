import { useEffect, useState } from "react";
import { testimoniAPI } from "../assets/services/testimoniAPI";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function Testimoni() {
  const [testimoniList, setTestimoniList] = useState([]);
  const [newTestimoni, setNewTestimoni] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const fetchTestimoni = async () => {
    try {
      setLoading(true);
      const { data } = await testimoniAPI.fetchTestimoni(0, 100);
      setTestimoniList(data);
    } catch (error) {
      console.error("Gagal memuat testimoni:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      Swal.fire("Oops!", "Kamu harus login terlebih dahulu.", "warning");
      return;
    }

    if (!newTestimoni.trim()) {
      Swal.fire("Oops!", "Testimoni tidak boleh kosong.", "warning");
      return;
    }

    try {
      await testimoniAPI.createTestimoni({
        user_id: parseInt(userId),
        testimoni: newTestimoni,
      });
      Swal.fire("Berhasil!", "Testimoni kamu telah dikirim.", "success");
      setNewTestimoni("");
      fetchTestimoni();
    } catch (error) {
      console.error("Gagal mengirim testimoni:", error);
      Swal.fire("Error", "Gagal mengirim testimoni.", "error");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-2xl font-bold text-pink-600 mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Testimoni Pelanggan
      </motion.h1>

      {/* Form Testimoni */}
      <motion.form
        onSubmit={handleSubmit}
        className="mb-8 bg-pink-50 p-4 rounded-xl shadow"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <textarea
          value={newTestimoni}
          onChange={(e) => setNewTestimoni(e.target.value)}
          className="w-full h-24 p-3 border border-pink-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Tulis testimoni kamu di sini..."
        ></textarea>
        <div className="flex justify-end mt-3">
          <motion.button
            type="submit"
            className="bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tulis Testimoni Kamu
          </motion.button>
        </div>
      </motion.form>

      {/* List Testimoni */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat testimoni...</p>
      ) : testimoniList.length === 0 ? (
        <p className="text-center text-gray-400">Belum ada testimoni.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimoniList.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <p className="text-gray-700 italic">"{item.testimoni}"</p>
              <p className="text-sm text-right text-gray-500 mt-2">
                Oleh: {item.users?.nama || `User ID: ${item.user_id}`}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
