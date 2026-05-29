import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
export default function Detail() {
  const [pages, setPages] = useState(null);
  const [rekomendasi, setRekomendasi] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://127.0.0.1:8000/api/UKM/${id}`)
      .then((res) => {
        setPages(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://127.0.0.1:8000/api/UKM/${id}/rekomendasi`)
      .then((res) => {
        console.log("Data Rekomendasi:", res.data);
        setRekomendasi(res.data);
      })
      .catch((err) => console.log("Gagal memuat rekomendasi:", err));
  }, [id]);
  if (!pages) {
    return <div className="text-center p-5">Loading data...</div>;
  }

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
            <a href="">{pages.judul}</a>
          </li>
          <li className="ml-auto">
            <span> {pages.created_at.split("T")[0]}</span>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
              <h1 className="font-semibold text-2xl">{pages.judul}</h1>

              <div className="mt-6">
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
          </div>

          <div className="md:col-span-4 mt-4 md:mt-0 md:ml-16">
            <div className="sticky top-5">
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-blue-700">
                  Lainnya
                </h2>

                <ol className="space-y-5 list-decimal list-inside">
                  {rekomendasi.slice(0, 9).map((item) => (
                    <li className="text-gray-700 leading-7 ">
                      <a
                        href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {item.judul}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
