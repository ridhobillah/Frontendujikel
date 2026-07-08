import { CiSearch } from "react-icons/ci";

export default function SearchComp({ processSearch }) {
  return (
    <input
      type="text"
      placeholder="Cari nama kendaraan..."
      onKeyUp={processSearch}
    className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 outline-none transition"
    />
  );
}