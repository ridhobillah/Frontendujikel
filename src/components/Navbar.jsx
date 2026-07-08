import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-screen-lg rounded-full border border-white/20 bg-white/10 py-3 shadow-lg backdrop-blur-xl">
      <div className="px-5 flex items-center justify-between">
        <Link to="/">
          <img src={logo} className="h-10 w-10 rounded-full" />
        </Link>
        <div className="flex gap-5">
          <Link to="/" className="text-orange-500">Home</Link>
          <Link to="/riwayat" className="text-orange-500">Riwayat</Link>
        </div>
        <div className="flex gap-2">
          {!token ? (
            <>
              <Link to="/register" className="px-4 py-2 border rounded-full text-orange-500">
                Register
              </Link>
              <Link to="/login" className="px-4 py-2 bg-orange-500 text-white rounded-full">
                Login
              </Link>
            </>
          ) : (
            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-full">
              Logout
            </button>
          )}
        </div>

      </div>
    </header>
  );
}