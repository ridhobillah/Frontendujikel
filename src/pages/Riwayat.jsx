import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { FaMotorcycle } from "react-icons/fa";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { MdOutlineUpdate } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdLocalPolice } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";

export default function Riwayat() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/penyewaan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      setData(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetur = async (id_penyewaan) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/penyewaan/retur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_penyewaan: id_penyewaan,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert("Retur berhasil");

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleExportPdf = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/penyewaan/export/pdf/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Gagal export PDF");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `penyewaan-${id}.pdf`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Gagal export PDF");
    }
  };

  

  if (loading) {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center ">
        <Spinner />
        <p className="mt-2">Sedang mengambil data....</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between">
        <Link to="/" className="text-orange-500 hover:text-orange-400">
          <IoArrowBackOutline size={30} />
        </Link>
        <h1 className="text-2xl italic font-bold mb-8">Riwayat Penyewaan</h1>
      </div>

      <div className="grid gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Kode Booking</p>

                <h2 className="text-2xl font-bold text-orange-500 mb-4">
                  {item.kode_booking}
                </h2>

                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <FaMotorcycle size={23} /> <b>Kendaraan:</b>{" "}
                    {item.Kendaraan?.nama_kendaraan}
                  </p>
                  

                  <p className="flex items-center gap-2">
                    <MdLocalPolice size={23} /> <b>No polisi</b>{" "}
                    {item.Kendaraan?.plat_nomor}
                  </p>

                  <p className="flex items-center gap-2">
                    <BsFillCalendar2DateFill size={23} /> <b>Tanggal Sewa:</b>{" "}
                    {new Date(item.tgl_sewa).toLocaleDateString("id-ID")}
                  </p>

                  <p className="flex items-center gap-2">
                    <MdOutlineUpdate size={23} /> <b>Batas Sewa:</b>{" "}
                    {new Date(item.batas_sewa).toLocaleDateString("id-ID")}
                  </p>

                  <p className="flex items-center gap-2">
                    <MdOutlinePayment size={23} /> <b>Status Pembayaran:</b>{" "}
                    {item.Pembayaran?.status_pembayaran}
                  </p>

                  <p className="flex items-center gap-2">
                    <PiMoneyWavyFill size={23} />
                    <b>Denda:</b>

                    <span
                      className={
                        item.denda > 0
                          ? "text-red-500 font-bold"
                          : "text-green-500 font-bold"
                      }
                    >
                      Rp {Number(item.denda).toLocaleString("id-ID")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    item.status_sewa === "selesai"
                      ? "bg-green-100 text-green-700"
                      : item.status_sewa === "denda"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status_sewa === "terlambat"
                    ? "Denda"
                    : item.status_sewa === "selesai"
                      ? "Selesai"
                      : "Sedang Disewa"}
                </span>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleExportPdf(item.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl"
                  >
                    Export PDF
                  </button>

                  {item.status_sewa === "disewa" && (
                    <button
                      onClick={() => handleRetur(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Retur
                    </button>
                  )}

                  {item.status_sewa === "terlambat" && (
                    <button
                      onClick={() => navigate(`/bayar-denda/${item.id}`)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Bayar Denda
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
