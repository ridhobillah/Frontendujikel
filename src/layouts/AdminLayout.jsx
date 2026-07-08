import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { TbLogout } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { IoIosKey } from "react-icons/io";
import { FaMotorcycle } from "react-icons/fa";
import { MdSportsMotorsports } from "react-icons/md";
import { RiQrScan2Line } from "react-icons/ri";
import { IoPersonAddSharp } from "react-icons/io5";

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <aside className="w-64 h-screen fixed left-0 top-0 bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-800 shadow-xl">
        <div>
          <div className="p-6 border-b h-35 border-slate-800/60 flex items-center justify-center gap-3">
            <img
              src={logo}
              className="w-10 h-10 rounded-full object-cover shadow-md shadow-emerald-500/10"
              alt="Logo"
            />

            {user && (
              <div className="flex flex-col">
                <p className="">
                  <span className="text-orange-400 italic ">{user.nama}</span>
                </p>
              </div>
            )}
          </div>

          <nav className="p-4 flex flex-col gap-1.5">
            <p className="text-[15px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">
              Menu Utama
            </p>

            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-slate-900 hover:text-white group"
            >
              <span className="text-slate-400 group-hover:text-orange-500 transition-colors">
                <AiFillHome />
              </span>
              Dashboard
            </Link>

            <Link
              to="/admin/kendaraan"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-slate-900 hover:text-white group"
            >
              <span className="text-slate-400 group-hover:text-orange-500 transition-colors">
                <FaMotorcycle />
              </span>
              Kendaraan
            </Link>

            <Link
              to="/admin/kategori"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-slate-900 hover:text-white group"
            >
              <span className="text-slate-400 group-hover:text-orange-500 transition-colors">
                <IoIosKey />
              </span>
              Kategori
            </Link>

            <Link
              to="/admin/penyewaan"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-slate-900 hover:text-white group"
            >
              <span className="text-slate-400 group-hover:text-orange-500 transition-colors">
                <MdSportsMotorsports />
              </span>
              Penyewaan
            </Link>
            <Link
              to="/admin/pembayaran"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-slate-900 hover:text-white group"
            >
              <span className="text-slate-400 group-hover:text-orange-500 transition-colors">
                <RiQrScan2Line />
              </span>
              Pembayaran
            </Link>
             <Link
              to="/admin/user"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-slate-900 hover:text-white group"
            >
              <span className="text-slate-400 group-hover:text-orange-500 transition-colors">
                <IoPersonAddSharp />
              </span>
              Data user
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/60">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-700 text-white hover:text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 group"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              <TbLogout />
            </span>
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 min-h-screen bg-slate-50">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-end px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">
              Halo,{" "} {user && (<span className="text-orange-400 italic ">{user.nama}</span>)}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-between overflow-hidden">
              <img src={logo} className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
