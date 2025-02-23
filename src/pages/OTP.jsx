import { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations

export default function OTP() {
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const email = localStorage.getItem("email");

  const verify = async (e) => {
    e.preventDefault();

    const { otp } = formData;

    try {
      const response = await fetch(
        "bookbackend-production-14e6.up.railway.app/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error verifying OTP");
      }
      const data = await response.json();
      window.location.href = "#/login";
      console.log(data);
    } catch (e) {
      setErrorMessage(e.message);
      console.error("Error in OTP verification:", e.message);
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
        className="bg-gray-800 flex flex-col items-center p-6 md:p-8 lg:p-12 rounded-lg shadow-lg z-10 w-full max-w-md" // Responsive padding
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#ffc300] mb-4">
          كتابكم
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#ffc300] mb-6 md:mb-8">
          رمز التفعيل
        </h2>
        <form onSubmit={verify} className="w-full">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 font-medium mb-4 md:mb-6 text-center">
              يرجى ادخال رمز التفعيل من بريدك الالكتروني
            </p>
            <input
              onChange={handleChange}
              required
              name="otp"
              placeholder="رمز التفعيل"
              className="w-full px-4 py-2 md:py-3 mb-4 md:mb-6 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc300] focus:bg-gray-600 transition duration-300 shadow-md text-right"
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
          </div>
        </form>
      </motion.div>
    </div>
  );
}
