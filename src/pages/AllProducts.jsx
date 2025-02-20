import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Nav from "../components/navBar";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "#/login";
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/getProducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        data.data ? setProducts(data.data) : null;
      } catch (e) {
        setError(e.message);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-red-500 text-center mt-6">Error: {error}</div>;
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          📚 جميع المنتجات 📚
        </h1>

        {/* Search Input */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-lg w-1/2 text-right"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400">...لا يوجد كتب </p>
        ) : (
          <div className="flex flex-col gap-6 items-center">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.idproducts}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition cursor-pointer flex items-center w-3/4 mx-auto text-right"
              >
                <div className="flex flex-col gap-2 w-full mr-6">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-400">
                    {product.author} :المؤلف
                  </p>
                  <p className="text-sm text-gray-400">
                    الصنف: {product.genre}
                  </p>
                  <p className="text-sm text-gray-400">
                    اللغة: {product.language}
                  </p>
                  <p className="text-sm text-gray-400">{product.phone} 📞 </p>
                  <p className="text-lg text-yellow-400 font-bold">
                    د.أ {product.price} 💰
                  </p>
                </div>
                <img
                  src={`http://localhost:3001/${product.images[0]?.path.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-md border border-gray-700"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image")
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
