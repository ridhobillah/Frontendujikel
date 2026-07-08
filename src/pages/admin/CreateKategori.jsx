import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateKategori() {
 const [nama, setNama] = useState("");
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nama.trim()) {
    setError("Nama kategori tidak boleh kosong");
    setSuccess("");
    return;
  }

  try {
    setLoading(true);
    setSuccess("");
    setError("");

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/kategori", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama_kategori: nama,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.message || "Gagal menambahkan kategori");
      return;
    }

    setSuccess("Kategori berhasil ditambahkan");
    setNama("");

    setTimeout(() => {
      navigate("/admin/kategori");
    }, 1200);

  } catch (error) {
    console.log(error);
    setError("Server error");
  } finally {
    setLoading(false);
  }
};

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
   <div className="max-w-md mx-auto p-8 bg-white shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100">

  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
    <div className="p-2.5 bg-blue-500/40 rounded-xl"></div>

    <div>
      <h1 className="text-2xl font-bold text-gray-800">Tambah Kategori</h1>
      <p className="text-sm text-gray-500">
        Masukkan nama kategori kendaraan baru.
      </p>
    </div>
  </div>

  <form onSubmit={handleSubmit} className="space-y-5">

    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">
        Nama Kategori
      </label>

      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Contoh: Motor Matic"
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
      />
    </div>

    <button
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition disabled:opacity-70"
    >
      {loading ? "Loading..." : "Simpan Kategori"}
    </button>

  </form>
</div>
</>
  );
}