import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function PenyewaanAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllAdmin = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/penyewaan/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      setData(result.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/api/penyewaan/export-excel",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Gagal export Excel");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "data-penyewaan.xlsx";

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Gagal export Excel");
  }
};

  useEffect(() => {
    getAllAdmin();
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
        <h1 className="text-2xl font-bold">Data Penyewaan Admin</h1>
        <button
  onClick={handleExportExcel}
  className="bg-green-500 text-white px-4 py-2 rounded"
>
  Export Excel
</button>
      </div>

      <div className="shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                ID
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Penyewa
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Kendaraan
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Tgl Sewa
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Batas
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Kembali
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Kode Booking
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Status
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Total
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Bukti ktp
              </th>
              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Denda
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-4 border-b border-gray-200">
                  {item.id}
                </td>

                <td className="py-4 px-4 border-b border-gray-200 font-medium">
                  {item.User?.nama || "-"}
                </td>

                <td className="py-4 px-4 border-b border-gray-200">
                  {item.Kendaraan?.nama_kendaraan || "-"}
                </td>

                <td className="py-4 px-4 border-b border-gray-200">
                  {new Date(item.tgl_sewa).toLocaleDateString("id-ID")}
                </td>

                <td className="py-4 px-4 border-b border-gray-200">
                  {new Date(item.batas_sewa).toLocaleDateString("id-ID")}
                </td>

                <td className="py-4 px-4 border-b border-gray-200">
                  {item.tgl_kembali
                    ? new Date(item.tgl_kembali).toLocaleDateString("id-ID")
                    : "-"}
                </td>

                <td className="py-4 px-4 border-b border-gray-200 font-mono text-orange-500">
                  {item.kode_booking}
                </td>

                <td className="py-4 px-4 border-b border-gray-200">
                  <span
                    className={`px-3 py-1 rounded-full text-xs text-white ${
                      item.status_sewa === "selesai"
                        ? "bg-green-400"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status_sewa}
                  </span>
                </td>

                <td className="py-4 px-4 border-b border-gray-200 font-medium">
                  Rp {Number(item.total_harga).toLocaleString("id-ID")}
                </td>

                <td className="py-4 px-4 border-b border-gray-200 font-mono text-orange-500">
                  <a href={`http://localhost:3000/uploads/${item.foto_ktp}`}>
                    <img
                      className="h-18"
                      src={`http://localhost:3000/uploads/${item.foto_ktp}`}
                      alt=""
                    />
                  </a>
                </td>

                <td className="py-4 px-4 border-b border-gray-200 font-medium">
                  Rp {Number(item.denda).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
