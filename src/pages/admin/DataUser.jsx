import { useState, useEffect } from "react";

const UserPage = () => {

  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const result = await res.json();

      setData(result.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="mx-4 md:mx-10">

      <h1 className="text-2xl font-bold mb-6">
        Data User
      </h1>

      <div className="shadow-lg rounded-lg overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>
            <tr className="bg-gray-100">

              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                ID
              </th>

              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Nama
              </th>

              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Email
              </th>

              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Role
              </th>

              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                Alamat
              </th>

              <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase">
                No Telp
              </th>

            

            </tr>
          </thead>

          <tbody className="bg-white">

            {data.map((item) => {

              const isAdmin = item.role === "admin";

              return (
                <tr key={item.id} className="hover:bg-gray-50 transition">

                  <td className="py-4 px-4 border-b border-gray-200">
                    {item.id}
                  </td>

                  <td className="py-4 px-4 border-b border-gray-200 font-medium">
                    {item.nama}
                  </td>

                  <td className="py-4 px-4 border-b border-gray-200">
                    {item.email}
                  </td>

                  <td className="py-4 px-4 border-b border-gray-200">
                    <span className={`px-3 py-1 rounded-full text-xs text-white ${
                      isAdmin ? "bg-red-500" : "bg-blue-500"
                    }`}>
                      {item.role}
                    </span>
                  </td>

                  <td className="py-4 px-4 border-b border-gray-200">
                    {item.alamat || "-"}
                  </td>

                  <td className="py-4 px-4 border-b border-gray-200">
                    {item.no_telp || "-"}
                  </td>


                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserPage;