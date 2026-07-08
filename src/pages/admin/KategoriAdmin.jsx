import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";


export default function KategoriAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

 

  const getKategori = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/kategori", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      

      console.log("DEBUG KATEGORI:", json);

      setData(json.data || []);

      setLoading(false);  
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

   useEffect(() => {
    getKategori();
  }, []);

  if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Spinner />
          <p className="mt-2">Sedang mengambil data</p>
        </div>
      );
    }

  return (
    <div className="mx-4 md:mx-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Kategori</h1>

        <button
          onClick={() => navigate("/admin/createkategori")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Kategori
        </button>
      </div>

      <div className="shadow-lg rounded-lg overflow-hidden">

        <table className="w-full table-fixed">


          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                ID
              </th>
              <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Nama Kategori
              </th>
              <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Stok
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">

            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">

                <td className="py-4 px-6 border-b border-gray-200">
                  {item.id}
                </td>

                <td className="py-4 px-6 border-b border-gray-200 truncate font-medium">
                  {item.nama_kategori}
                </td>

                <td className="py-4 px-6 border-b border-gray-200">
                  <span
                    className={`py-1 px-3 rounded-full text-xs text-white
                      ${item.stok > 0 ? "bg-green-500" : "bg-red-500"}
                    `}
                  >
                    {item.stok}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}