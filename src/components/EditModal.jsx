import { useState, useEffect } from "react";
import Nav from "./navBar";
import { motion } from "framer-motion";
export default function EditModal({ post, isOpen, close }) {
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    category: "",
    language: "",
    price: "",
    phone: "",
    images: null,
  });
  console.log(post, "hello");
  useEffect(() => {
    if (post) {
      setFormData({
        bookName: post.name || "",
        author: post.author || "",
        category: post.genre || "",
        language: post.language || "",
        price: post.price || "",
        phone: post.phoneNumber || "",
        images: post.images || null,
      });
    }
  }, [post]); // Runs only when `post` changes

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
  console.log(post, "post");
  const isFormValid =
    formData.bookName?.trim() &&
    formData.author.trim() &&
    formData.category &&
    formData.language &&
    formData.price.trim() &&
    formData.phone?.trim();

  console.log(formData, "isFormValid");

  const editPost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.bookName);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("genre", formData.category);
      formDataToSend.append("language", formData.language);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("id", post.idproducts);

      if (formData.images) {
        formData.images.forEach((file) => {
          formDataToSend.append("images", file); // Appending each image
        });
      }
      console.log("FormData Contents:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      const response = await fetch(
        "bookbackend-production-14e6.up.railway.app/editProduct",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const data = await response.json();
      close();
      window.location.reload();
      console.log(data);
    } catch (error) {
      console.error("Error editing post", error);
    }
  };
  if (!isOpen) return null;
  return (
    <>
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 offset-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg"
          >
            <h2 className="text-2xl font-semibold text-center text-white mb-6">
              تعديل
            </h2>

            <form
              className="flex flex-col gap-4"
              encType="multipart/form-data"
              onSubmit={editPost}
            >
              <input
                type="text"
                name="bookName"
                placeholder="اسم الكتاب"
                className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                value={formData.bookName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="author"
                placeholder="اسم المؤلف"
                className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                value={formData.author}
                onChange={handleChange}
              />

              {/* Image Upload */}
              <label className="text-white">ارفق صورة</label>
              <input
                multiple
                type="file"
                name="images"
                accept="image/*"
                className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                onChange={handleChange}
                required
              />

              {/* Category Selection */}
              <select
                name="category"
                className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">صنف الكتاب</option>
                <option value="كتاب جامعي">كتاب جامعي</option>
                <option value="كتاب مدرسي">كتاب مدرسي</option>
                <option value="روايات">روايات</option>
                <option value="تنمية ذاتية">تنمية ذاتية</option>
                <option value="كتاب ديني">كتاب ديني</option>
                <option value="صنف اخر">صنف اخر</option>
              </select>

              {/* Language Selection */}
              <select
                name="language"
                className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
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
                className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                value={formData.price}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="رقم الهاتف"
                className="p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                value={formData.phone}
                onChange={handleChange}
              />

              <motion.button
                whileHover={{ scale: isFormValid ? 1.05 : 1 }}
                whileTap={{ scale: isFormValid ? 0.95 : 1 }}
                disabled={!isFormValid}
                className={`py-3 rounded-md font-semibold transition ${
                  isFormValid
                    ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                تعديل
              </motion.button>
              <motion.button
                whileHover={{ scale: isFormValid ? 1.05 : 1 }}
                whileTap={{ scale: isFormValid ? 0.95 : 1 }}
                className={`py-3 rounded-md font-semibold transition ${"bg-yellow-500 text-gray-900 hover:bg-yellow-400"}`}
                onClick={close}
              >
                اغلاق
              </motion.button>
            </form>
          </motion.div>
        </div>
      </>
    </>
  );
}
