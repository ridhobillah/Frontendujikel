import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function PembayaranAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAll = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token tidak ada");
        return;
      }

      const res = await fetch("http://localhost:3000/api/pembayaran/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      setData(json.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/pembayaran/export-excel",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Gagal export Excel");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "data-pembayaran.xlsx";

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
    getAll();
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
        <h1 className="text-2xl font-bold">Data Pembayaran Admin</h1>
        <button
          onClick={handleExportExcel}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
      </div>

      <div className="shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-4 px-4 text-left uppercase">ID</th>
              <th className="py-4 px-4 text-left uppercase">Penyewaan</th>
              <th className="py-4 px-4 text-left uppercase">Tanggal</th>
              <th className="py-4 px-4 text-left uppercase">Total</th>
              <th className="py-4 px-4 text-left uppercase">Metode</th>

              <th className="py-4 px-4 text-left uppercase">Status</th>
              <th className="py-4 px-4 text-left uppercase">Bukti</th>
              <th className="py-4 px-4 text-left uppercase">
                Jenis pembayaran
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 border-b border-gray-200">
                  {item.id}
                </td>

                <td className="py-4 px-4 border-b border-gray-200">
                  {item.Penyewaan?.User?.nama || "-"}
                </td>

                <td className="py-4 px-4 border-b border-gray-200">
                  {new Date(item.tgl_pembayaran).toLocaleDateString("id-ID")}
                </td>

                <td className="py-4 px-4 border-b border-gray-200 font-medium">
                  Rp {Number(item.total_pembayaran).toLocaleString("id-ID")}
                </td>

                <td className="py-4 px-4 border-b border-gray-200 capitalize">
                  {item.metode_pembayaran}
                </td>

                <td className="py-4 px-4 border-b border-gray-200">
                  <span
                    className={`px-3 py-1 rounded-full text-xs text-white ${
                      item.status_pembayaran === "berhasil"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status_pembayaran}
                  </span>
                </td>
                <td className="py-4 px-4 border-b border-gray-200">
                  <a
                    href={`http://localhost:3000/uploads/${item.bukti_pembayaran}`}
                  >
                    <img
                      className="h-20"
                      src={`http://localhost:3000/uploads/${item.bukti_pembayaran}`}
                      alt=""
                    />
                  </a>
                </td>
                <td className="py-4 px-4 border-b border-gray-200">
                  <span
                    className={`px-3 py-1 rounded-full text-xs text-white ${
                      item.jenis_pembayaran === "sewa"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.jenis_pembayaran}
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
