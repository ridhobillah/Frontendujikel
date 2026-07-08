import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
export default function CardComp() {
  const [kendaraan, setKendaraan] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/kendaraan");
    const result = await res.json();
    
    const sorted = result.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    setKendaraan(sorted.slice(0, 4));

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner />
        <p className="mt-2">Sedang mengambil data</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between p-3 mb-5">
        <p className="font-medium italic">Data kendaraan</p>
        <button
          onClick={() => navigate("/kendaraan")}
          className="text-orange-500 flex items-center gap-2 hover:text-orange-600"
        >
          Lihat semua <IoIosArrowForward />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kendaraan.map((item) => {
          const isDisewa = item.status_ketersediaan === "disewa";

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={`http://localhost:3000/uploads/${item.gambar}`}
                  alt={item.nama_kendaraan}
                  className="w-full h-85 object-cover"
                />

                <div
                  className={`absolute top-3 right-3 text-white px-3 py-1 rounded-full text-xs font-semibold ${
                    isDisewa ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {isDisewa ? "Disewa" : "Tersedia"}
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium text-gray-800">
                    {item.nama_kendaraan}
                  </h3>
                  <p className="text-red-500 font-bold">{item.merk}</p>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {item.tahun} • {item.cc} CC
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-orange-500 text-lg">
                    Rp {Number(item.harga).toLocaleString("id-ID")} / Hari
                  </span>

                  <button
                    disabled={isDisewa}
                    onClick={() => navigate(`/kendaraan/${item.id}`)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isDisewa
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    {isDisewa ? "Sedang Disewa" : "Lihat Detail"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
