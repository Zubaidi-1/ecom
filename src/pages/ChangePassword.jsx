import { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { Link } from "react-router-dom"; // Import Link for navigation

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function containsSymbols(str) {
    const symbolRegex = /[^a-zA-Z0-9\s]/;
    return symbolRegex.test(str);
  }

  const verify = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password should be at least 8 characters long");
      return;
    }
    if (!containsSymbols(password)) {
      setErrorMessage("Password must contain an uppercase letter and a symbol");
      return;
    }

    try {
      const response = await fetch(
        "bookbackend-production-14e6.up.railway.app/confirmPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error changing password");
      }
      window.location.href = "#/login";

      const data = await response.json();
      console.log(data);
    } catch (e) {
      setErrorMessage(e.message);
      console.error("Error:", e.message);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4" // Added padding for smaller screens
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Cool gradient
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 flex flex-col items-center p-6 md:p-8 lg:p-12 rounded-lg shadow-lg z-10 w-full max-w-md md:max-w-lg lg:max-w-2xl" // Responsive padding and max-width
      >
        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#ffc300] mb-4">
          كتابكم
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#ffc300] mb-6 md:mb-8">
          تغيير كلمة السر
        </h2>
        <form onSubmit={verify} className="w-full">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 font-medium mb-4 md:mb-6 text-center">
              يرجى ادخال كلمة السر الجديدة
            </p>
            <input
              onChange={handleChange}
              required
              name="password"
              placeholder="كلمة السر الجديدة"
              className="w-full px-4 py-2 md:py-3 mb-4 md:mb-6 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:bg-gray-600 transition duration-300 shadow-md text-right"
              type="password"
            />
            <input
              onChange={handleChange}
              required
              name="confirmPassword"
              placeholder="تأكيد كلمة السر الجديدة"
              className="w-full px-4 py-2 md:py-3 mb-4 md:mb-6 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:bg-gray-600 transition duration-300 shadow-md text-right"
              type="password"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 md:py-3 bg-[#ffc300] text-black rounded-lg hover:bg-[#e6b100] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffc300] shadow-md"
            >
              تأكيد
            </motion.button>
            {errorMessage && (
              <p className="text-center mt-4 text-red-500">{errorMessage}</p>
            )}
            <p className="text-center mt-4 text-gray-400">
              تذكرت كلمة السر؟{" "}
              <Link
                to="/login"
                className="text-[#ffc300] underline hover:text-[#e6b100] transition duration-300"
              >
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
