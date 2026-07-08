import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function SuccessPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/pembayaran/${id}`, {
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

  fetchData();
}, [id]);

  if (loading) {
  return (
     <div className="flex justify-center items-center min-h-screen">
      <Spinner
        aria-label="Loading..."
        size="xl"
        color="warning"
      />
    </div>
  );
}
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow border p-10 font-mono">

  <h1 className="text-center text-2xl font-bold text-orange-500 mb-6">
    STRUK PEMBAYARAN
  </h1>

  <div className="border-t border-b border-dashed py-6 space-y-4 text-sm">

    <div className="flex justify-between">
      <span>Kode Booking</span>
      <span className="font-semibold">{data.Penyewaan?.kode_booking}</span>
    </div>

    <div className="flex justify-between">
      <span>Metode Pembayaran</span>
      <span>{data.metode_pembayaran}</span>
    </div>

    <div className="flex justify-between">
      <span>Total Pembayaran</span>
      <span className="text-orange-500 font-bold text-lg">
        Rp {Number(data.total_pembayaran).toLocaleString("id-ID")}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Status</span>
      <span className="text-green-600 font-semibold">
        {data.status_pembayaran}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Tanggal Pembayaran</span>
      <span>{new Date(data.tgl_pembayaran).toLocaleString()}</span>
    </div>

  </div>


  <div className="text-center mt-8 text-gray-500 text-sm">
    <p>Terima kasih telah menggunakan layanan kami</p>
  </div>


  <button
    onClick={() => navigate("/")}
    className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded"
  >
    Back to Home
  </button>

</div>
  );
}
