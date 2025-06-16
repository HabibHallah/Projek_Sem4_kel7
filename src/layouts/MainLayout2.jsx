import { Outlet } from "react-router-dom";
import ListMenu2 from "../components/ListMenu2.jsx";
import Footer from "../components/Footer.jsx";

export default function MainLayout2() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* HEADER - full width */}
      <div className="w-full">
        <ListMenu2 />
      </div>

      {/* Konten utama tengah */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
