import Navbar from "../../components/Navbar";
import CardCar from "../../components/CardCar";
import Navhead from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Beranda() {
  const [pages, setPages] = useState<any[]>([]);
  const [pages1, setPages1] = useState<any[]>([]);
  const [pages2, setPages2] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [news1, setNews1] = useState<any[]>([]);
  const [prestasi, setPrestasi] = useState<any[]>([]);
  const [umum, setUmum] = useState<any[]>([]);
  const [univ1, setUniv1] = useState<any[]>([]);
  const [prof, setProf] = useState<any[]>([]);

  //Statistik data univ
  const DataPegawai = [
    { label: "Fakultas", value: "12" },
    { label: "Dosen", value: "80" },
    { label: "Pegawai", value: "30" },
    { label: "Program Studi", value: "40" },
    { label: "Guru Besar", value: "13" },
    { label: "Mahasiswa", value: "1000+" },
  ];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Data_Unduh")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) =>
            item.tipe === "poster" && item.status === "Berita Pilihan",
        );

        setPages(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Data_Unduh")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "aplikasi",
        );

        setPages1(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Data_Unduh")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "video_kampus",
        );

        setPages2(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //berita pilihan
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/UKM")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) =>
            item.tipe === "Berita" && item.status?.includes("Berita Pilihan"),
        );

        setNews(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //berita  utama
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/UKM")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) =>
            item.tipe === "Berita" && item.status?.includes("Berita Utama"),
        );

        setNews1(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //prestasi
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/UKM")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "prestasi",
        );

        setPrestasi(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //pengumuman
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/UKM")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "pengumuman",
        );

        setUmum(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //univ

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/univ")
      .then((res) => {
        setUniv1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //profil
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/pages")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.judul === "Sambutan",
        );

        setProf(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      <Navhead />
      {/*nav*/}
      <Navbar />
      {/* preview */}
      <div className="relative">
        {pages2.slice(0, 1).map((item) => (
          <video
            key={item.id}
            autoPlay
            muted
            loop
            className="w-full h-full md:h-[500px] object-cover"
          >
            <source
              src={`http://127.0.0.1:8000/storage/${item.file_path}`}
              type="video/mp4"
            />
          </video>
        ))}
      </div>

      {/* slogan */}
      <div className="flex gap-6 justify-center items-center py-6 bg-blue-100/70 backdrop-blur-sm ">
        <span className="text-2xl text-yellow-600 ml-2">
          Bakar Jaga, Tarang Masa Depan
        </span>
        <span className="text-2xl text-yellow-600">|</span>
        <span className="text-2xl text-blue-600">Akreditasi Unggul</span>
      </div>

      {/*sambutan*/}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-12">
          {/* kiri */}
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-6">
              Selamat Datang di Universitas San Pedro
            </h1>

            <p className="text-gray-600 leading-8">{univ1?.desk}</p>

            <hr className="my-8 border-gray-200" />

            {/* REKTOR */}
            {prof.slice(0, 1).map((item) => (
              <div key={item.id} className="flex items-center gap-5">
                <img
                  src={`http://127.0.0.1:8000/uploads/${item.gambar}`}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-slate-800">{item.nama}</p>

                  <small className="text-gray-500">
                    Rektor Universitas San Pedro
                  </small>
                </div>
              </div>
            ))}
          </div>

          {/*card*/}
          <CardCar />
        </div>

        {/* Berita */}
        {/* TITLE */}
        <div className="flex items-center gap-4 mb-10 border-b pb-4">
          <div className="bg-gray-500 text-white p-3 rounded-lg">
            <img
              className="w-10"
              src="https://tse1.mm.bing.net/th/id/OIP.xw1BByH17QxJ1VdBrUcngAHaHx?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt=""
            />
          </div>
          <div className="relative">
            <h1 className="text-3xl font-bold text-slate-800">
              Berita Pilihan
            </h1>
            <span>
              Tetap terhubung dengan berita dan informasi terbaru tentang
              berbagai aktivitas di Kampus Universitas San pedro
            </span>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.slice(0, 3).map((item, index) => (
            <div className="group" key={item.id}>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={`http://127.0.0.1:8000/uploads/${item.gambar}`}
                  alt=""
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-300"
                />

                {/* DATE */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md text-center shadow-lg">
                  <p className="text-sm font-semibold">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="mt-5">
                <h1 className="text-2xl font-semibold text-slate-800 leading-snug hover:text-blue-600 transition cursor-pointer">
                  <a
                    href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.judul}
                  </a>
                </h1>

                <p className="text-gray-500 text-sm mt-3">{item.author}</p>

                <p className="text-gray-600 mt-4 leading-7">
                  {" "}
                  {item.desk?.replace(/<[^>]*>/g, "").slice(0, 100)}...
                </p>

                <a
                  href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                  className="mt-5 text-blue-600 font-semibold hover:underline"
                >
                  Baca Selanjutnya
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Informasi */}
        {/* TITLE */}
        <div className="flex items-center gap-4 mb-10 border-b pb-4 mt-16">
          <div className="bg-gray-500 text-white p-3 rounded-lg">
            <img
              className="w-10"
              src="https://cdn-icons-png.flaticon.com/256/9474/9474482.png"
              alt=""
            />
          </div>
          <div className="relative">
            <h1 className="text-3xl font-bold text-slate-800">Informasi</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ================= Berita ================= */}
              <div>
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                      Berita Lainnya
                    </h1>

                    <div className="w-20 h-1 bg-cyan-400 rounded-full mt-2"></div>
                  </div>

                  <a
                    href="/berita"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Semua
                  </a>
                </div>

                {/* CARD */}
                {news1.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                  >
                    {/* IMAGE */}
                    <div
                      className="h-[220px] bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url(http://127.0.0.1:8000/uploads/${item.gambar})`,
                      }}
                    >
                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                        <span className="text-cyan-300 font-semibold mb-2">
                          Berita
                        </span>

                        <h1 className="text-white text-xl font-bold leading-snug">
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </h1>
                      </div>
                    </div>

                    {/* BODY */}
                    <div className="p-6">
                      <a
                        href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <h1 className="text-xl font-bold text-slate-800 mb-3">
                          {item.judul}
                        </h1>
                      </a>

                      <small className="text-gray-500">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= Prestasi ================= */}
              <div>
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                      Prestasi
                    </h1>

                    <div className="w-20 h-1 bg-cyan-400 rounded-full mt-2"></div>
                  </div>

                  <a
                    href="/prestasi"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Semua
                  </a>
                </div>

                {/* CARD */}
                {prestasi.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                  >
                    {/* IMAGE */}
                    <div
                      className="h-[220px] bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url(http://127.0.0.1:8000/uploads/${item.gambar})`,
                      }}
                    >
                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                        <span className="text-cyan-300 font-semibold mb-2">
                          Prestasi
                        </span>

                        <h1 className="text-white text-xl font-bold leading-snug">
                          {item.judul}
                        </h1>

                        <small className="text-gray-200 mt-2">
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </small>
                      </div>
                    </div>

                    {/* BODY */}
                    <div className="p-6">
                      <a
                        href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <h1 className="text-xl font-bold text-slate-800 mb-3">
                          {item.desk?.replace(/<[^>]*>/g, "").slice(0, 100)}...
                        </h1>
                      </a>

                      <small className="text-gray-500">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= PENGUMUMAN ================= */}
          <div>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Pengumuman
                </h1>

                <div className="w-20 h-1 bg-cyan-400 rounded-full mt-2"></div>
              </div>

              <a
                href="/pengumuman"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Semua
              </a>
            </div>

            {/* CARD */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              {/* ATAS GULUNGAN PUTIH */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[104%] h-6 bg-gradient-to-b from-slate-300 to-slate-200 rounded-full shadow-lg z-30">
                {/* UJUNG KIRI */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-300 border-[3px] border-slate-400"></div>

                {/* UJUNG KANAN */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-300 border-[3px] border-slate-400"></div>
              </div>

              {/* BODY */}
              {umum.slice(0, 5).map((item, index) => (
                <div key={index} className="p-6">
                  <a
                    href={`/Detail/${item.id}/${item.judul.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <h1 className="text-xl font-bold text-slate-800 mb-3">
                      {item.judul}
                    </h1>
                  </a>

                  <small className="text-gray-500">
                    {" "}
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </small>
                </div>
              ))}

              {/* Bawah GULUNGAN PUTIH */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[104%] h-6 bg-gradient-to-b from-slate-300 to-slate-200 rounded-full shadow-lg z-30">
                {/* UJUNG KIRI */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-300 border-[3px] border-slate-400"></div>

                {/* UJUNG KANAN */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-300 border-[3px] border-slate-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= end ================= */}
      </div>
      {/* poster */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100 mt-6">
        {pages.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl shadow-md overflow-hidden "
          >
            <img
              src={`http://127.0.0.1:8000/storage/${item.file_path}`}
              className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>

      {/* Tautan */}
      <div className="container mx-auto">
        <div className="text-center mt-12">
          <h1 className="font-semibold text-2xl">
            Sistem Informasi dan Pelayanan Publik
          </h1>
          <span>
            Universitas San Pedro telah menggunakan Sistem Informasi
            Terintegrasi dan Pelayanan Publik untuk menunjang kegiatan kampus
            dan masyarakat
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pages1.map((item) => (
            <div
              key={item.id}
              className="group flex gap-6 bg-white shadow-md overflow-hidden p-12 mr-3 mt-3"
            >
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.g8VgcTYD-heU3myUzsRgWAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt=""
                className="w-[50px] h-[50px]"
              />
              <a href={item.url}>
                <div className="relative">
                  <h6 className="font-semibold">{item.judul}</h6>
                  <span>{item.judul} kampus unisap</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* Statistic Section */}
      <div
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage:
            "url(https://sevima.com/wp-content/uploads/2025/09/Universitas-San-Pedro-1024x576.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 container mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">
              UNISAP Jumlah Data
            </h1>
            <p className="text-gray-200 mt-2">
              Statistik data akademik dan institusi
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DataPegawai.map((item, i) => (
              <div
                key={i}
                className="group bg-white/10 backdrop-blur-md border border-white/20 
                     rounded-2xl p-6 text-center text-white
                     shadow-lg hover:scale-105 hover:bg-white/20 
                     transition duration-300"
              >
                <h2 className="text-sm text-gray-200">{item.label}</h2>
                <p className="text-3xl font-bold mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
