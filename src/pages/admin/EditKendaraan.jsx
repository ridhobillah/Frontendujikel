import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditKendaraan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    nama_kendaraan: "",
    merk: "",
    tahun: "",
    cc: "",
    plat_nomor: "",
    harga: "",
    status_ketersediaan: "",
  });

  const [gambar, setGambar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/kendaraan");
      const result = await res.json();

      const data = result.data.find((item) => item.id == id);

      if (data) {
        setForm({
          nama_kendaraan: data.nama_kendaraan,
          merk: data.merk,
          tahun: data.tahun,
          cc: data.cc,
          plat_nomor: data.plat_nomor,
          harga: data.harga,
          status_ketersediaan: data.status_ketersediaan,
        });
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("id_kendaraan", id);
      formData.append("nama_kendaraan", form.nama_kendaraan);
      formData.append("merk", form.merk);
      formData.append("tahun", form.tahun);
      formData.append("cc", form.cc);
      formData.append("plat_nomor", form.plat_nomor);
      formData.append("harga", form.harga);
      formData.append("status_ketersediaan", form.status_ketersediaan);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      const res = await fetch("http://localhost:3000/api/kendaraan", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        setSuccess(result.message || "Gagal update kendaraan");
        return;
      }

      setSuccess("Kendaraan berhasil diupdate");

      setTimeout(() => {
        navigate("/admin/kendaraan");
      }, 1200);

    } catch (err) {
      console.log(err);
      setSuccess("Server error");
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
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Kendaraan</h1>

     

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="nama_kendaraan"
          value={form.nama_kendaraan}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Nama kendaraan"
        />

        <input
          name="merk"
          value={form.merk}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Merk"
        />

        <input
          name="tahun"
          value={form.tahun}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Tahun"
        />

        <input
          name="cc"
          value={form.cc}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="CC"
        />

        <input
          name="plat_nomor"
          value={form.plat_nomor}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Plat nomor"
        />

        <input
          name="harga"
          value={form.harga}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Harga"
        />

        <select
          name="status_ketersediaan"
          value={form.status_ketersediaan}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="tersedia">Tersedia</option>
          <option value="disewa">Disewa</option>
        </select>

        <input
          type="file"
          onChange={(e) => setGambar(e.target.files[0])}
          className="border p-2 w-full"
        />

        <button
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          {loading ? "Loading..." : "Update Kendaraan"}
        </button>
      </form>
    </div>
    </> 
  );
}