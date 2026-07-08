import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBank2 } from "react-icons/bs";


export default function BayarDenda() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [metode, setMetode] = useState("transfer");

  const [loading, setLoading] = useState(false);



  const submit = async () => {
    if (!file) {
      alert("Upload bukti pembayaran");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("id_penyewaan", id);
      formData.append("metode", metode);
      formData.append("bukti_pembayaran", file);

      const response = await fetch(
        "http://localhost:3000/api/pembayaran/denda",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Denda berhasil dibayar");

      navigate("/riwayat");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">

      <h1 className="text-2xl font-bold mb-5">
        Bayar Denda
      </h1>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Metode Pembayaran
        </label>

        <select
          value={metode}
          onChange={(e) => setMetode(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="transfer">
            Transfer Bank
          </option>

          <option value="qris">
            QRIS
          </option>
        </select>
      </div>

      <div className="mb-4">
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


            <p className="mb-3 italic font-medium">Upload bukti pembayaran</p>

            
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
      >
        {loading ? "Loading..." : "Bayar Denda"}
      </button>

    </div>
  );
}