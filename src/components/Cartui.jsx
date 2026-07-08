import { useEffect, useState } from "react";

export default function CartUi() {
  const [thisMonth, setThisMonth] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const getGrowth = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:3000/api/penyewaan/growth/penyewaan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setThisMonth(Number(data.thisMonth) || 0);
        setLastMonth(Number(data.lastMonth) || 0);
        setPercent(Number(data.percent) || 0);
      } catch (error) {
        console.error(error);
      }
    };

    getGrowth();
  }, []);

  const isUp = percent >= 0;

  return (
  <div className="mt-10 bg-white rounded-2xl p-6 min-w-[320px] min-h-[180px] shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">

  <div className="flex justify-between items-start">
    <div>
      <p className="text-sm text-gray-500 font-semibold tracking-wide uppercase">
        Penyewaan bulan ini
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Bulan lalu: {lastMonth} penyewaan
      </p>
    </div>

    <div className="w-13 h-13 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shadow-inner">
      
    </div>
  </div>

  <div className="text-5xl font-bold text-gray-900 leading-none mt-3 tabular-nums">
    {thisMonth}
  </div>

  <div className="flex items-center gap-2 mt-4">
    <span
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm
        ${isUp
          ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
          : "bg-red-50 text-red-500 ring-1 ring-red-200"
        }`}
    >
      {isUp ? "▲" : "▼"} {Math.abs(percent).toFixed(1)}%
    </span>

    <span className="text-xs text-gray-400 font-medium">
      dibanding bulan lalu
    </span>
  </div>

</div>
  );
}