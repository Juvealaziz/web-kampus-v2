import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sambutan() {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/pages`)
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.judul === "Sambutan",
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
            <a href="">Sambutan-Rektor</a>
          </li>
        </ul>
        <hr className="mt-4" />

        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl">Sambutan Rektor</h1>
          {/*prodi */}
          <div className="grid md:grid-cols-12 gap-6  mt-4">
            <div className="md:col-span-3 md:w-[350px] bg-gray-100 rounded-2xl  shadow-lg  rounded-2xl w-full">
              <div>
                <div className="px-6">
                  {pages.map((item) => (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/${item.gambar}`}
                      alt=""
                      className="w-full mix-blend-darken"
                    />
                  ))}
                </div>
                <div className="text-center mt-2 px-6 ">
                  <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                  {pages.map((item) => (
                    <span className="text-xl font-bold" key={item.id}>
                      {" "}
                      {item.nama}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-9 w-full bg-gray-200 md:mx-9 shadow-lg">
              <div className=" mx-4 mt-2 mb-4">
                {pages.map((item) => (
                  <div className=" mx-4 " key={item.id}>
                    <div
                      className="leading-8  text-justify  prose"
                      dangerouslySetInnerHTML={{ __html: item.isi }}
                    />
                  </div>
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
