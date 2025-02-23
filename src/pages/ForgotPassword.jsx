import { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { Link } from "react-router-dom"; // Import Link for navigation

export default function ForgotPass() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const verify = async (e) => {
    e.preventDefault();

    const { email } = formData;
    localStorage.setItem("email", email);
    try {
      const response = await fetch(
        "https://bookbackend-production-14e6.up.railway.app/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error sending OTP");
      }
      window.location.href = "#/passwordOTP";

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
          استعادة كلمة السر
        </h2>
        <form onSubmit={verify} className="w-full">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 font-medium mb-4 md:mb-6 text-center">
              يرجى ادخال بريدك الالكتروني
            </p>
            <input
              onChange={handleChange}
              required
              name="email"
              placeholder="بريدك الالكتروني"
              className="w-full px-4 py-2 md:py-3 mb-4 md:mb-6 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:bg-gray-600 transition duration-300 shadow-md text-right"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 md:py-3 bg-[#ffc300] text-black rounded-lg hover:bg-[#e6b100] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffc300] shadow-md"
            >
              ارسال الرمز
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
