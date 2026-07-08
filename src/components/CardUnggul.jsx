import { FaMotorcycle } from "react-icons/fa6";
import { BsPersonArmsUp } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";

export default function CardUnggul() {
  return (
    <div class="-mt-30 mx-auto grid max-w-7xl justify-center gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="relative overflow-hidden rounded-xl border border-orange-500/40 bg-white p-4 shadow-sm hover:shadow-md transition">
        <div class="flex h-[200px] flex-col justify-between rounded-md p-6">
          <FaMotorcycle size={40} color="darkorange" />

          <div class="space-y-2">
            <h3 class="text-lg font-bold italic text-gray-700">
              Banyak pilihan
            </h3>
            <p class="text-sm text-gray-600">
              Menyediakan banyak pilihan motor dari berbagai kategori
            </p>
          </div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-xl border border-orange-500/40 bg-white p-4 shadow-sm hover:shadow-md transition">
        <div class="flex h-[200px] flex-col justify-between rounded-md p-6">
          <BsPersonArmsUp size={40} color="darkorange" />

          <div class="space-y-2">
            <h3 class="text-lg font-bold italic text-gray-700">Layanan</h3>
            <p class="text-sm text-gray-600">
              Website yang mudah di gunakan pelayanan yang ramah mudah dan cepat
            </p>
          </div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-xl border border-orange-500/40 bg-white p-4 shadow-sm hover:shadow-md transition">
        <div class="flex h-[200px] flex-col justify-between rounded-md p-6">
          <FaMoneyBillWave size={40} color="darkorange" />

          <div class="space-y-2">
            <h3 class="text-lg font-bold italic text-gray-700">
              Harga terjangkau
            </h3>
            <p class="text-sm text-gray-600">
              Memberikan harga yang ramah di kantong dan terjangkau di kotanya
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
