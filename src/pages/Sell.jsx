import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import Nav from "../components/navBar";

export default function Sell() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "#/login";
  }
  let sellerName = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      sellerName = `${decoded.firstName} ${decoded.lastName}`;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    category: "",
    language: "",
    price: "",
    phone: "",
    images: null,
  });

  // Update formData dynamically
  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({
        ...formData,
        images: [...e.target.files],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Check if the form is valid
  const isFormValid =
    formData.bookName.trim() &&
    formData.author.trim() &&
    formData.category &&
    formData.language &&
    formData.price.trim() &&
    formData.phone.trim();

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.bookName);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("genre", formData.category);
      formDataToSend.append("language", formData.language);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("phoneNumber", formData.phone);
      formDataToSend.append("email", jwtDecode(token).email);

      if (formData.images) {
        formData.images.forEach((file) => {
          formDataToSend.append("images", file); // Appending each image
        });
      }

      const response = await fetch("http://localhost:3001/sell", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data, "Data submitted successfully");
      window.location.href = "/books/#/myPosts";
    } catch (error) {
      console.error("Error during submission:", error.message);
    }
  };

  return (
    <>
      <Nav />
      <div
        className="min-h-screen text-white flex justify-center items-center p-4" // Added padding for smaller screens
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Cool gradient
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg" // Responsive padding and max-width
        >
          <h2 className="text-2xl font-semibold text-center text-[#ffc300] mb-6">
            اعرض كتابك
          </h2>

          {sellerName && (
            <p className="text-gray-400 text-center mb-4">
              {sellerName} : البائع
            </p>
          )}

          <form
            onSubmit={formSubmit}
            className="flex flex-col gap-4"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="bookName"
              placeholder="اسم الكتاب"
              className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc300] text-white"
              value={formData.bookName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="author"
              placeholder="اسم المؤلف"
              className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc300] text-white"
              value={formData.author}
              onChange={handleChange}
            />

            {/* Image Upload */}
            <label className="text-gray-400">ارفق صورة</label>
            <input
              multiple
              type="file"
              name="images"
              accept="image/*"
              className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc300] text-white"
              onChange={handleChange}
              required
            />

            {/* Category Selection */}
            <select
              name="category"
              className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc300] text-white"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">صنف الكتاب</option>
              <option value="كتاب جامعي">كتاب جامعي</option>
              <option value="كتاب مدرسي">كتاب مدرسي</option>
              <option value="روايات">روايات</option>
              <option value="تنمية ذاتية">كتاب اطفال</option>
              <option value="كتاب ديني">كتاب ديني</option>
              <option value="صنف اخر">صنف اخر</option>
            </select>

            {/* Language Selection */}
            <select
              name="language"
              className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc300] text-white"
              value={formData.language}
              onChange={handleChange}
            >
              <option value="">لغة الكتاب</option>
              <option value="عربي">عربي</option>
              <option value="انجليزي">انجليزي</option>
            </select>

            <input
              type="text"
              name="price"
              placeholder="السعر"
              className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc300] text-white"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="رقم الهاتف"
              className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffc300] text-white"
              value={formData.phone}
              onChange={handleChange}
            />

            <motion.button
              whileHover={{ scale: isFormValid ? 1.05 : 1 }}
              whileTap={{ scale: isFormValid ? 0.95 : 1 }}
              disabled={!isFormValid}
              className={`py-3 rounded-md font-semibold transition ${
                isFormValid
                  ? "bg-[#ffc300] text-gray-900 hover:bg-[#e6b100]"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              إرسال
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
