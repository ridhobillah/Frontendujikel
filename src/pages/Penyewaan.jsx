import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function PenyewaanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kendaraan, setKendaraan] = useState(null);
  const [hari, setHari] = useState(1);
  const [ktp, setKtp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/api/kendaraan");
        const result = await res.json();

        const data = result.data.find((item) => item.id == id);
        setKendaraan(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login dulu");
        return navigate("/login");
      }

      if (!ktp) {
        alert("Upload KTP dulu");
        return;
      }

      const formData = new FormData();

      formData.append("id_kendaraan", id);
      formData.append("lama_sewa", hari);

      formData.append("ktp", ktp);

      const res = await fetch("http://localhost:3000/api/penyewaan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      console.log("RESULT:", result);

      if (!res.ok) {
        alert(result.message || "Gagal penyewaan");
        return;
      }

      navigate(`/pembayaran/${result.data.id}`);
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (!kendaraan) {
    return (
      <div className="text-center mt-20 text-red-500">
        Data kendaraan tidak ditemukan
      </div>
    );
  }

  const total = kendaraan.harga * hari;

  return (
    <>
     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-6 sm:py-10">

  <div className="w-full max-w-7xl mx-4 bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">

    <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-[600px]">
      <img
        src={`http://localhost:3000/uploads/${kendaraan.gambar}`}
        alt="kendaraan"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="w-full lg:w-1/2 p-5 sm:p-6 lg:p-8 flex items-center">

      <div className="w-full space-y-4">

        <h2 className="text-2xl font-bold text-gray-800">
          {kendaraan.nama_kendaraan} - <span className="text-lg font-medium italic">{kendaraan.Kategori?.nama_kategori} </span>
        </h2>

       

        <p className="text-sm text-gray-500">
          {kendaraan.merk} • {kendaraan.tahun} • {kendaraan.cc} CC
        </p>

        <p className="text-xl font-bold text-orange-500">
          Rp {Number(kendaraan.harga).toLocaleString("id-ID")} / hari
        </p>

        <div>
          <p className="text-xs text-gray-500">Plat nomor</p>
          <p className="font-semibold text-gray-800">
            {kendaraan.plat_nomor}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Jumlah hari</p>
          <input
            type="number"
            min={1}
            value={hari}
            onChange={(e) => setHari(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label
            htmlFor="upload"
            className="flex flex-col items-center gap-2 cursor-pointer border border-dashed border-orange-400 rounded-md p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 stroke-orange-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <span className="text-gray-700 text-sm font-medium">
              {ktp ? ktp.name : "Upload KTP"}
            </span>
          </label>

          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={(e) => setKtp(e.target.files[0])}
            className="hidden"
          />
        </div>

        <div className="flex items-center justify-between pt-2">

          <p className="font-bold text-gray-800">
            Rp {total.toLocaleString("id-ID")}
          </p>

          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Lanjut pembayaran
          </button>

        </div>

      </div>

    </div>
  </div>
</div>
    </>
  );
}
