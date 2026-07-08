import Cartui from "../../components/Cartui";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalKendaraan, setTotalKendaraan] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0);

  const getTotalKendaraan = async () => {
    const res = await fetch("http://localhost:3000/api/kendaraan/count");
    const result = await res.json();

    setTotalKendaraan(result.total);
  };

  const getTotalUser = async () => {
    const res = await fetch("http://localhost:3000/api/user/count");
    const result = await res.json();

    setTotalUser(result.total);
  };

  const getTotalPendapatan = async () => {
  const res = await fetch("http://localhost:3000/api/pembayaran/pendapatan", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await res.json();

  setTotalPendapatan(result.total_pendapatan);
};


  useEffect(() => {
    getTotalKendaraan();
    getTotalUser();
     getTotalPendapatan();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Admin</h1>

        {user && (
          <p className="text-gray-500 mt-2">
            Selamat datang, <span className="font-semibold">{user.nama}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm font-medium italic">Total Kendaraan</p>

          <h1 className="text-4xl font-bold text-gray-800 mt-2">
            {totalKendaraan}
          </h1>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm font-medium italic">Total User</p>

          <h1 className="text-4xl font-bold text-gray-800 mt-2">
            {totalUser}
          </h1>
        </div>
         <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-xl transition">
          <p className="text-gray-500 text-sm font-medium italic">Total pendapatan</p>

          <h1 className="text-4xl font-bold text-gray-800 mt-2">
            Rp {totalPendapatan.toLocaleString()}
          </h1>
        </div>

       
      </div>

      <Cartui/>
    </div>
  );
}
