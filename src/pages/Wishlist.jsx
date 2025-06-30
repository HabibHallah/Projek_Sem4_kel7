import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    setWishlist(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Produk Favorit Anda</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Belum ada produk yang disukai.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img src={item.gambar} alt={item.nama} className="w-32 h-32 object-cover rounded mb-2" />
              <div className="font-semibold text-lg text-center">{item.nama}</div>
              <div className="text-pink-600 font-bold mb-1">Rp {parseInt(item.harga).toLocaleString("id-ID")}</div>
              <div className="text-gray-500 text-sm mb-2">Stok: {item.stok}</div>
              <div className="text-gray-700 text-xs">{item.deskripsi}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}