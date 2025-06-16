import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      });

      if (response.status !== 200) {
        setError(response.data.message || "Login failed");
        return;
      }

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl  w-full max-w-sm">
      <h2 className="text-2xl font-bold text-black mb-2">
                Login
            </h2>
            
            <p className="text-sm text-gray-500 mb-6 ">
                Masuk ke akun anda.
            </p>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded flex items-center mb-4 text-sm">
          <BsFillExclamationDiamondFill className="mr-2" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-100 text-gray-700 p-3 rounded flex items-center mb-4 text-sm">
          <ImSpinner2 className="mr-2 animate-spin" />
          Please wait...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your username"
            value={dataForm.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={dataForm.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>

        <div className="flex justify-end text-sm text-teal-600 mb-2">
          <button
            type="button"
            onClick={() => navigate("/forgot")}
            className="hover:underline"
          >
            Forgot Password?
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
        New to Beutiva?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-teal-600 font-semibold hover:underline"
        >
          Register Here
        </button>
      </div>
    </div>
  );
}
