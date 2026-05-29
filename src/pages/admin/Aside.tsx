import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInfo,
  FaInstagram,
  FaNewspaper,
  FaSignOutAlt,
  FaYoutube,
  FaUser,
} from "react-icons/fa";
export default function Aside() {
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/Admin-Login" replace />;
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Admin-Login");
  };

  return (
    <>
      {/* Sidebar */}
      <div className="grid md:grid-cols-12 bg-transparent gap-2 ">
        <div className="  z-50     fixed flex flex-col">
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className={`
    w-20 md:w-[100px] text-right text-2xl mt-2 px-4 py-1 rounded-lg shadow-md
    bg-gradient-to-r from-blue-900 to-blue-700 text-white
    transform transition-all duration-300 ease-in-out
    ${!openSidebar ? "md:-translate-x-12 -translate-x-5 opacity-100" : "-translate-x-20 opacity-0"}
  `}
          >
            ⇒
          </button>
        </div>
        <aside
          className={`
      w-[250px]
      fixed
      shadow-2xl
      border-b
      border-white/10
      rounded-lg
      h-full
      bg-blue-900
      flex
      z-50
      flex-col
      justify-between
      transition-all
      duration-500
      overflow-hidden
      ${openSidebar ? "translate-x-0" : "-translate-x-full"}
    `}
        >
          <div className="gap-6 flex flex-col">
            <div className="flex justify-between  p-6 shadow-lg border-b border-blue/10 text-white ">
              <a href="/admin-dashboard" className="flex items-center gap-3">
                <img src="/logoo.png" className="h-16" alt="Logo" />
                <div className="self-center  whitespace-nowrap text-white ">
                  <h6 className="font-semibold">universitas</h6>
                  <p className="text-[14px]">San Pedro Kupang</p>
                </div>
              </a>
              <span
                onClick={() => setOpenSidebar(!openSidebar)}
                className="text-white text-2xl cursor-pointer"
              >
                {openSidebar ? "✕" : "⇒"}
              </span>
            </div>
            {openSidebar && (
              <div className="flex flex-col text-white ">
                <span className="font-semibold flex gap-2 text-sm  text-gray-300 mb-4 px-4">
                  <FaNewspaper className="w-6 h-6 mr-2 w-4" />
                  Manajemen Konten
                </span>
                <a
                  href="/admin-dashboard"
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 text-sm"
                >
                  Dashboard
                </a>

                <button
                  onClick={() => setOpen(!open)}
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 flex justify-between text-sm"
                >
                  Halaman{" "}
                  <span
                    className={`transition duration-300 ${open ? "rotate-180" : ""}`}
                  >
                    {" "}
                    ▼
                  </span>
                </button>
                <div
                  className={`
            transition-all
            duration-300
            overflow-y-auto
            overflow-x-hidden
            ${open ? "max-h-40" : "max-h-0"}
          `}
                >
                  <div className="flex flex-col ml-4 text-gray-400 text-sm">
                    <a
                      href="/admin-beranda"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Beranda
                    </a>
                    <a
                      href="/admin-sambutan"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Sambutan, Visi, Struktur, Sejarah
                    </a>
                    <a
                      href="/Admin-Kode-Etik"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Kode Etik
                    </a>

                    <a
                      href="/Admin-Profil"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Profil
                    </a>
                    <a
                      href="/admin-biaya"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Biaya, Formulir, Sistem Pembelajaran, Kalender
                    </a>
                    <a
                      href="/admin-Fakultas"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Fakultas, Prodi
                    </a>
                    <a
                      href="/admin-fasilitas"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Fasilitas, Beasiswa
                    </a>
                    <a
                      href="/Admin-Sakip"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Sakip, survei, aplikasi
                    </a>
                    <a
                      href="/Admin-Akreditasi"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Akreditasi
                    </a>
                    <a
                      href="/admin-Biro-Akademik"
                      className="hover:bg-blue-600 border-b border-white/10 hover:text-yellow-300"
                    >
                      Biro Akademik, Biro Keuangan
                    </a>
                  </div>
                </div>
                <a
                  href="/Admin-UKM"
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 text-sm"
                >
                  Unit Kegiatan Mahasiswa
                </a>
                <a
                  href="/Admin-Berita"
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 text-sm"
                >
                  Berita
                </a>
                <a
                  href="/Admin-Pengumuman"
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 text-sm"
                >
                  Pengumuman
                </a>
                <a
                  href="/Admin-Prestasi"
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 text-sm"
                >
                  Prestasi
                </a>
                <a
                  href="/Admin-Lomba"
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 text-sm"
                >
                  Lomba
                </a>
              </div>
            )}

            {openSidebar && (
              <div className="flex flex-col text-white ">
                <span className="font-semibold flex gap-2  text-gray-300 mb-4 px-4 text-sm">
                  <FaInfo className="w-6 h-6 mr-2 w-2" />
                  Manajemen Informasi
                </span>
                <a
                  href="/Admin-Hubungi"
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 text-sm"
                >
                  Univ, Kontak, Sosmed
                </a>
                <a
                  href="/Admin-Pengaduan"
                  className="py-2 hover:text-yellow-300 border-b border-white/10 hover:bg-blue-600 px-2 text-sm"
                >
                  Pengaduan
                </a>
              </div>
            )}
          </div>

          {openSidebar && (
            <div className="flex flex-col text-white">
              <a
                onClick={handleLogout}
                className="py-2 hover:text-yellow-300 border-t border-white/20 hover:bg-red-600 px-2  flex justify-between p-2 text-sm"
              >
                Keluar <FaSignOutAlt className="w-6 h-6 mr-2 text-sm" />
              </a>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
