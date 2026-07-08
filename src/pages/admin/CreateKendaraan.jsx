import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

export default function CreateKendaraan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_kendaraan: "",
    merk: "",
    tahun: "",
    cc: "",
    plat_nomor: "",
    harga: "",
    nama_kategori: "",
    status_ketersediaan: "tersedia",
  });

  const [gambar, setGambar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nama_kendaraan,
      merk,
      tahun,
      cc,
      plat_nomor,
      harga,
      nama_kategori,
    } = form;

    if (
      !nama_kendaraan ||
      !merk ||
      !tahun ||
      !cc ||
      !plat_nomor ||
      !harga ||
      !nama_kategori ||
      !gambar
    ) {
      setError("Lengkapi semua data terlebih dahulu!");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);

      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("gambar", gambar);

      const res = await fetch("http://localhost:3000/api/kendaraan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Gagal menambahkan kendaraan");
        return;
      }

      setSuccess("Kendaraan berhasil ditambahkan!");

      setTimeout(() => {
        navigate("/admin/kendaraan");
      }, 1000);
    } catch (err) {
      console.log(err);

      setError("Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
          <h2 className="font-bold">Gagal!</h2>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded-lg">
          <h2 className="font-bold">Berhasil!</h2>
          <p>{success}</p>
        </div>
      )}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Tambah Kendaraan</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="nama_kendaraan"
            placeholder="Nama Kendaraan"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="merk"
              placeholder="Merk"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              name="tahun"
              placeholder="Tahun"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              name="cc"
              placeholder="CC"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="plat_nomor"
              placeholder="Plat Nomor"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              name="harga"
              placeholder="Harga / Hari"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="nama_kategori"
              placeholder="Kategori"
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Foto Kendaraan</label>

            <input
              type="file"
              onChange={(e) => setGambar(e.target.files[0])}
              className="w-full border rounded-lg p-2"
            />

            {gambar && (
              <p className="text-sm text-green-600 mt-2">{gambar.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Menyimpan..." : "Simpan Kendaraan"}
          </button>
        </form>
      </div>
    </>
  );
}
