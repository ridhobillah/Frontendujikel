import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function KendaraanAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getAll = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/kendaraan");
    const result = await res.json();

    const sorted = result.data.sort((a, b) => a.id - b.id);

    setData(sorted);
    setLoading(false);
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus kendaraan?");
    if (!confirmDelete) return;

    try {
      setSuccess("");
      setError("");

      const res = await fetch("http://localhost:3000/api/kendaraan", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_kendaraan: id }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Gagal menghapus kendaraan");
        return;
      }

      setSuccess("Kendaraan berhasil dihapus");

      getAll();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setError("Server error");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner />
        <p className="mt-2">Sedang mengambil data</p>
      </div>
    );
  }

  return (
    <>
      {success && (
        <div className="mb-4 bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded-lg">
          <h2 className="font-bold">Berhasil!</h2>
          <p>{success}</p>
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
          <h2 className="font-bold">Gagal!</h2>
          <p>{error}</p>
        </div>
      )}
      <div className="mx-4 md:mx-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Data Kendaraan</h1>

          <button
            onClick={() => navigate("/admin/createkendaraan")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah Kendaraan
          </button>
        </div>

        <div className="shadow-lg rounded-lg overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  ID
                </th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  Gambar
                </th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  Nama
                </th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  Merk
                </th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  Plat
                </th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  Kategori
                </th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  Harga
                </th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  Status
                </th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.map((item) => {
                const isDisewa = item.status_ketersediaan === "disewa";

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-4 border-b border-gray-200">
                      {item.id}
                    </td>

                    <td className="py-4 px-4 border-b border-gray-200">
                      <img
                        src={`http://localhost:3000/uploads/${item.gambar}`}
                        className="w-14 h-10 object-cover rounded"
                      />
                    </td>

                    <td className="py-4 px-4 border-b border-gray-200 font-medium truncate">
                      {item.nama_kendaraan}
                    </td>

                    <td className="py-4 px-4 border-b border-gray-200">
                      {item.merk}
                    </td>

                    <td className="py-4 px-4 border-b border-gray-200 uppercase">
                      {item.plat_nomor}
                    </td>

                    <td className="py-4 px-4 border-b border-gray-200 truncate">
                      {item.Kategori?.nama_kategori}
                    </td>

                    <td className="py-4 px-4 border-b border-gray-200 font-medium">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </td>

                    <td className="py-4 px-4 border-b border-gray-200">
                      <span
                        className={`px-3 py-1 rounded-full text-xs text-white ${
                          isDisewa ? "bg-red-500" : "bg-green-500"
                        }`}
                      >
                        {item.status_ketersediaan}
                      </span>
                    </td>

                    <td className="py-4 px-4 border-b border-gray-200 whitespace-nowrap">
                      <div className="flex gap-2 min-w-max">
                        <button
                          onClick={() =>
                            navigate(`/admin/editkendaraan/${item.id}`)
                          }
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs whitespace-nowrap"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs whitespace-nowrap"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
