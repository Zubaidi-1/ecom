import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "#/categories";
  }

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("bookbackend.railway.internal/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          email: formData.email,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error);
        throw new Error("Error logging in");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token.token);
      window.location.href = "#/categories";
    } catch (e) {
      console.error("Error in Login:", e.message);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Cool gradient
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 flex flex-col items-center p-6 md:p-12 rounded-lg shadow-lg z-10 w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-md" // Responsive width and max-width
      >
        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#ffc300] mb-6 md:mb-8">
          كتابكم
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#ffc300] mb-6 md:mb-8">
          تسجيل الدخول
        </h2>
        <form onSubmit={login} className="w-full">
          <div className="flex flex-col items-center">
            <input
              required
              name="email"
              onChange={handleChange}
              placeholder="البريد الالكتروني"
              className="w-full px-4 py-2 md:py-3 mb-4 md:mb-6 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:bg-gray-600 transition duration-300 shadow-md"
            />
            <input
              name="password"
              required
              onChange={handleChange}
              placeholder="كلمة السر"
              className="w-full px-4 py-2 md:py-3 mb-4 md:mb-6 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:bg-gray-600 transition duration-300 shadow-md"
              type="password"
            />
            <Link
              to={"/forgotPassword"}
              className="text-[#ffc300] underline cursor-pointer mb-4 md:mb-6 hover:text-[#e6b100] transition duration-300"
            >
              هل نسيت كلمة السر؟
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-2 md:py-3 mb-4 md:mb-6 bg-[#ffc300] text-black rounded-lg hover:bg-[#e6b100] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffc300] shadow-md"
            >
              تسجيل دخول
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/#signup")}
              className="w-full px-4 py-2 md:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md"
            >
              انشاء حساب
            </motion.button>
            {errorMessage && (
              <p className="text-center mt-4 text-red-500">{errorMessage}</p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
