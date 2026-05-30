import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Berita() {
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const currentData = pages.slice(start, end);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/UKM`)
      .then((res) => {
        const filtered = res.data.filter((item: any) => item.tipe === "Berita");

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
            <a href="">Berita</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8">
          <h1 className="font-semibold text-5xl text-center ">Berita</h1>

          <div>
            {/* CONTENT */}
            <div className="container mx-auto px-4 py-10">
              {currentData.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-12"
                >
                  {/* IMAGE */}
                  <div className="md:col-span-5">
                    <img
                      style={{
                        backgroundImage: `url(http://127.0.0.1:8000/uploads/${item.gambar})`,
                      }}
                      className="w-full md:w-[400px] h-[200px] object-cover rounded-2xl ml-auto"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="md:col-span-7">
                    <p className="uppercase text-sm font-semibold text-blue-600">
                      {item.kategori}
                    </p>

                    <a
                      href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <h1 className="text-2xl font-bold mt-2 hover:text-blue-600 transition duration-300 cursor-pointer">
                        {item.judul}
                      </h1>
                    </a>

                    <p className="mt-4 text-gray-600 leading-7">
                      <div className="leading-8 text-justify prose">
                        {item.desk.replace(/<[^>]*>/g, "").slice(0, 200)}...
                      </div>
                    </p>

                    <p className="mt-4 text-sm text-gray-400">
                      {item.created_at.split("T")[0]}
                    </p>
                  </div>
                </div>
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
      </div>

      <Footer />
    </div>
  );
}
