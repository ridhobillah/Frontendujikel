import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import DetailKendaraan from "../pages/DetailKendaraan";
import Penyewaan from "../pages/Penyewaan";
import Pembayaran from "../pages/Pembayaran";
import SuccessPage from "../pages/SuccesPage";
import Riwayat from "../pages/Riwayat";
import SemuaKendaraan from "../pages/SemuaKendaraan";


import Dashboard from "../pages/admin/Dashboard";
import KendaraanAdmin from "../pages/admin/KendaraanAdmin";
import CreateKendaraan from "../pages/admin/CreateKendaraan";
import EditKendaraan from "../pages/admin/EditKendaraan";
import PenyewaanAdmin from "../pages/admin/PenyewaanAdmin";


import AdminLayout from "../layouts/AdminLayout";
import { auth, adminAuth } from "../middleware/auth";
import KategoriAdmin from "../pages/admin/KategoriAdmin";
import CreateKategori from "../pages/admin/CreateKategori";
import PembayaranAdmin from "../pages/admin/PembayaranAdmin";
import BayarDenda from "../pages/BayarDenda";
import DataUser from "../pages/admin/DataUser";

const router = createBrowserRouter([
 
  { path: "/", element: <Home />},
  { path: "/login", element: <Login />},
   {path: "/register", element: <Register />,},
  { path: "/kendaraan", element: <SemuaKendaraan />},
  { path: "/kendaraan/:id", element: <DetailKendaraan />, loader: auth,},
  { path: "/penyewaan/:id", element: <Penyewaan />, loader: auth,},
  { path: "/pembayaran/:id", element: <Pembayaran />,loader: auth,},
  { path: "/success/:id", element: <SuccessPage />,loader: auth,},
  { path: "/riwayat", element: <Riwayat />, loader: auth,},
  { path: "/bayar-denda/:id", element: <BayarDenda />,},


  {path: "/admin", element: <AdminLayout />, loader: adminAuth,
    children: [
      { path: "dashboard", element: <Dashboard />,},
      { path: "kendaraan", element: <KendaraanAdmin />,},
      { path: "createkendaraan", element: <CreateKendaraan />,},
      { path: "kategori", element: <KategoriAdmin />,},
      { path: "createkategori", element: <CreateKategori />,},
      { path: "editkendaraan/:id", element: <EditKendaraan />,},
      { path: "penyewaan", element: <PenyewaanAdmin />,},
      { path: "pembayaran", element: <PembayaranAdmin />,},
      { path: "user", element: <DataUser />,},
    ],
  },


]);

export default router;
