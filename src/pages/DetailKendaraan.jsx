import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { MdBrandingWatermark } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
export default function DetailKendaraan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/api/kendaraan");
        const result = await res.json();

        const item = result.data.find((k) => k.id === Number(id));

        setData(item);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner />
        <p className="mt-2">Loading detail kendaraan...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-20 text-red-500">
        Data kendaraan tidak ditemukan
      </div>
    );
  }

  const handleSewa = () => {
    navigate(`/penyewaan/${data.id}`);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 items-center gap-16 px-8 lg:px-20">
      <img
        src={`http://localhost:3000/uploads/${data.gambar}`}
        alt={data.nama_kendaraan}
        className="w-full h-[400px] lg:h-[700px] object-cover rounded-3xl"
      />

      <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 border border-gray-100">
        <span className="inline-block px-4 py-1 text-sm font-semibold bg-orange-100 text-orange-600 rounded-full">
          {data.Kategori?.nama_kategori}
        </span>

        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800 mt-6 leading-tight">
          {data.nama_kendaraan}
        </h1>

        <div className="grid grid-cols-2 gap-4 mt-8 text-gray-600 text-base lg:text-lg">
          <p className="bg-gray-50 flex items-center gap-2 p-3 rounded-xl">
            <MdBrandingWatermark/> <span className="font-semibold">Merk:</span> {data.merk}
          </p>

          <p className="bg-gray-50 flex items-center gap-2 p-3 rounded-xl">
           <FaCalendarAlt/> <span className="font-semibold">Tahun:</span> {data.tahun}
          </p>

          <p className="bg-gray-50 flex items-center gap-2 p-3 rounded-xl">
            <IoIosSettings/> <span className="font-semibold">CC:</span> {data.cc}
          </p>

          <p className="bg-gray-50 flex items-center gap-2 p-3 rounded-xl">
            <RiPoliceBadgeFill/> <span className="font-semibold">Plat:</span> {data.plat_nomor}
          </p>
        </div>

        <div className="mt-10">
          <p className="text-gray-500 text-sm">Harga Sewa</p>

          <h2 className="text-4xl lg:text-6xl font-extrabold text-orange-500 mt-2">
            Rp {Number(data.harga).toLocaleString("id-ID")}
            <span className="text-lg text-gray-500 font-medium"> / hari</span>
          </h2>
        </div>

        <button
          onClick={handleSewa}
          disabled={data.status_ketersediaan !== "tersedia"}
          className={`mt-10 w-full py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-md
      ${
        data.status_ketersediaan === "tersedia"
          ? "bg-orange-500 hover:bg-orange-600 text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
        >
          {data.status_ketersediaan === "tersedia"
            ? "Sewa Sekarang"
            : "Sedang Disewa"}
        </button>
      </div>
    </div>
  );
}
