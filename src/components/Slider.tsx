import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Slider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      /* pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true} */
      className="w-full h-[400px]"
    >
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src="https://assets.siakadcloud.com/uploads/unisap/bgaplikasi/1811.jpg?1758507729?32785"
            className="w-full h-full object-cover"
            alt=""
          />

          {/* gradient halus biar tidak flat */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/30"></div>
        </div>

        {/* Text Content */}
        <div className="absolute inset-0 flex items-center mt-[100px] md:mt-2">
          <div className="max-w-3xl px-10 text-white ">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight ">
              Selamat Datang di
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight px-4">
              Universitas San Pedro
            </h1>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
