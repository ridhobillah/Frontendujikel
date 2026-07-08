import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import SearchComp from "../components/SearchComp";

export default function SemuaKendaraan() {
  const [kendaraan, setKendaraan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function processSearch(event) {
    setSearch(event.target.value);
  }

  const filteredKendaraan = kendaraan.filter((item) =>
    item.nama_kendaraan?.toLowerCase().includes(search.toLowerCase()),
  );

  async function getKendaraan(url = "http://localhost:3000/api/kendaraan") {
    try {
      setLoading(true);

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      const result = await res.json();

      setKendaraan(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getKendaraan();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-5">Semua Kendaraan</h1>

        <SearchComp processSearch={processSearch} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Spinner />
            <p className="mt-2 text-gray-600">Sedang mengambil data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {filteredKendaraan.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10 ">
                Kendaraan tidak ditemukan.
              </div>
            ) : (
              filteredKendaraan.map((item) => (

                
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={`http://localhost:3000/uploads/${item.gambar}`}
                      alt={item.nama_kendaraan}
                      className="w-full h-full object-cover"
                    />

                    <span
                      className={`absolute top-2 left-2 text-xs px-2 py-1 rounded text-white ${
                        item.status_ketersediaan === "disewa"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.status_ketersediaan}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold">{item.nama_kendaraan}</h3>

                    <p className="text-sm text-gray-500">
                      {item.merk} • {item.tahun} • {item.cc} CC
                    </p>

                    <p className="text-orange-500 font-bold mt-2">
                      Rp {Number(item.harga).toLocaleString("id-ID")} / hari
                    </p>

                    <button
                      disabled={item.status_ketersediaan === "disewa"}
                      onClick={() => navigate(`/kendaraan/${item.id}`)}
                      className={`mt-3 w-full py-2 rounded text-sm ${
                        item.status_ketersediaan === "disewa"
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                    >
                      {item.status_ketersediaan === "disewa"
                        ? "Sedang Disewa"
                        : "Lihat Detail"}
                    </button>
                  </div>
                </div>


              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
