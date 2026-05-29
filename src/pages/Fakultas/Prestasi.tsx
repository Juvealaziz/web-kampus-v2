import React from "react";

import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Prestasi() {
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const perPage = 3;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const currentData = pages.slice(start, end);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/UKM")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "prestasi",
        );

        setPages(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //lomba
  const [lomba, setLomba] = useState(1);
  const [lom, setLom] = useState<any[]>([]);
  const perLom = 5;

  const mulai = (lomba - 1) * perLom;

  const selesai = mulai + perLom;

  const currentLom = lom.slice(mulai, selesai);

  //lomba

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/UKM")
      .then((res) => {
        const filtered = res.data.filter((item: any) => item.tipe === "lomba");

        setLom(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
            <a href="">Prestasi</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl">Prestasi</h1>

          <div className="bg-gray-100 min-h-screen">
            {/* HERO SECTION */}
            <div className="container mx-auto px-4 py-10">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Banner */}
                {pages.slice(0, 1).map((item) => (
                  <div
                    className="h-[500px] rounded-3xl bg-cover bg-center shadow-2xl"
                    style={{
                      backgroundImage: `url(http://127.0.0.1:8000/uploads/${item.gambar})`,
                    }}
                  ></div>
                ))}

                {/* Berita Kecil */}
                <div className="flex flex-col gap-6">
                  {/* Card atas */}
                  <div className="bg-white rounded-3xl shadow-xl p-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {pages.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="relative h-[220px] rounded-2xl overflow-hidden bg-cover bg-center group"
                          style={{
                            backgroundImage: `url(http://127.0.0.1:8000/uploads/${item.gambar})`,
                          }}
                        >
                          <a
                            href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>

                            <div className="absolute bottom-0 text-white p-4">
                              <h5 className="font-bold text-lg">Berita</h5>

                              <p className="text-sm font-medium">
                                {item.judul}
                              </p>

                              <p className="text-xs text-gray-200">
                                {item.tanggal}
                              </p>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card bawah */}
                  <div className="bg-white rounded-3xl shadow-xl p-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {pages.slice(2, 4).map((item) => (
                        <div
                          key={item.id}
                          className="relative h-[220px] rounded-2xl overflow-hidden bg-cover bg-center group"
                          style={{
                            backgroundImage: `url(http://127.0.0.1:8000/uploads/${item.gambar})`,
                          }}
                        >
                          <a
                            href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>

                            <div className="absolute bottom-0 text-white p-4">
                              <h5 className="font-bold text-lg">Berita</h5>

                              <p className="text-sm font-medium">
                                {item.judul}
                              </p>

                              <p className="text-xs text-gray-200">
                                {item.tanggal}
                              </p>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KONTEN */}
            <div className="container mx-auto px-4 pb-10">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Artikel */}
                <div className="lg:col-span-8">
                  {currentData.map((item) => (
                    <article
                      key={item.id}
                      className="bg-white rounded-3xl shadow-lg p-5 mb-6"
                    >
                      <div className="grid md:grid-cols-12 gap-5 items-center">
                        {/* Gambar */}
                        <div className="md:col-span-5">
                          <img
                            src={`http://127.0.0.1:8000/uploads/${item.gambar}`}
                            alt={item.judul}
                            className="w-full h-[220px] object-cover rounded-2xl"
                          />
                        </div>

                        {/* Konten */}
                        <div className="md:col-span-7">
                          <small className="uppercase text-blue-600 font-semibold">
                            {item.kategori}
                          </small>

                          <h2 className="text-2xl font-bold mt-2 mb-2">
                            {item.judul}
                          </h2>

                          <small className="text-gray-500 block mb-3">
                            {item.tanggal}
                          </small>

                          <p className="text-gray-700 leading-7"></p>

                          <a
                            href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                          >
                            Baca Selengkapnya
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}

                  {/* Pagination */}
                  {pages.length > 0 && (
                    <div className="flex justify-center gap-3 mt-10">
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

                {/* Sidebar */}
                <div className="lg:col-span-4">
                  <div className="sticky top-5">
                    <div className="bg-white rounded-3xl shadow-xl p-6">
                      <h2 className="text-2xl font-bold mb-6 text-blue-700">
                        Jadwal Lomba Terdekat
                      </h2>

                      <ol className="space-y-5 list-decimal list-inside">
                        {currentLom.map((item) => (
                          <li className="text-gray-700 leading-7 ">
                            <a
                              href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {item.judul}
                            </a>
                          </li>
                        ))}
                      </ol>
                      {/* PAGINATION */}
                      {lom.length > 0 && (
                        <div className="flex justify-center gap-3 mt-10">
                          <button
                            disabled={lomba === 1}
                            onClick={() => setLomba(lomba - 1)}
                            className="px-4 py-2 rounded-xl bg-gray-200"
                          >
                            Prev
                          </button>

                          <span className="px-4 py-2">{lomba}</span>

                          <button
                            disabled={selesai >= lom.length}
                            onClick={() => setLomba(lomba + 1)}
                            className="px-4 py-2 rounded-xl bg-gray-200"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
