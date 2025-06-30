import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { productAPI } from "../assets/services/productAPI";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    stok: "",
    gambar: "",
    deskripsi: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editId, setEditId] = useState(null);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await productAPI.fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Gagal ambil data produk:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      const file = files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({ ...prev, gambar: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        alert("File harus berupa JPG atau PNG");
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, harga, stok, gambar, deskripsi } = form;
    if (!nama || !harga || !stok || !gambar || !deskripsi) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      if (editId) {
        await productAPI.updateProduct(editId, {
          nama,
          harga: parseFloat(harga),
          stok: parseInt(stok),
          gambar,
          deskripsi,
        });
        alert("Produk berhasil diupdate");
      } else {
        await productAPI.createProduct({
          nama,
          harga: parseFloat(harga),
          stok: parseInt(stok),
          gambar,
          deskripsi,
        });
        alert("Produk berhasil ditambahkan");
      }
      setForm({ nama: "", harga: "", stok: "", gambar: "", deskripsi: "" });
      setEditId(null);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Gagal simpan produk:", error);
      alert(`Terjadi kesalahan: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");
    if (confirmDelete) {
      try {
        await productAPI.deleteProduct(id);
        alert("Produk berhasil dihapus");
        fetchData();
      } catch (err) {
        alert("Gagal menghapus produk");
      }
    }
  };

  // 🔥 Filter produk sesuai search
  const filteredProducts = products.filter((p) =>
    p.nama.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Produk</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7F55B1] text-white px-4 py-2 rounded-md hover:bg-[#6e46a2] transition"
        >
          + Tambahkan Produk
        </button>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Gambar</th>
              <th className="px-3 py-2 text-left">Nama Produk</th>
              <th className="px-3 py-2 text-left">Harga</th>
              <th className="px-3 py-2 text-left">Stok</th>
              <th className="px-3 py-2 text-left">Aksi</th>
              <th className="px-3 py-2 text-left">Deskripsi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedProducts.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50 border-t">
                <td className="px-3 py-2">{startIndex + index + 1}</td>
                <td className="px-3 py-2">
                  {product.gambar ? (
                    <img
                      src={product.gambar}
                      alt={product.nama}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="px-3 py-2 font-medium">{product.nama}</td>
                <td className="px-3 py-2">
                  Rp{parseInt(product.harga).toLocaleString("id-ID")}
                </td>
                <td className="px-3 py-2">{product.stok}</td>
                <td className="px-3 py-2 space-x-2 text-lg">
                  <button
                    className="text-yellow-600 hover:text-yellow-800"
                    onClick={() => {
                      setForm({
                        nama: product.nama,
                        harga: product.harga,
                        stok: product.stok,
                        gambar: product.gambar,
                        deskripsi: product.deskripsi,
                      });
                      setEditId(product.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
                <td className="px-3 py-2">{product.deskripsi}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
          <span>
            {filteredProducts.length === 0
              ? "0"
              : `${startIndex + 1}–${Math.min(startIndex + itemsPerPage, filteredProducts.length)} dari ${filteredProducts.length}`}
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

      {/* Modal Form Tambah / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-10 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Produk</label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  name="harga"
                  value={form.harga}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stok</label>
                <input
                  type="number"
                  name="stok"
                  value={form.stok}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={form.deskripsi}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gambar</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  name="gambar"
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-700"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditId(null);
                    setForm({ nama: "", harga: "", stok: "", gambar: "", deskripsi: "" });
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#7F55B1] text-white"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
