import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { userAPI } from "../../assets/services/userAPI";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await userAPI.fetchUser(dataForm.email, dataForm.password);

      if (!result || result.length === 0) {
        setError("Email atau password salah.");
        return;
      }

      const user = result[0];

      if (!user.id) {
        setError("Data user tidak valid.");
        return;
      }

      // ✅ Simpan data ke sessionStorage
      sessionStorage.setItem("userLoggedIn", "true");
      sessionStorage.setItem("userRole", user.role || "");
      sessionStorage.setItem("userEmail", user.email || "");
      sessionStorage.setItem("userNama", user.nama || "");
      sessionStorage.setItem("user_id", String(user.id)); // simpan sebagai string

      Swal.fire("Berhasil!", "Login berhasil", "success");

      // Arahkan ke halaman sesuai role
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "customer") {
        navigate("/");
      } else {
        setError(`Role "${user.role}" tidak dikenali.`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login gagal. Periksa koneksi atau data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-full max-w-sm">
      <h2 className="text-2xl font-bold text-black mb-2">Login</h2>
      <p className="text-sm text-gray-500 mb-6">Masuk ke akun anda.</p>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded flex items-center mb-4 text-sm">
          <BsFillExclamationDiamondFill className="mr-2" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-100 text-gray-700 p-3 rounded flex items-center mb-4 text-sm">
          <ImSpinner2 className="mr-2 animate-spin" />
          Mohon tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            required
            placeholder="Masukkan email"
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            required
            placeholder="Masukkan password"
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-800"
          />
        </div>

        <div className="flex justify-end text-sm text-teal-600 mb-2">
          <button
            type="button"
            onClick={() => navigate("/forgot")}
            className="hover:underline"
          >
            Lupa Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-200 hover:bg-pink-300 text-black py-2 rounded font-bold transition"
        >
          LOGIN
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-teal-600 font-semibold hover:underline"
        >
          Daftar di sini
        </button>
      </div>
    </div>
  );
}
