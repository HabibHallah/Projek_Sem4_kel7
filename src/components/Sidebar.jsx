import { FaRocket } from "react-icons/fa";
import ListMenu from "./ListMenu";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-br from-[#E56AB3] to-[#FFC3CB] text-[#334155] flex flex-col justify-between rounded-r-3xl py-6 px-6">
      <div>
        <h1 className="text-3xl font-extrabold mb-12">Beautiva</h1>
        <ListMenu />
      </div>
      <div className="bg-white text-[#E56AB3] rounded-2xl p-4 text-center shadow-md">
        <FaRocket className="text-3xl mx-auto mb-2" />
        <p className="mb-2 font-medium">Upgrade Sekarang</p>
        <button className="bg-[#E56AB3] text-white px-4 py-2 rounded-xl hover:bg-[#D42E70] transition">
          Upgrade now
        </button>
      </div>
    </aside>
  );
}
