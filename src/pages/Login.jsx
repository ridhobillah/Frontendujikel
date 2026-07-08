import { Button, Label, Spinner } from "flowbite-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import model from "../assets/loginmodel.png";
import { MdPersonAddAlt1 } from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function submitForm() {
    if (form.email === "" || form.password === "") {
      setError("Email dan Password wajib diisi");

      return;
    }

    processLogin();
  }

  async function processLogin() {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(result.message);
      }

      localStorage.setItem("token", result.data.token);

      localStorage.setItem("user", JSON.stringify(result.data.user));

      localStorage.setItem("role", result.data.user.role);

      if (result.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-2xl flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center mt-8">
            <img src={logo} className="w-mx-auto rounded-2xl" />
          </div>

          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-3xl font-bold">
              Masuk <span className="italic text-orange-500">RentCycle</span>
            </h1>

            <div className="w-full flex-1 mt-7">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Login Rental Motor
                </div>
              </div>

              <div className="mx-auto max-w-xs">
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
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

                {error !== "" && (
                  <div className="bg-red-500 text-white p-3 rounded-lg mt-4 text-sm">
                    {error}
                  </div>
                )}

                {loading ? (
                  <button
                    disabled
                    className="mt-5 tracking-wide font-semibold bg-orange-400 text-white w-full py-4 rounded-lg flex items-center justify-center"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={submitForm}
                    className="mt-5 tracking-wide font-semibold bg-orange-500 w-full py-4 rounded-lg hover:bg-orange-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <MdPersonAddAlt1 size={23} color="white" />
                    <span className="ml-2 text-white">Sign In</span>
                  </button>
                )}

                <p className="mt-6 text-sm text-center text-gray-600">
                  Belum punya akun?
                  <Link
                    to="/register"
                    className="text-orange-500 ml-2 font-semibold"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-orange-500 text-center hidden lg:flex rounded-2xl">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${model})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
