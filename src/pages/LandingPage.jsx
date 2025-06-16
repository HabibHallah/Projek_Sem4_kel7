import React from "react";
import { FaLeaf, FaTruck, FaSmile } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="font-serif min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-100 to-pink-200 px-8 py-16 grid md:grid-cols-2 items-center rounded-3xl shadow-inner">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-6 leading-tight">
            Cantik Alami, Bersinar Setiap Hari
          </h1>
          <p className="mb-6 text-gray-700 text-lg">
            Temukan koleksi kosmetik terbaik untuk wajah berseri & kulit sehat. Dipercaya oleh 100+ pelanggan setia!
          </p>
          <Link to="/Topproduct">
            <button className="bg-gradient-to-r from-pink-400 to-pink-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform transition duration-300 hover:from-pink-500 hover:to-pink-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
              Mulai Belanja
            </button>
          </Link>
        </div>
        <div className="flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src="https://i.pinimg.com/736x/32/de/19/32de1908e2adba92bdc92be1663c70d0.jpg"
            alt="Produk Kosmetik"
            className="w-1/3 md:w-1/2 rounded-full border-8 border-pink-200 shadow"
          />
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="px-8 pt-16 pb-12">
        <h2 className="text-2xl font-semibold text-center text-pink-700 mb-8">
          Rekomendasi Terlaris
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              img: "https://i.pinimg.com/736x/7a/d3/3a/7ad33a335ed7a0b5776af97c55d10f0b.jpg",
              title: "Lipstik Matte",
              desc: "Hasil akhir menawan dan tahan lama sepanjang hari."
            },
            {
              img: "https://i.pinimg.com/736x/fc/fa/83/fcfa83db6ce72c2427646e97cbd545aa.jpg",
              title: "Skincare Brightening",
              desc: "Kulit tampak cerah, sehat, dan bercahaya alami."
            },
            {
              img: "https://i.pinimg.com/736x/39/c8/7a/39c87aaeb7e7164e129ea053f52ef9e1.jpg",
              title: "Cushion Foundation",
              desc: "Ringan, merata, dan cocok untuk semua jenis kulit."
            }
          ].map((product, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transform hover:-translate-y-1 transition"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-pink-700 mb-2">
                  {product.title}
                </h3>
                <p className="flex-grow text-gray-600">{product.desc}</p>
                <button className="mt-4 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 text-gray-800 font-medium px-5 py-2 rounded-full shadow transition hover:from-pink-400 hover:to-pink-400 hover:shadow-lg">
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gradient-to-br from-pink-100 to-pink-200 py-16 px-8 text-center rounded-t-3xl shadow-inner">
        <h2 className="text-2xl font-semibold text-pink-700 mb-8">
          Kategori Kecantikan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              img: "https://i.pinimg.com/736x/7a/d3/3a/7ad33a335ed7a0b5776af97c55d10f0b.jpg",
              title: "Makeup",
              desc: "Dari lipstik, foundation hingga blush on – semuanya ada!"
            },
            {
              img: "https://i.pinimg.com/736x/fc/fa/83/fcfa83db6ce72c2427646e97cbd545aa.jpg",
              title: "Skincare",
              desc: "Rawat kulitmu dengan rangkaian skincare terbaik."
            },
            {
              img: "https://i.pinimg.com/736x/39/c8/7a/39c87aaeb7e7164e129ea053f52ef9e1.jpg",
              title: "Aksesoris Fashion",
              desc: "Lengkapi gaya dengan aksesoris kekinian & elegan."
            }
          ].map((product, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-pink-700 mb-2">
                  {product.title}
                </h3>
                <p className="flex-grow text-gray-600">{product.desc}</p>
                <button className="mt-4 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 text-gray-800 font-medium px-5 py-2 rounded-full shadow transition hover:from-pink-400 hover:to-pink-400 hover:shadow-lg">
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link to="/Topproduct">
          <button className="mt-8 bg-gradient-to-r from-pink-400 to-pink-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:from-pink-500 hover:to-pink-400 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            Jelajahi Semua Produk
          </button>
        </Link>
      </section>
    </div>
  );
}
