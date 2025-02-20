import booksBG from "../books.jpg";
import { motion } from "motion/react";
export default function Hero() {
  return (
    <div
      style={{ backgroundImage: `url(${booksBG})` }}
      className="min-h-screen  relative  bg-cover bg-center "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-1"></div>
      <div
        className="relative z-10 flex flex-col items-center justify-center h-screen
      
      "
      >
        <h1
          className={`font-scheherazade font-medium text-5xl text-[#fefae0] `}
        >
          وَخَيْرُ جَلِيْسٍ في الزّمانِ كِتابُ
        </h1>
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="font-scheherazade text-white bg-[#936639] mr-12 mt-12 text-2xl p-2 shadow-md shadow-white  "
          >
            اشتري الان
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="font-scheherazade text-[#414833] bg-[#c2c5aa] mr-12 mt-12 text-2xl p-2 shadow-md shadow-white border "
          >
            اعرض كتابك
          </motion.button>
        </div>
      </div>
    </div>
  );
}
