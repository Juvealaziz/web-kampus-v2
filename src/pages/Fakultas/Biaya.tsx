import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Biaya() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sarjana");
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/pages`)
      .then((res) => {
        const filtered = res.data.filter((item: any) => item.judul === "Biaya");
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
            <a href="">Biaya Studi</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab("sarjana")}
              className={`px-6 py-4 font-semibold transition duration-300
          ${
            activeTab === "sarjana"
              ? "bg-white text-blue-700 border-t-4 border-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
            >
              Program Sarjana
            </button>
            {/* 
            <button
              onClick={() => setActiveTab("doktor")}
              className={`px-6 py-4 font-semibold transition duration-300
  ${
    activeTab === "doktor"
      ? "bg-white text-blue-700 border-t-4 border-blue-700"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
  }`}
            >

              Program Doktor
            </button>
            */}
          </div>
          {/*untuk program sarjana */}
          {activeTab === "doktor" && (
            <div>
              <h1 className="font-semibold text-2xl text-center">
                Biaya Pendidikan Program Doktor dan Magister{" "}
              </h1>
              <hr className="md:h-[10px] h-[10px] ml-4 mr-4 md:ml-0 md:mr-0 my-2 bg-gray-200 border-0 dark:bg-gray-700" />

              <p className="mt-6 text-justify leading-8 text-gray-700">
                Program doktor memiliki sistem pembiayaan yang berbeda dengan
                program sarjana. Biaya mencakup penelitian, seminar akademik,
                bimbingan disertasi, publikasi ilmiah, dan ujian akhir doktor.
              </p>
            </div>
          )}
          {activeTab === "sarjana" && (
            <div className="">
              <h1 className="font-semibold text-2xl text-center">
                Biaya Pendidikan Program Sarjana{" "}
              </h1>
              <hr className="md:h-[10px] h-[10px] ml-4 mr-4 md:ml-0 md:mr-0 my-2 bg-gray-200 border-0 dark:bg-gray-700" />

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
              {/* 
              <div className="bg-gray-600 text-gray-200  rounded-xl w-full ">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex justify-between items-center w-full p-2"
                >
                  <span>A. Uang Kuliah</span>

                  <span className="text-xl">{open ? "-" : "+"}</span>
                </button>

                {open && (
                  <div className="mt-4 w-full bg-gray-200 text-gray-600 p-2 ">
                    <p>
                      Uang Kuliah di Unisap terdiri atas beberapa skema layanan
                      yang dipilih oleh mahasiswa. Skema uang kuliah di Unisap
                      terdiri atas:
                    </p>
                    <p>
                      <br />
                      1. SIPAS Non TTM, meliputi layanan: LPKBJJ, administrasi
                      akademik, bahan ajar cetak dan digital, praktik/praktikum
                      seluruh mata kuliah paket, Tutorial Online (Tuton), Ujian
                      Akhir Semester (UAS), Tugas Akhir Program Sarjana (TAPS),
                      dan Pengambilan Ijazah.
                      <br />
                      <br />
                      2. SIPAS Semi, meliputi layanan: LPKBJJ, administrasi
                      akademik, bahan ajar cetak (termasuk biaya pengiriman
                      bahan ajar) dan digital, TTM wajib maksimal 3 mata kuliah,
                      praktik/praktikum, Tuton, UAS, TAPS, dan Pengambilan
                      Ijazah.
                      <br />
                      <br />
                      3. SIPAS Penuh, meliputi layanan: LPKBJJ, administrasi
                      akademik, bahan ajar cetak (termasuk biaya pengiriman
                      bahan ajar) dan digital, TTM wajib seluruh mata kuliah,
                      praktik/praktikum, Tuton, UAS, TAPS, dan Pengambilan
                      Ijazah.
                      <br /> <br />
                      4. SIPAS Plus, meliputi layanan: LPKBJJ, administrasi
                      akademik, bahan ajar cetak (termasuk biaya pengiriman
                      bahan ajar) dan digital, TTM wajib seluruh mata kuliah,
                      praktik/praktikum, Tuton, UAS, TAPS, Pengambilan Ijazah,
                      dan pelatihan pengembangan diri.
                      <br />
                      <br />
                      5. Non-SIPAS, layanan akademik dan administrasi akademik
                      diberikan jika mahasiswa melakukan registrasi Mata Kuliah
                      per sks.
                    </p>
                  </div>
                )}
              </div>
              */}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
