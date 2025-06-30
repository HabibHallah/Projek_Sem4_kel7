import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { userAPI } from "../../assets/services/userAPI"; // ← pastikan path sesuai

export default function Register() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Konfirmasi password tidak sesuai.");
      return;
    }

    setLoading(true);
    try {
      // Menyimpan user baru ke Supabase (default role customer)
      const newUser = {
        nama: dataForm.nama,
        email: dataForm.email,
        password: dataForm.password,
        role: "customer",
      };

      await userAPI.createUser(newUser);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registrasi gagal. Periksa koneksi dan data Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Create Your Account ✨
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded flex items-center mb-4 text-sm">
          <BsFillExclamationDiamondFill className="mr-2" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-100 text-gray-700 p-3 rounded flex items-center mb-4 text-sm">
          <ImSpinner2 className="mr-2 animate-spin" />
          Registering...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-black-700 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama"
            value={dataForm.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-black-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-black-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="********"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-black-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-200 hover:bg-pink-300 text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Register
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-teal-600 font-semibold hover:underline"
        >
          Login di sini
        </button>
      </div>
    </div>
  );
}
