import { Button, Label, Spinner, TextInput } from "flowbite-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import model from "../assets/regismodel.png";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    alamat: "",
    no_telp: "",
  });

  function submitForm() {
    if (form.nama === "" || form.email === "" || form.password === "") {
      setError("Isi semua form untuk melengkapi data");

      return;
    }

    processRegister();
  }

  async function processRegister() {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,

          role: "user",
        }),
      });

      const result = await response.json();

      if (response.status !== 201) {
        throw new Error(result.message);
      }

      setError("");

      setSuccess("Register berhasil, silahkan login");
      navigate("/login");
    } catch (error) {
      setSuccess("");

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center p-4">
      <div className="max-w-screen-xl w-full bg-white shadow-lg sm:rounded-2xl flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 bg-orange-500 text-center hidden lg:flex items-center justify-center rounded-l-2xl">
          <div
            className="m-12 xl:m-16 w-full h-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${model})`, 
            }}
          />
        </div>

        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 w-full">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold">
              Register <span className="italic text-orange-500">RentCycle</span>
            </h1>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="w-full">
              <div className="my-10 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Buat Akun Rental Motor
                </div>
              </div>

              {error !== "" && (
                <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              {success !== "" && (
                <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-sm">
                  {success}
                </div>
              )}

              <div className="flex flex-col gap-5">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Nama"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nama: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Alamat"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      alamat: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Nomor telephone"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      no_telp: e.target.value,
                    })
                  }
                />

                {loading ? (
                  <button
                    disabled
                    className="mt-5 w-full bg-orange-400 text-white py-4 rounded-lg"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={submitForm}
                    className="mt-5 w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-400 transition-all"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
