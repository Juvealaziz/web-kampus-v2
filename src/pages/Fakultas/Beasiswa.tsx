import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Beasiswa() {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/pages")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.judul === "Beasiswa",
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
            <a href="">Beasiswa</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl mb-12">Beasiswa</h1>

          {/* KONTEN */}
          <div className="container mx-auto px-4 pb-10">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-5">
                <div className="sticky top-5">
                  <div className="bg-white rounded-3xl shadow-xl p-6">
                    {pages.map((item) => (
                      <img
                        src={`http://127.0.0.1:8000/uploads/${item.gambar}`}
                        alt=""
                        className="w-full rounded-2xl shadow-xl"
                      />
                    ))}
                    <ol className="space-y-5 list-decimal list-inside"></ol>
                  </div>
                </div>
              </div>

              {/* Artikel */}
              <div className="lg:col-span-7">
                <article className="bg-white rounded-3xl shadow-lg p-5 mb-6">
                  {pages.map((item) => (
                    <div className="mt-6" key={item.id}>
                      <div
                        className="
                              
                          leading-8  text-justify  prose    [&_table]:w-full
                          [&_table]:border
                          [&_table]:border-collapse

                          [&_th]:border
                          [&_th]:p-2
                          [&_th]:bg-gray-200

                          [&_td]:border
                          [&_td]:p-2"
                        dangerouslySetInnerHTML={{ __html: item.isi }}
                      />
                    </div>
                  ))}
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
