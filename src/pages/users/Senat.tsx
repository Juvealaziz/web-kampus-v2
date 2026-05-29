import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function Senat() {
  const [pages, setPages] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  //batasi text
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  const getPreview = (html: string, limit = 200) => {
    const text = html.replace(/<[^>]*>/g, ""); // hapus tag HTML
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  //-----
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/profil").then((res) => {
      setPages(res.data);
    });
  }, []);

  const keyword = search.toLowerCase();

  const filtered = pages.filter((item) => {
    const peran = JSON.parse(item.peran || "[]");

    const matchPeran = peran.includes("Pimpinan Senat");

    const matchSearch =
      item.nama?.toLowerCase().includes(keyword) ||
      item.nip?.toLowerCase().includes(keyword);

    return matchPeran && matchSearch;
  });
  const currentData = filtered.slice(start, end);
  return (
    <div className="">
      <Navhead />
      <Navbar />
      <Slider />
      <div className="container mx-auto">
        <ul className="flex gap-6 mt-4">
          <li>
            <a href="/beranda">Beranda</a>
          </li>
          <p>➡</p>
          <li>
            <a href="">Pimpinan Senat</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8">
          <h1 className="font-semibold text-2xl">Profil Pimpinan</h1>
          <div className="  mb-4">
            <h1 className="text-lg font-semibold text-center">Cari Data</h1>
            <div className=" mx-auto  flex flex-wrap w-[50%] bg-gray-200 py-1 px-1 border border-black/100 rounded-xl hover:border-green/100 hover:bg-gray-100">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id=""
                className="outline-none bg-transparent text-black px-2 md:w-[95%] w-[85%]"
              />

              <FaSearch className="text-black  hover:scale-410 duration-300 text-lg" />
            </div>
          </div>

          {currentData.map((item) => (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-4">
              {/* FOTO */}
              <div className="Profil md:col-span-4 text-center bg-gray-200 w-full p-4 rounded-2xl">
                <img
                  src={`http://127.0.0.1:8000/uploads/${item.gambar}`}
                  alt=""
                  className="w-full max-w-[300px] h-[300px] object-cover rounded-xl mx-auto"
                />

                <h1 className="mt-4 text-xl font-semibold"> {item.nama}</h1>
              </div>

              {/* BIODATA */}
              <div className="Profil md:col-span-8 bg-gray-100 p-6 rounded-2xl ">
                <h1 className="font-semibold text-lg mb-4">Biodata</h1>
                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-6">
                    <div className="space-y-4 md:col-span-5">
                      <div className="flex">
                        <span className="w-32 font-semibold">Nama Lengkap</span>

                        <span>: {item.nama}</span>
                      </div>

                      <div className="flex">
                        <span className="w-32 font-semibold">NIP.</span>

                        <span>: {item.nip}</span>
                      </div>

                      <div className="flex">
                        <span className="w-32 font-semibold">
                          Jabatan Fungsional
                        </span>

                        <span>: {item.jabatan_f}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-semibold">
                          Jabatan Struktural
                        </span>

                        <span>: {item.jabatan_s}</span>
                      </div>

                      <div className="flex">
                        <span className="w-32 font-semibold">
                          Pendidikan Tertinggi
                        </span>

                        <span>: {item.pendidikan}</span>
                      </div>

                      <div className="flex">
                        <span className="w-32 font-semibold">E-mail</span>

                        <span>: {item.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-6">
                    <div className="relative md:col-span-3 p-2  bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                      {/* ATAS GULUNGAN PUTIH */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[104%] h-6 bg-gradient-to-b from-slate-300 to-slate-200 rounded-full shadow-lg z-30">
                        {/* UJUNG KIRI */}
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-300 border-[3px] border-slate-400"></div>

                        {/* UJUNG KANAN */}
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-300 border-[3px] border-slate-400"></div>
                      </div>
                      <h1 className="font-semibold text-lg mt-6">
                        Biodata Lainnya
                      </h1>
                      <div className="mt-2">
                        <span>
                          <div>
                            <div
                              className="
      leading-8 text-justify prose
      [&_table]:w-full
      [&_table]:border
      [&_table]:border-collapse
      [&_th]:border
      [&_th]:p-2
      [&_th]:bg-gray-200
      [&_td]:border
      [&_td]:p-2
    "
                              dangerouslySetInnerHTML={{
                                __html:
                                  openId === item.id
                                    ? item.desk
                                    : getPreview(item.desk, 200),
                              }}
                            />

                            <button
                              onClick={() => toggle(item.id)}
                              className="text-blue-500 mt-2"
                            >
                              {openId === item.id ? "Tutup" : "Read more"}
                            </button>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {pages.length > 0 && (
            <div className="flex justify-center gap-3 mt-10 mb-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded-xl bg-gray-200"
              >
                Prev
              </button>

              <span className="px-4 py-2">{page}</span>

              <button
                disabled={end >= pages.length}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded-xl bg-gray-200"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
