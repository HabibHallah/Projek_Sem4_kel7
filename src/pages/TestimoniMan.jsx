import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { testimoniAPI } from "../assets/services/testimoniAPI";
import axios from "axios";

const SUPABASE_URL = "https://hkkkmtwjeqkyeicsalgd.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhra2ttdHdqZXFreWVpY3NhbGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODM1NDAsImV4cCI6MjA2NTY1OTU0MH0.MwybvRmsgR7LoeXqPXFUYf5KI6bU-MvCw8KYbs5jkLE";

export default function TestimoniMan() {
  const [testimoniList, setTestimoniList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    loadTestimoni();
  }, []);

  const loadTestimoni = async () => {
    try {
      // ambil semua dulu, filter di client
      const { data } = await testimoniAPI.fetchTestimoni(0, 1000);
      setTestimoniList(data);
    } catch (error) {
      console.error("Gagal memuat data testimoni:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus testimoni ini?")) return;
    try {
      await axios.delete(`${SUPABASE_URL}/rest/v1/testimoni?id=eq.${id}`, {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      loadTestimoni();
    } catch (err) {
      console.error("Gagal menghapus testimoni:", err);
    }
  };

  // Filter hasil sesuai search
  const filteredList = testimoniList.filter(
    (item) =>
      item.id.toString().includes(searchQuery) ||
      (item.user_id && item.user_id.toString().includes(searchQuery)) ||
      (item.testimoni && item.testimoni.toLowerCase().includes(searchQuery))
  );

  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Testimoni</h1>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">User ID</th>
              <th className="px-3 py-2 text-left">Testimoni</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedList.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 border-t">
                <td className="px-3 py-2">{startIndex + index + 1}</td>
                <td className="px-3 py-2 font-medium">{item.id}</td>
                <td className="px-3 py-2">{item.user_id}</td>
                <td className="px-3 py-2">{item.testimoni}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
          <span>
            {totalItems === 0
              ? "0"
              : `${startIndex + 1}–${Math.min(
                  startIndex + itemsPerPage,
                  totalItems
                )} dari ${totalItems}`}
          </span>
          <div className="flex space-x-2 items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              ‹
            </button>
            <span>{currentPage}</span>
            <span>/</span>
            <span>{totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
