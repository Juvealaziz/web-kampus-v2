import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper/modules";
import { data } from "react-router-dom";

export default function CardCar() {
  const cards = [
    {
      title: "Kompetensi Global",
      desc: "Program pembelajaran modern yang mendukung kompetensi global mahasiswa.",
      img: "https://cdn-icons-png.flaticon.com/512/10748/10748315.png",
    },
    {
      title: "Fasilitas Modern",
      desc: "Didukung laboratorium, perpustakaan, dan fasilitas kampus yang modern.",
      img: "https://cdn-icons-png.flaticon.com/512/10178/10178272.png",
    },
    {
      title: "Lingkungan Nyaman",
      desc: "Suasana belajar yang nyaman dan mendukung kreativitas mahasiswa.",
      img: "https://cdn-icons-png.flaticon.com/512/10178/10178272.png",
    },
    {
      title: "Dosen Profesional",
      desc: "Didukung tenaga pengajar berpengalaman dan kompeten di bidang akademik maupun industri.",
      img: "https://th.bing.com/th/id/R.5b24f2b9f799c76cd76b224047eae265?rik=Nh4ndQ41Mx7ZMA&riu=http%3a%2f%2fsiakad.aks-akk.ac.id%2faks_dosen%2fassets%2ficon_dosen.png&ehk=nHgNf1WMy%2bDBR02m6lvquJW0epLEZYuQOvpobc8BeK8%3d&risl=&pid=ImgRaw&r=0",
    },
  ];
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      slidesPerGroup={2}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
      }}
      className="w-full max-w-[600px] pb-12"
    >
      {/* CARD 1 */}
      {cards.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition h-full">
            <img src={item.img} alt={item.title} className="w-16 mb-4" />

            <h1 className="text-xl font-bold text-slate-800 mb-3">
              {item.title}
            </h1>

            <p className="text-gray-600">{item.desc}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
