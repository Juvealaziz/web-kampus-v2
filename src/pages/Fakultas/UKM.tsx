import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UKM() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/UKM`).then((res) => {
      setData(res.data);
    });
  }, []);

  const filterData =
    kategoriAktif === "Semua"
      ? data.filter((item: any) => item.tipe === "ukm")
      : data.filter(
          (item: any) => item.tipe === "ukm" && item.kategori === kategoriAktif,
        );

  const kategoriList = [
    ...new Set(filterData.map((item: any) => item.kategori)),
  ];

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
            <a href="">Unit-Kegiatan-Mahasiswa</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl  text-center md:text-left">
            Unit Kegiatan Mahasiswa
          </h1>
          <hr className="md:h-[10px] h-[10px] ml-4 mr-4 md:ml-0 md:mr-0 my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="min-h-screen bg-gray-100 py-10">
            {/* MENU KATEGORI */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={() => setKategoriAktif("Semua")}
                className={`px-6 py-2 rounded-full transition duration-300 font-medium

    ${
      kategoriAktif === "Semua"
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-white text-gray-700 hover:bg-blue-100"
    }
  `}
              >
                Semua
              </button>

              {kategoriList.map((kategori: any, index) => (
                <button
                  key={index}
                  onClick={() => setKategoriAktif(kategori)}
                  className={`px-6 py-2 rounded-full transition duration-300 font-medium

      ${
        kategoriAktif === kategori
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-white text-gray-700 hover:bg-blue-100"
      }
    `}
                >
                  {kategori}
                </button>
              ))}
            </div>

            {/* GALERI */}
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filterData.map((item: any, index) => (
                  <article key={item.id}>
                    <div
                      className="relative h-[350px] rounded-2xl overflow-hidden shadow-xl group bg-cover bg-center"
                      style={{
                        backgroundImage: `url(http://127.0.0.1:8000/uploads/${item.gambar})`,
                      }}
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>

                      {/* Konten */}
                      <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
                        <h5 className="text-lg font-semibold text-center mb-2">
                          {item.judul}
                        </h5>

                        <p className="text-sm text-gray-200">
                          {openId === item.id
                            ? item.desk
                            : item.desk.slice(0, 110)}

                          {item.desk.length > 110 && (
                            <span
                              onClick={() =>
                                setOpenId(openId === item.id ? null : item.id)
                              }
                              className="text-blue-300 cursor-pointer ml-1"
                            >
                              {openId === item.id ? "less" : "...more"}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
