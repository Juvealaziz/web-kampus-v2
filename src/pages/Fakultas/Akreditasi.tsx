import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Akreditasi() {
  const [pages, setPages] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const filteredData = pages.filter(
    (item: any) =>
      item.judul?.toLowerCase().includes(search.toLowerCase()) ||
      item.created_at?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Data_Unduh")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "akreditasi",
        );
        setPages(filtered);
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
            <a href="">Akreditasi</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl mb-12">Akreditasi</h1>

          {/* KONTEN */}
          <div className="container mx-auto px-4 pb-10">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-3">
                <div className="sticky top-5">
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    <img
                      src="https://assets.nsd.co.id/images/kampus/logo/u75wV5Sw-286x400-1.jpeg"
                      alt=""
                      className="w-full rounded-2xl shadow-xl"
                    />

                    <ol className="space-y-5 list-decimal list-inside"></ol>
                  </div>
                </div>
              </div>

              {/* Artikel */}
              <div className="lg:col-span-9">
                <article className="bg-white rounded-3xl shadow-lg p-5 mb-6">
                  <div className="">
                    <div className="flex justify-end gap-2">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="border-2"
                        placeholder="Cari Data"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <h1 className="text-xl font-bold">
                      Sertifikat Akreditasi Perguruan Tinggi Universitas San
                      Pedro
                    </h1>
                    <table className="w-full border border-gray-300 text-left mt-2 mb-2">
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-semibold">NO</td>

                          <td className="p-3 font-semibold">Nama</td>
                          <td className="p-3 font-semibold">
                            Download Sertifikat Akreditasi
                          </td>
                          <td className="p-3 font-semibold">Tanggal dibuat</td>
                        </tr>
                        {filteredData.map((item, index) => (
                          <tr className="border-b">
                            <td className="p-3 text-gray-600 font-bold">
                              {index + 1}
                            </td>
                            <td className="p-3 font-semibold">{item.judul}</td>

                            <td className="p-3 text-blue-600 font-bold">
                              <a
                                href={`http://127.0.0.1:8000/storage/${item.file_path}`}
                                className="text-blue-400"
                                download
                              >
                                unduh sertifikat
                              </a>
                            </td>
                            <td className="p-3 font-semibold">
                              {item.created_at.split("T")[0]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
