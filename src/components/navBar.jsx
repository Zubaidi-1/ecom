import { Link } from "react-router-dom";

export default function Nav() {
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <div className="flex justify-end gap-8 p-4 bg-gray-800 text-gray-300 shadow-md">
      <Link to="/sell" className="hover:text-white">
        بيع
      </Link>
      <Link to="/categories" className="hover:text-white">
        شراء
      </Link>
      {token ? <Link to="/myPosts">منشوراتي</Link> : ""}
      <Link to="/login" className="hover:text-white">
        <button
          onClick={() => {
            localStorage.clear("token");
          }}
        >
          {token ? "تسجيل خروج" : ""}
        </button>
      </Link>
    </div>
  );
}
