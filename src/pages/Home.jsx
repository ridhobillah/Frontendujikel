import CardComp from "../components/CardComp";
import CardUnggul from "../components/CardUnggul";
import Maps from "../components/Maps";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="relative h-250 rounded-b-4xl flex items-center bg-orange-500 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://momotor.id/news/wp-content/uploads/2025/09/rekomendasi-motor-touring-750-cc.jpg')`,
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 w-full px-8 lg:px-24 xl:px-32">
          <div className="max-w-2xl">
            {user && (
              <p className="w-fit mb-5 text-lg font-medium italic text-white bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20">
                Selamat Datang,{" "}
                <span className="text-orange-400">{user.nama}</span>
              </p>
            )}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Sewa motor
              <br />
              <span className="text-orange-500 italic">mudah dan cepat</span>
            </h1>

            <p className="text-gray-300 text-lg font-medium md:text-xl mb-10 max-w-lg">
              Memberikan pelayanan ramah, terpercaya, mudah dan cepat di
              kotanya!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg" to="/kendaraan">Lihat motor</Link>

              <button className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Sewa Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      <CardUnggul />

      <div className="p-3 mt-10 mb-10">
        <CardComp />
      </div>
      <Maps />
    </>
  );
}
