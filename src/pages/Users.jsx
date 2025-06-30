import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userAPI } from "../assets/services/userAPI";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    // Tidak perlu offset karena filter dilakukan di client-side
    userAPI
      .fetchUsers(0, 1000) // ambil banyak user sekaligus
      .then(({ data }) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  // Filter users berdasarkan nama / email / role
  const filteredUsers = users.filter(
    (u) =>
      u.nama.toLowerCase().includes(searchQuery) ||
      u.email.toLowerCase().includes(searchQuery) ||
      u.role.toLowerCase().includes(searchQuery)
  );

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <div className="overflow-auto rounded-xl border shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedUsers.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50 border-t">
                <td className="px-3 py-2">{startIndex + index + 1}</td>
                <td className="px-3 py-2">{user.nama}</td>
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
          <span>
            {totalUsers === 0
              ? "0"
              : `${startIndex + 1}–${Math.min(
                  startIndex + itemsPerPage,
                  totalUsers
                )} of ${totalUsers}`}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              ‹
            </button>
            <span>{currentPage}</span>
            <span>/</span>
            <span>{totalPages}</span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
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
