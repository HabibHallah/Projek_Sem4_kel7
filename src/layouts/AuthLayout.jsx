import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-190 to-pink-290 text-black">
      {/* LEFT ILLUSTRATION */}
      <div className="w-1/2 hidden md:flex items-center justify-center relative p-10">
        <img
          src="https://i.pinimg.com/736x/f4/ca/bd/f4cabd9599c9f1b8701053e073616329.jpg"
          alt="dashboard illustration"
          className="w-1/3 md:w-1/2 rounded-full border-8 border-pink-200 shadow"
        />
        {/* Tambahan dekorasi awan atau grafik lain bisa di sini */}
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-md mx-4">
          <div className="text-left mb-6">
          </div>

          <Outlet />

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2025 Beutiva. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
