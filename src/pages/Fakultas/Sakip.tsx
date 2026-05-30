import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sakip() {
  const [pages, setPages] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const filteredData = pages.filter(
    (item: any) =>
      item.judul?.toLowerCase().includes(search.toLowerCase()) ||
      item.created_at?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/Data_Unduh`)
      .then((res) => {
        const filtered = res.data.filter((item: any) => item.tipe === "sakip");
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
            <a href="">Sakip</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl mb-12">Sakip</h1>

          {/* KONTEN */}
          <div className="container mx-auto px-4 pb-10">
            {/* Artikel */}

            <article className="bg-white rounded-3xl shadow-lg p-5 mb-6">
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
              <table className="w-full border border-gray-300 text-left mt-2 mb-2">
                <tbody>
                  <tr className="border-b bg-gray-400">
                    <td className="p-3 font-semibold">NO</td>

                    <td className="p-3 font-semibold">Uraian</td>
                    <td className="p-3 font-semibold ml-auto">
                      Tanggal Dibuat
                    </td>
                    <td className="p-3 font-semibold ml-auto">Unduh</td>
                  </tr>
                  {filteredData.map((item, index) => (
                    <tr className="border-b " key={item.id}>
                      <td className="p-3 text-gray-600 font-bold">
                        {index + 1}
                      </td>
                      <td className="p-3 font-semibold">{item.judul}</td>
                      <td className="p-3 font-semibold">
                        {item.created_at.split("T")[0]}
                      </td>
                      <td className="p-3 text-blue-600 font-bold">
                        <ul className="space-y-2">
                          <li>
                            <a
                              href={`http://127.0.0.1:8000/storage/${item.file_path}`}
                              className="text-blue-400"
                              download
                            >
                              Unduh
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
