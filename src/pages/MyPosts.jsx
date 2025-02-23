import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import Nav from "../components/navBar";
import EditModal from "../components/EditModal";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  let email;

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "#/login";
  }
  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled when the modal unmounts
    };
  }, [isOpen]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          "bookbackend-production-14e6.up.railway.app/getProducts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();
        setError(null);
        setPosts(data.data);
      } catch (error) {
        setError("Error fetching posts");
      }
    };

    if (email) {
      getPosts();
    }
  }, [token]);

  const handleEdit = (id) => {
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://bookbackend-production-14e6.up.railway.app/deleteProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );

      if (response.ok) {
        setPosts(posts.filter((post) => post.idproducts !== id));
        console.log("Post deleted successfully");
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Nav />
      <motion.div
        className="min-h-screen text-white p-4 md:p-6 flex justify-center"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Cool gradient
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="w-full max-w-2xl lg:max-w-4xl">
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-[#ffc300] mb-4 md:mb-6 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            اعلاناتي
          </motion.h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {posts?.length === 0 && !error && (
            <p className="text-gray-400 text-center">لا يوجد اعلانات</p>
          )}
          <div className="space-y-4 md:space-y-6">
            {posts?.map((post) => (
              <motion.div
                key={post.idproducts}
                className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-200">
                  {post.name}
                </h2>
                <p className="text-gray-400">{post.author}</p>
                <p className="text-gray-400">{post.genre}</p>
                <p className="text-gray-400">{post.language}</p>
                <p className="text-gray-300 font-bold">${post.price}</p>
                <p className="text-gray-300">📞 {post.phone}</p>
                {post.images && (
                  <motion.img
                    src={`https://bookbackend-production-14e6.up.railway.app/${post.images[0]?.path.replace(
                      /\\\\/g,
                      "/"
                    )}`} // Normalize slashes
                    alt={post.name}
                    className="mt-2 rounded-lg w-full h-48 md:h-64 lg:h-72 object-cover" // Responsive height
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(post.idproducts)}
                    postid={post.idproducts}
                    className="text-[#ffc300] hover:text-[#e6b100] transition duration-300"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(post.idproducts)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    حذف
                  </button>
                </div>
                {isOpen ? (
                  <EditModal
                    post={post}
                    isOpen={isOpen}
                    close={() => setIsOpen(false)}
                  />
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
