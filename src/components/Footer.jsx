import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-pink-200 py-8 px-8 border-t border-gray-200">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Info Kontak */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Info Kontak</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <i className="fas fa-map-marker-alt mr-3"></i>
                Jl. Contoh No. 123, Jakarta, Indonesia
              </p>
              <p className="flex items-center text-gray-600">
                <i className="fas fa-phone-alt mr-3"></i>
                +62 123 4567 8910
              </p>
              <p className="flex items-center text-gray-600">
                <i className="fas fa-envelope mr-3"></i>
                sedap@gmail.com
              </p>
              <p className="flex items-center text-gray-600">
                <i className="fas fa-clock mr-3"></i>
                Buka: Senin - Jumat, 09:00 - 17:00
              </p>
            </div>
          </div>

          {/* Sosial Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Sosial Media</h3>
            <p className="text-gray-600">Ikuti kami di media sosial untuk info terbaru</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/Sedap." target="_blank" rel="noopener noreferrer" 
                 className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/Sedap." target="_blank" rel="noopener noreferrer" 
                 className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/Sedap_id" target="_blank" rel="noopener noreferrer" 
                 className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/c/Sedap." target="_blank" rel="noopener noreferrer" 
                 className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://wa.me/6212345678910" target="_blank" rel="noopener noreferrer" 
                 className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Gambar Partner */}
            <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Partner Kami</h3>
            <div className="space-y-3">
                {[
                {
                    logo: "./img/Gojek.jpg",
                    name: "Gojek Food",
                    alt: "Partner 1"
                },
                {
                    logo: "./img/shopee.jpg",
                    name: "Shopee Food", 
                    alt: "Partner 2"
                }
                ].map((partner, index) => (
                <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                    <img 
                    src={partner.logo}
                    alt={partner.alt}
                    className="h-10 w-10 object-cover rounded-full border border-gray-200"
                    />
                    <span className="text-sm font-medium text-gray-700">{partner.name}</span>
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Sedap. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-blue-600">Kebijakan Privasi</a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-blue-600">Syarat & Ketentuan</a>
            <a href="/faq" className="text-sm text-gray-500 hover:text-blue-600">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;