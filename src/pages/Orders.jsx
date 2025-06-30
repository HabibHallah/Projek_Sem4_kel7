import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { orderAPI } from "../assets/services/orderAPI";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.fetchOrders(0, 1000); // ambil semua dulu, nanti filter di client
      setOrders(data);
    } catch (err) {
      console.error("Gagal memuat data orders:", err);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(
    (o) =>
      o.id.toString().includes(searchQuery) ||
      o.user_id.toString().includes(searchQuery) ||
      o.produk_id.toString().includes(searchQuery) ||
      o.jumlah.toString().includes(searchQuery)
  );

  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Daftar Pesanan</h1>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">ID Order</th>
              <th className="px-3 py-2 text-left">User ID</th>
              <th className="px-3 py-2 text-left">Produk ID</th>
              <th className="px-3 py-2 text-left">Jumlah</th>
              <th className="px-3 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedOrders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 border-t">
                <td className="px-3 py-2">
                  {startIndex + index + 1}
                </td>
                <td className="px-3 py-2 font-medium">{order.id}</td>
                <td className="px-3 py-2">{order.user_id}</td>
                <td className="px-3 py-2">{order.produk_id}</td>
                <td className="px-3 py-2">{order.jumlah}</td>
                <td className="px-3 py-2">Rp {Number(order.total).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
          <span>
            {totalOrders === 0
              ? "0"
              : `${startIndex + 1}–${Math.min(
                  startIndex + itemsPerPage,
                  totalOrders
                )} dari ${totalOrders}`}
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
