import { useEffect, useState } from "react";

export default function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/data/orders.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to load order data:", err));
  }, []);

  const statusClass = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Orders</h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7F55B1] text-white px-4 py-2 rounded-md hover:bg-[#7F55B1]-700 transition"
        >
          + Add customer
        </button>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Order ID</th>
              <th className="px-3 py-2 text-left">Customer Name</th>
              <th className="px-3 py-2 text-left">Order Date</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedOrders.map((order, index) => (
              <tr key={order["Order ID"]} className="hover:bg-gray-50 border-t">
                <td className="px-3 py-2">{startIndex + index + 1}</td>
                <td className="px-3 py-2 font-medium">{order["Order ID"]}</td>
                <td className="px-3 py-2">{order["Customer Name"]}</td>
                <td className="px-3 py-2 text-gray-500">{order["Order Date"]}</td>
                <td className="px-3 py-2">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      statusClass[order["Status"]] || ""
                    }`}
                  >
                    {order["Status"]}
                  </span>
                </td>
                <td className="px-3 py-2">{formatCurrency(order["Total Price"])}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
          <span>
            {orders.length === 0
              ? "0"
              : `${startIndex + 1}–${Math.min(startIndex + itemsPerPage, orders.length)} of ${
                  orders.length
                }`}
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

      {/* Modal Add Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-10 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Customer</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer ID</label>
                <input type="text" className="w-full border rounded-md px-3 py-2" placeholder="Enter Customer ID" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name</label>
                <input type="text" className="w-full border rounded-md px-3 py-2" placeholder="Enter Customer Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full border rounded-md px-3 py-2" placeholder="Enter Email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="tel" className="w-full border rounded-md px-3 py-2" placeholder="Enter Phone Number" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Loyalty</label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-[#7F55B1] text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
