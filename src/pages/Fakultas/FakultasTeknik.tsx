import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FakultasTeknik() {
  const { id } = useParams();
  const [pages, setPages] = useState<any | null>(null);
  const [prodi, setProdi] = useState<any[]>([]);
  const programs = [...new Set(prodi.map((item) => item.program))];
  const [selectedProgram, setSelectedProgram] = useState("Sarjana");
  const activeProgram = selectedProgram || "Sarjana";

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/fakultas/${id}`)
      .then((res) => {
        setPages(res.data);
        setProdi(res.data.prodi ?? []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
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
            <a href="">Fakultas</a>
          </li>
        </ul>
        <hr className="mt-4" />
        {pages && (
          <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
            <h1 className="font-semibold text-2xl mx-4 mb-4">{pages.nama}</h1>

            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-8 w-full bg-gray-200">
                <div className=" mx-4 ">
                  <h1 className="font-semibold text-2xl mt-2 ">{pages.nama}</h1>
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
                    dangerouslySetInnerHTML={{ __html: pages.desk }}
                  />
                </div>
              </div>
              <div className="md:col-span-4 w-full md:w-[350px] h-auto bg-gradient-to-br from-sky-700 via-blue-500 to-indigo-600 rounded-2xl h-[600px] text-gray-200">
                <div className="text-center mt-2 px-6 ">
                  <h1 className="text-6xl">{prodi.length}</h1>
                  <span className="text-xl">Program Studi</span>
                  <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
                <div className="px-6">
                  <h1 className="text-xl font-bold">Info Kontak</h1>
                  <div className="flex gap-6 mt-4">
                    <span className="text-xl">📍</span>
                    <span>{pages.alamat}</span>
                  </div>
                  <div className="flex gap-6 mt-4">
                    <span className="text-xl">✉️</span>
                    <span>{pages.email}</span>
                  </div>
                  <div className="flex gap-6 mt-4">
                    <span className="text-xl">📞</span>
                    <span>{pages.no_telp}</span>
                  </div>
                  <div className="flex flex-wrap w-auto gap-6 mt-12">
                    <div className="flex flex-col">
                      <FaFacebook className="text-blue-100 hover:scale-110 duration-300 text-4xl" />
                      <p className="text-center mt-2">{pages.fb}</p>
                    </div>
                    <div className="flex flex-col">
                      <FaInstagram className="text-blue-100 hover:scale-110 duration-300 text-4xl" />
                      <p className="text-center mt-2">{pages.ig}</p>
                    </div>
                    <div className="flex flex-col">
                      <FaYoutube className="text-blue-100 hover:scale-110 duration-300 text-4xl" />
                      <p className="text-center mt-2">{pages.yt}</p>
                    </div>
                  </div>
                  <div className="mt-12 w-[200px] bg-green-200 p-2 rounded-lg text-gray-900 ">
                    <a href={pages.url} className="text-lg font-semibold flex">
                      Web Fakultas{" "}
                      <img
                        src="https://png.pngtree.com/png-clipart/20210411/original/pngtree-simple-doodle-arrow-vector-png-image_6211641.png"
                        alt=""
                        className="w-[50px] h-[30px]"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/*prodi */}
            <div className="grid md:grid-cols-12 gap-6 mt-4">
              <div className="md:col-span-3 w-full ">
                {programs.map((program) => (
                  <div
                    key={program}
                    onClick={() => setSelectedProgram(program)}
                    className={`mx-4 mt-2 rounded-xl p-4 text-center cursor-pointer
        ${selectedProgram === program ? "bg-blue-600" : "bg-blue-400"}
      `}
                  >
                    <span className="text-xl font-bold text-yellow-200">
                      {program}
                    </span>
                  </div>
                ))}
              </div>

              <div className="md:col-span-5 w-full bg-gray-200">
                <div className=" mx-4 mt-2">
                  <ul className="text-blue-600 text-xl">
                    {prodi
                      .filter((item) => item.program === activeProgram)
                      .map((item) => (
                        <li key={item.id_fakultas} className="flex gap-2">
                          <span>➜</span>
                          <a
                            href={`/Detail_prodi/${item.id}/${item.nama.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {item.nama}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-4 md:w-[350px] bg-gray-200 rounded-2xl w-full">
                <div className="text-center mt-2 px-6 ">
                  <span className="text-xl font-bold">Scan Barcode</span>
                  <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
                <div className="px-6">
                  <img
                    src={`http://127.0.0.1:8000/uploads/${pages.gambar}`}
                    alt=""
                    className="w-full mix-blend-darken"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
