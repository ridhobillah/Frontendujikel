import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { BsBank2 } from "react-icons/bs";

export default function Pembayaran() {
  const { id } = useParams();
  const navigate = useNavigate();

    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [metode, setMetode] = useState("transfer");
  const [file, setFile] = useState(null);

  useEffect(() => {
    localStorage.setItem("payment_lock", id);

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/penyewaan/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setData(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBayar = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!file) {
        alert("Upload bukti pembayaran dulu");
        return;
      }

      const formData = new FormData();
      formData.append("id_penyewaan", id);
      formData.append("metode", metode);
      formData.append("bukti_pembayaran", file);

      const res = await fetch("http://localhost:3000/api/pembayaran", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Gagal pembayaran");
        return;
      }

      localStorage.removeItem("payment_lock");

      navigate(`/success/${result.data.id_pembayaran}`, {
        replace: true,
      });
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center mt-20">Data tidak ditemukan</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold text-center text-orange-500 mb-4">
        Pembayaran
      </h1>

      <div className="bg-white shadow rounded-lg p-4 mb-4 border">
        <p className="text-sm font-bold text-gray-500">Kode Booking</p>
        <p className="font-semibold text-2xl italic ">{data.kode_booking}</p>

        <p className="text-sm font-bold text-gray-500 mt-2">Total :</p>
        <p className="text-orange-500 text-2xl font-bold">
          Rp {Number(data.total_harga).toLocaleString("id-ID")}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <p className="font-semibold mb-2">Metode</p>

        <div className="flex gap-3">
          <label className="flex-1 border rounded p-2 text-center cursor-pointer">
            <input
              type="radio"
              value="transfer"
              checked={metode === "transfer"}
              onChange={(e) => setMetode(e.target.value)}
            />
            Transfer
          </label>

          <label className="flex-1 border rounded p-2 text-center cursor-pointer">
            <input
              type="radio"
              value="qris"
              checked={metode === "qris"}
              onChange={(e) => setMetode(e.target.value)}
            />
            QRIS
          </label>
        </div>
      </div>

      {metode === "transfer" && (
        <div className="bg-orange-50 p-3 rounded mb-4 text-sm">
          <div className="flex justify-between mb-2">
            <p className="flex items-center gap-2 text-lg">
              <BsBank2 /> BCA
            </p>
            <p className="text-lg">
              No Rekening : <span className="font-bold italic">125147261</span>
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="flex items-center gap-2 text-lg">
              <BsBank2 /> MANDIRI
            </p>
            <p className="text-lg">
              No Rekening : <span className="font-bold italic">653728677</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="flex items-center gap-2 text-lg">
              <BsBank2 /> BRI
            </p>
            <p className="text-lg">
              No Rekening : <span className="font-bold italic">187865466</span>
            </p>
          </div>
        </div>
      )}

      {metode === "qris" && (
        <div className="bg-orange-50 p-3 rounded mb-4 text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
            className="mx-auto"
          />
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="upload"
          className="flex flex-col items-center gap-2 cursor-pointer border-2 border-dashed border-orange-400 rounded-xl p-6 hover:bg-orange-50 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 stroke-orange-500"
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
            {file ? file.name : "Klik untuk upload file"}
          </span>
        </label>

        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </div>

      <button
        onClick={handleBayar}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
      >
        Bayar Sekarang
      </button>
    </div>
  );
}
