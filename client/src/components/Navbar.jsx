import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full flex justify-between items-center px-6 py-4 border-b border-gray-800">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
        ShortenURL
      </h1>
      <div className="flex justify-center items-center p-[1px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        <Link
          to="/details"
          className="px-3 py-1 rounded-full bg-[#0D1117] text-pink-500 font-semibold"
        >
          Url Details
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
