import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Fasilitas() {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/pages")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.judul === "Fasilitas",
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
            <a href="">Fasilitas</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl  text-center md:text-left">
            Fasilitas
          </h1>
          <hr className="md:h-[10px] h-[10px] ml-4 mr-4 md:ml-0 md:mr-0 my-2 bg-gray-200 border-0 dark:bg-gray-700" />

          {pages.map((item) => (
            <div className="mt-6" key={item.id}>
              <div
                className="
                              
                              
                          leading-8  text-justify  prose    [&_table]:w-full
                          [&_table]:border
                          [&_table]:border-collapse

                          [&_img]:w-full
                          md:[&_img]:w-[800px]
                          [&_img]:mx-auto
                          [&_img]:block

                          [&_th]:border
                          [&_th]:p-2
                          [&_th]:bg-gray-200

                          [&_td]:border
                          [&_td]:p-2"
                dangerouslySetInnerHTML={{ __html: item.isi }}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
