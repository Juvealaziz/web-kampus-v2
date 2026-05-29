import Navb from "./Navs";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [openBeranda, setOpenBeranda] = useState(false);
  const [openProfil, setOpenProfil] = useState(false);
  const [openAka, setOpenAka] = useState(false);
  const [openFak, setOpenFak] = useState(false);
  const [openMah, setOpenMah] = useState(false);
  const [openLay, setOpenLay] = useState(false);
  const [openApk1, setOpenApk1] = useState(false);
  const [openApk2, setOpenApk2] = useState(false);
  const [openBiro, setOpenBiro] = useState(false);
  const [openBah, setOpenBah] = useState(false);

  //fungsion
  const [pages, setPages] = useState<any[]>([]);
  const [apk, setApk] = useState<any[]>([]);
  const [kode, setKode] = useState<any[]>([]);
  const [fac, setFac] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Data_Unduh")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "survei" && item.status === "aktif",
        );

        setPages(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fungsion apk
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Data_Unduh")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "aplikasi",
        );

        setApk(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fungsion kode_etik
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Data_Unduh")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "kode_etik" && item.status === "aktif",
        );

        setKode(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //fakultas
  //Tampil data
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/fakultas").then((res) => {
      setFac(res.data);
    });
  }, []);

  return (
    //Nav
    <>
      <nav className="absolute  w-full z-50 bg-blue-900/70 backdrop-blur-sm text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 items-center  flex">
          <a href="/Beranda" className="flex items-center gap-3">
            <img src="/logoo.png" className="h-16" alt="Logo" />
            <div className="self-center  whitespace-nowrap text-white md:text-2xl">
              <h6 className="font-semibold">universitas</h6>
              <p className="text-lg">San Pedro Kupang</p>
            </div>
          </a>

          {/* BUTTON MOBILE */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-3xl ml-auto"
          >
            ☰
          </button>
          <ul className="hidden lg:flex gap-6 mx-auto">
            <li className="relative list-none group">
              <button className="flex items-center gap-1 text-xl">
                <a href="/Beranda">Beranda</a>
                <span>⌄</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md w-48 z-50 rounded mt-0 text-gray-800">
                <a
                  href="/Sambutan-Rektor"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Sambutan Rektor
                </a>
                <a href="/Visi" className="block px-4 py-2 hover:bg-gray-100">
                  Visi, Misi, dan Tujuan
                </a>
                <a
                  href="/StrukturOrganisasi"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Struktur Organisasi
                </a>
                <div className="relative group/profil">
                  <button className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                    Profil
                    <span>v</span>
                  </button>

                  {/* Submenu */}
                  <div className="absolute top-0 left-full hidden group-hover/profil:block bg-white shadow-xl w-64 rounded-md">
                    <a
                      href="/PimpinanUniversitas"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Pimpinan Universitas
                    </a>

                    <a
                      href="/PimpinanSenat"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Pimpinan Senat
                    </a>

                    <a
                      href="/PimpinanFakultas"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Pimpinan Fakultas
                    </a>
                    <a
                      href="/Dosen"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Data Dosen
                    </a>
                  </div>
                </div>

                <a
                  href="/Sejarah"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Sejarah
                </a>
                {kode.map((item) => (
                  <a
                    key={item.id}
                    href={`http://127.0.0.1:8000/storage/${item.file_path}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    download
                  >
                    Kode Etik Dosen dan Mahasiswa
                  </a>
                ))}
                <a href="/Kontak" className="block px-4 py-2 hover:bg-gray-100">
                  Hubungi Kami
                </a>
                <a href="/Berita" className="block px-4 py-2 hover:bg-gray-100">
                  Berita
                </a>
              </div>
            </li>
            <li className="relative list-none group">
              <button className="flex items-center gap-1 text-xl">
                Akademik
                <span>⌄</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md w-48 z-50 rounded mt-0 text-gray-800">
                <div className="relative group/fakultas">
                  <button className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                    Fakultas
                    <span>v</span>
                  </button>

                  {/* Submenu */}
                  <div className="absolute top-0 left-full hidden group-hover/fakultas:block bg-white shadow-xl w-64 rounded-md">
                    {fac.map((item) => (
                      <Link
                        key={item.id}
                        to={`/Fakultas/${item.id}/${item.nama.replace(/\s+/g, "-")}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {item.nama}
                      </Link>
                    ))}
                  </div>
                </div>
                <a
                  href="/Biaya-Studi"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Biaya Studi
                </a>
                <a
                  href="/Formulir"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Formulir
                </a>
                <a
                  href="/Sistem-Pembelajaran"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Sistem Pembelajaran
                </a>

                <a
                  href="/Kalender-Akademik"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Kalender Akademik
                </a>
              </div>
            </li>
            <li className="relative list-none group">
              <button className="flex items-center gap-1 text-xl">
                Kemahasiswaan
                <span>⌄</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md w-48 z-50 rounded mt-0 text-gray-800">
                <a
                  href="/Unit-Kegiatan-Mahasiswa"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Unit Kegiatan Mahasiswa
                </a>
                <a
                  href="/Prestasi"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Prestasi Mahasiswa
                </a>
                <a
                  href="/Fasilitas"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Fasilitas
                </a>
                <a
                  href="/Beasiswa"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Beasiswa
                </a>
                <a
                  href="/Pengumuman"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Pengumuman
                </a>
              </div>
            </li>

            <li className="relative list-none group">
              <button className="flex items-center gap-1 text-xl">
                Layanan
                <span>⌄</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md w-48 z-50 rounded mt-0 text-gray-800">
                <a href="/Sakip" className="block px-4 py-2 hover:bg-gray-100">
                  Sakip
                </a>
                {pages.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Survei Kepuasan
                  </a>
                ))}
                <div className="relative group/app">
                  <button className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                    Aplikasi
                    <span>v</span>
                  </button>

                  {/* Submenu */}

                  <div className="absolute top-0 left-full hidden group-hover/app:block bg-white shadow-xl w-64 rounded-md">
                    {apk.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {item.judul}
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href="/Pengaduan"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Pengaduan
                </a>
              </div>
            </li>
            <li className="relative list-none group">
              <button className="flex items-center gap-1 text-xl">
                Biro
                <span>⌄</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md w-48 z-50 rounded mt-0 text-gray-800">
                <a
                  href="/Biro-Akademik"
                  className="block px-4 py-2 hover:bg-gray-100 flex gap-2"
                >
                  Akademik dan Kemahasiswaan
                </a>
                <a
                  href="/Biro-Keuangan"
                  className="block px-4 py-2 hover:bg-gray-100 flex gap-2"
                >
                  Keuangan dan Umum
                </a>
              </div>
            </li>

            <li className="relative list-none group">
              <button className="flex items-center gap-1 text-xl">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.GDPjwkJEId9ArUJJKFsdyQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt=""
                  className="h-[20px] w-[40px]"
                />
                Bahasa
                <span>⌄</span>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md w-48 z-50 rounded mt-0 text-gray-800">
                <a
                  href=""
                  className="block px-4 py-2 hover:bg-gray-100 flex gap-2"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/555/555526.png"
                    alt=""
                    className="h-[30px] w-[40px] "
                  />{" "}
                  En
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        ></div>
      )}

      {/* SIDEBAR MOBILE */}

      <div
        className={`flex flex-col justify-between fixed top-0 left-0 h-full w-[280px] bg-blue-950 z-50 transform transition-transform duration-300 lg:hidden overflow-y-auto
      ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="gap-4">
          <div className="flex justify-between items-center p-5 border-b border-white/20">
            <a href="/Beranda" className="flex items-center gap-3">
              <img src="/logoo.png" className="h-16" alt="Logo" />
              <div className="self-center  whitespace-nowrap text-white ">
                <h6 className="font-semibold">universitas</h6>
                <p className="text-[14px]">San Pedro Kupang</p>
              </div>
            </a>

            <button
              onClick={() => setOpen(false)}
              className="text-white text-3xl"
            >
              ×
            </button>
          </div>
          <div className="flex flex-col text-white p-4">
            {/* BERANDA */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setOpenBeranda(!openBeranda)}
                className="w-full flex items-center justify-between py-3"
              >
                <span>Beranda</span>

                <span
                  className={`transition duration-300 ${
                    openBeranda ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* DROPDOWN */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openBeranda ? "max-h-96 pb-3" : "max-h-0"
                }`}
              >
                <div className="flex flex-col ml-4 text-sm text-gray-300">
                  <a
                    href="/Sambutan-Rektor"
                    className="py-2 hover:text-yellow-300"
                  >
                    Sambutan Rektor
                  </a>

                  <a href="/Visi" className="py-2 hover:text-yellow-300">
                    Visi, Misi, dan Tujuan
                  </a>
                  <a
                    href="/StrukturOrganisasi"
                    className="py-2 border-b border-white/10"
                  >
                    Struktur Organisasi
                  </a>
                  {/* Profil */}

                  <div>
                    <button
                      onClick={() => setOpenProfil(!openProfil)}
                      className="w-full flex items-center justify-between py-2 hover:text-yellow-300"
                    >
                      <span>Profil</span>

                      <span
                        className={`transition duration-300 ${
                          openProfil ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* ISI SUBMENU */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openProfil ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <div className="flex flex-col ml-4 text-gray-400">
                        <a
                          href="/PimpinanUniversitas"
                          className="py-2 border-b border-white/10"
                        >
                          Pimpinan Universitas
                        </a>

                        <a
                          href="/PimpinanSenat"
                          className="py-2 border-b border-white/10"
                        >
                          Pimpinan Senat
                        </a>

                        <a
                          href="PimpinanFakultas"
                          className="py-2 border-b border-white/10"
                        >
                          Pimpinan Fakultas
                        </a>
                        <a
                          href="PimpinanFakultas"
                          className="py-2 border-b border-white/10"
                        >
                          Data Dosen
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* ------------- */}

                  <a href="/Sejarah" className="py-2 hover:text-yellow-300">
                    Sejarah
                  </a>
                  {kode.map((item) => (
                    <a
                      key={item.id}
                      href={`http://127.0.0.1:8000/storage/${item.file_path}`}
                      className="py-2 hover:text-yellow-300"
                    >
                      Kode Etik Dosen/Mahasiswa
                    </a>
                  ))}

                  <a href="/Kontak" className="py-2 hover:text-yellow-300">
                    Hubungi Kami
                  </a>

                  <a href="/Berita" className="py-2 hover:text-yellow-300">
                    Berita
                  </a>
                </div>
              </div>
            </div>
            {/* ============== */}

            {/* Akademik */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setOpenAka(!openAka)}
                className="w-full flex items-center justify-between py-3"
              >
                <span>Akademik</span>

                <span
                  className={`transition duration-300 ${
                    openAka ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* DROPDOWN */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openAka ? "max-h-96 pb-3" : "max-h-0"
                }`}
              >
                <div className="flex flex-col ml-4 text-sm text-gray-300">
                  {/* FAkultas */}

                  <div>
                    <button
                      onClick={() => setOpenFak(!openFak)}
                      className="w-full flex items-center justify-between py-2 hover:text-yellow-300"
                    >
                      <span>Fakultas</span>

                      <span
                        className={`transition duration-300 ${
                          openFak ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* ISI SUBMENU */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFak ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <div className="flex flex-col ml-4 text-gray-400">
                        {fac.map((item) => (
                          <Link
                            key={item.id}
                            to={`/Fakultas/${item.id}/${item.nama.replace(/\s+/g, "-")}`}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {item.nama}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ------------- */}

                  <a href="/Biaya-Studi" className="py-2 hover:text-yellow-300">
                    Biaya Studi
                  </a>
                  <a href="/Formulir" className="py-2 hover:text-yellow-300">
                    Formulir
                  </a>
                  <a
                    href="/Sistem-Pembelajaran"
                    className="py-2 hover:text-yellow-300"
                  >
                    Sistem Pembelajaran
                  </a>

                  <a
                    href="/Kalender-Akademik"
                    className="py-2 hover:text-yellow-300"
                  >
                    Kalender Akademik
                  </a>
                </div>
              </div>
            </div>
            {/* =========== */}

            {/* ============== */}

            {/* Kemahasiswaan */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setOpenMah(!openMah)}
                className="w-full flex items-center justify-between py-3"
              >
                <span>Kemahasiswaan</span>

                <span
                  className={`transition duration-300 ${
                    openMah ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* DROPDOWN */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openMah ? "max-h-96 pb-3" : "max-h-0"
                }`}
              >
                <div className="flex flex-col ml-4 text-sm text-gray-300">
                  <a
                    href="/Unit-Kegiatan-Mahasiswa"
                    className="py-2 hover:text-yellow-300"
                  >
                    Unit Kegiatan Mahasiswa
                  </a>
                  <a href="/Prestasi" className="py-2 hover:text-yellow-300">
                    Prestasi Mahasiswa
                  </a>
                  <a href="/Fasilitas" className="py-2 hover:text-yellow-300">
                    Fasilitas
                  </a>
                  <a href="/Beasiswa" className="py-2 hover:text-yellow-300">
                    Beasiswa
                  </a>
                  <a href="/Pengumuman" className="py-2 hover:text-yellow-300">
                    Pengumuman
                  </a>

                  {/* ------------- */}
                </div>
              </div>
            </div>
            {/* =========== */}

            {/* Layanan*/}
            <div className="border-b border-white/10">
              <button
                onClick={() => setOpenLay(!openLay)}
                className="w-full flex items-center justify-between py-3"
              >
                <span>Layanan</span>

                <span
                  className={`transition duration-300 ${
                    openLay ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* DROPDOWN */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openLay ? "max-h-96 pb-3" : "max-h-0"
                }`}
              >
                <div className="flex flex-col ml-4 text-sm text-gray-300">
                  <a href="/Sakip" className="py-2 hover:text-yellow-300">
                    Sakip
                  </a>
                  {pages.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Survei Kepuasan
                    </a>
                  ))}

                  {/* APk */}

                  <div>
                    <button
                      onClick={() => setOpenApk2(!openApk2)}
                      className="w-full flex items-center justify-between py-2 hover:text-yellow-300"
                    >
                      <span>Aplikasi</span>

                      <span
                        className={`transition duration-300 ${
                          openApk2 ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* ISI SUBMENU */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openApk2 ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <div className="flex flex-col ml-4 text-gray-400">
                        {apk.map((item) => (
                          <a
                            key={item.id}
                            href={item.url}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {item.judul}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ------------- */}
                  <a href="/Pengaduan" className="py-2 hover:text-yellow-300">
                    Pengaduan
                  </a>
                </div>
              </div>
            </div>
            {/* =========== */}

            {/* Biro*/}
            <div className="border-b border-white/10">
              <button
                onClick={() => setOpenBiro(!openBiro)}
                className="flex w-full justify-between py-3 items-center"
              >
                <span>Biro</span>
                <span
                  className={`transition duration-300 ${openBiro ? "rotate-180" : ""}`}
                >
                  {" "}
                  ▼
                </span>
              </button>
              {/* DROPDOWN */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openBiro ? "max-h-96 pb-3" : "max-h-0"
                }`}
              >
                <div className="flex flex-col ml-4 text-gray-400">
                  <a
                    href="/Biro-Akademik"
                    className="py-2 hover:text-yellow-300"
                  >
                    Akademik dan Kemahasiswaan
                  </a>
                  <a
                    href="/Biro-Keuangan"
                    className="py-2 hover:text-yellow-300"
                  >
                    Keuangan dan Umum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-white p-4">
          {/* =========== */}

          {/* Biro*/}
          <div className="border-b border-white/10 ">
            <button
              onClick={() => setOpenBah(!openBah)}
              className="flex w-full justify-between py-3 items-center"
            >
              <div className="flex gap-2">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.GDPjwkJEId9ArUJJKFsdyQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt=""
                  className="h-[20px] w-[40px]"
                />
                Bahasa
              </div>

              <span
                className={`transition duration-300 ${openBah ? "rotate-180" : ""}`}
              >
                {" "}
                ▼
              </span>
            </button>
            {/* DROPDOWN */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openBah ? "max-h-96 pb-3" : "max-h-0"
              }`}
            >
              <div className="flex flex-col ml-4 text-gray-400">
                <a href="" className="py-2 hover:text-yellow-300 flex gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/555/555526.png"
                    alt=""
                    className="h-[30px] w-[40px] "
                  />{" "}
                  En
                </a>
              </div>
            </div>
          </div>

          {/* =========== */}
        </div>
      </div>
    </>
  );
}
