import { motion } from "framer-motion";
import { FaSchool, FaUniversity } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { FaNoteSticky } from "react-icons/fa6";
import { TbMoodKidFilled } from "react-icons/tb";
import { IoIosPaper } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";

import Nav from "../components/navBar";
import { Link } from "react-router-dom";

export default function Categories() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "#/login";
  }

  const categories = [
    {
      icon: <FaBookOpen className="text-4xl" />,
      label: " جميع الكتب",
      link: "/allposts",
    },
    {
      icon: <FaSchool className="text-4xl" />,
      label: "كتب مدرسية",
      link: "/allposts/كتاب مدرسي",
    },
    {
      icon: <FaUniversity className="text-4xl" />,
      label: "كتب جامعية",
      link: "/allposts/كتاب جامعي",
    },
    {
      icon: <ImBooks className="text-4xl" />,
      label: "روايات",
      link: "/allposts/روايات ",
    },
    {
      icon: <TbMoodKidFilled className="text-4xl" />,
      label: "كتب اطفال",
      link: "/allposts/كتاب اطفال ",
    },
    {
      icon: <FaEllipsisV className="text-4xl" />,
      label: " اخرى",
      link: "/allposts/صنف اخر",
    },
  ];

  return (
    <>
      <Nav />
      <div
        className="flex justify-center items-center min-h-screen p-4" // Added padding for smaller screens
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Cool gradient
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {categories.map((category, index) => (
            <Link to={category.link} key={index}>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "#1f2937" }} // Slightly reduced scale for smoother hover
                whileTap={{ scale: 0.95 }}
                className="flex flex-col justify-center items-center gap-4 p-6 bg-gray-800 shadow-xl rounded-lg cursor-pointer text-gray-400 hover:text-white transition-all duration-300"
              >
                {category.icon}
                <p className="text-lg font-semibold text-center">
                  {category.label}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
