import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Formulir() {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/pages`)
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.judul === "Formulir",
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
            <a href="">Formulir</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl text-center md:text-left">
            Formulir
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
        </div>
      </div>

      <Footer />
    </div>
  );
}

{
  /*

      <p className="mt-6 text-justify leading-8 text-gray-700">
                        Daftar Formulir untuk mahasiswa dan calon mahasiswa Universitas San Pedro yang dapat di-download kemudian dicetak untuk diisi
                     </p>
                     <h1 className='text-lg mt-2'>Calon Mahasiswa:</h1>
                     <a href="#" className='mt-2 text-blue-500'>Formulir Surat Pernyataan Kebenaran Data dan Keabsahan Dokumen</a><br />
                     <span>Daftar Online</span><br />
                     <a className= 'mt-2 text-blue-500'href="https://docs.google.com/forms/d/e/1FAIpQLSfHaFubo5JxJaOevWv54HljnCmWp87GcQ4QTAQyFgkYZ6VwIw/viewform?usp=header ">Pendaftaran Online</a>
                    <p className="mt-6 text-justify leading-8 text-gray-700">
                       Catatan: Program Sarjana dan Diploma FEB, FHISIP, FKIP, FST (1-3), Program PGSD dan PGPAUD FKIP (1-4)
                     </p>
    
    
    
    */
}
