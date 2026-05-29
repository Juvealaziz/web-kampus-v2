import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Pengumuman() {
  const [pages, setPages] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  const perPage = 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const currentData = pages.slice(start, end);
  //lomba
  const [lomba, setLomba] = useState(1);
  const [lom, setLom] = useState<any[]>([]);
  const perLom = 5;

  const mulai = (lomba - 1) * perLom;

  const selesai = mulai + perLom;

  const currentLom = lom.slice(mulai, selesai);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/UKM")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "pengumuman",
        );

        setPages(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <a href="">Pengumuman</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <div className="grid md:grid-cols-12">
            <div className="md:col-span-9">
              <div
                className="
            bg-white 
            w-full 
            md:w-[80%] 
            mx-auto 
            rounded-3xl 
            shadow-2xl
            border-t-[20px] 
           
            relative 
            p-8
          "
              >
                <div className="space-y-10">
                  <h2 className="text-2xl font-bold mb-6 text-blue-700">
                    Pengumuman
                  </h2>
                  {currentData.map((item) => (
                    <article
                      key={item.id}
                      className="
                  border-b 
                  border-gray-200 
                  pb-8
                  hover:translate-x-2
                  transition
                  duration-300
                "
                    >
                      <a
                        href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block"
                      >
                        <p className="text-sm text-gray-500 mb-2">
                          {item.created_at.split("T")[0]}
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition">
                          {item.judul}
                        </h2>

                        <div
                          className="
    leading-8
    text-justify
    prose
    max-w-none

    /* TABLE */
    [&_table]:w-full
    [&_table]:border
    [&_table]:border-collapse

    [&_th]:border
    [&_th]:p-2
    [&_th]:bg-gray-200

    [&_td]:border
    [&_td]:p-2

    /* IMAGE */
    [&_img]:w-full
    [&_img]:max-w-[200px]
    [&_img]:h-auto
    [&_img]:rounded-xl
    [&_img]:mx-auto

    /* TEXT OVERFLOW */
    line-clamp-2
    overflow-hidden
    text-ellipsis
  "
                          dangerouslySetInnerHTML={{ __html: item.desk }}
                        />
                      </a>
                    </article>
                  ))}
                </div>

                {/* PAGINATION */}
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
            </div>
            <div className="md:col-span-3 mt-4 md:mt-0">
              <div className="sticky top-5">
                <div className="bg-white rounded-3xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold mb-6 text-blue-700">
                    Jadwal Lomba Terdekat
                  </h2>

                  <ol className="space-y-5 list-decimal list-inside">
                    {currentLom.map((item) => (
                      <li className="text-gray-700 leading-7 ">
                        <a href={item.id}>{item.judul}</a>
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

      <Footer />
    </div>
  );
}
