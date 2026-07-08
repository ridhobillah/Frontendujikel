import { AiOutlineMail } from "react-icons/ai";
import { RiGlobalLine } from "react-icons/ri";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";

export default function Maps() {
  return (
    <section class="mb-32">
      <div class="relative h-[400px] overflow-hidden">
        <iframe
          src="https://www.google.com/maps?q=Hankam+Cisarua+Bogor&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-12 -mt-16">
        <div className="rounded-xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg p-8 md:p-12">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between">
              <div className="flex items-start gap-4 w-80">
                <div className="bg-orange-500 p-3 rounded-md">
                  <AiOutlineMail color="white" />
                </div>
                <div>
                  <p className="font-bold">Gmail</p>
                  <p className="text-sm text-gray-500">rentcycle@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 w-80">
                <div className="bg-orange-500 p-3 rounded-md">
                  <RiGlobalLine color="white" />
                </div>
                <div>
                  <p className="font-bold">Social</p>
                  <p className="text-sm text-gray-500">RentCycle.id</p>
                </div>
              </div>

              <div className="flex items-start gap-4 w-80">
                <div className="bg-orange-500 p-3 rounded-md">
                  <MdOutlinePhoneCallback color="white" />
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-sm text-gray-500">+62898920756 </p>
                </div>
              </div>

              <div className="flex items-start gap-4 w-80">
                <div className="bg-orange-500 p-3 rounded-md">
                  <MdOutlinePlace color="white" />
                </div>
                <div>
                  <p className="font-bold">Address</p>
                  <p className="text-sm text-gray-500">
                    Jl Hankam, Cisarua, Kab Bogor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
