import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMap,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Kontak() {
  const [univ, setUniv] = useState<any | null>(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/univ`)
      .then((res) => {
        setUniv(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    subject: "",
    pesan: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Silakan verifikasi reCAPTCHA dulu");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/pengaduan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          captcha: captchaToken,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengirim");
      }

      alert("Pengaduan berhasil dikirim");

      // reset form
      setForm({
        nama: "",
        email: "",
        subject: "",
        pesan: "",
      });

      setCaptchaToken(null);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
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
            <a href="">Kontak</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8">
          {/* lokasi */}
          <div className="map">
            <h1 className="text-2xl  mb-6 bg-gray-200 rounded-lg">
              Informasi Lokasi
            </h1>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={univ?.link_alamat}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-6 mt-4">
          <div className="col-span-12 md:col-span-4 bg-gray-100 rounded-2xl p-6 shadow-lg">
            {/* LOGO & CONTENT */}
            <div className="text-center">
              <div className="flex justify-center">
                <img
                  src={`http://127.0.0.1:8000/uploads/${univ?.logo}`}
                  alt="Logo Universitas"
                  className="w-[120px] h-[120px] rounded-full object-cover shadow-lg"
                />
              </div>

              <div className="mt-6">
                <h1 className="text-2xl font-bold leading-tight">
                  {univ?.nama_univ}
                </h1>

                <p className="text-gray-600 mt-3 leading-7 text-sm">
                  {univ?.alamat}
                </p>
              </div>
            </div>

            {/* KONTAK */}
            <div className="mt-10">
              <h1 className="text-xl font-bold text-center mb-5">
                Informasi Kontak
              </h1>

              <div
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-5"
                key={univ?.id}
              >
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="text-xl">
                      <FaPhone />
                    </span>
                    <p className="text-gray-700">{univ?.no_telp}</p>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="text-xl">
                      <FaEnvelope />
                    </span>
                    <p className="text-gray-700">{univ?.email}</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* MEDIA SOSIAL */}
            <div className="mt-10">
              <h1 className="text-xl font-bold text-center mb-5">
                Media Sosial
              </h1>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="text-xl">
                      <FaFacebook />
                    </span>
                    <p className="text-gray-700">{univ?.fb}</p>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="text-xl">
                      <FaInstagram />
                    </span>
                    <p className="text-gray-700">{univ?.ig}</p>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="text-xl">
                      <FaYoutube />
                    </span>
                    <p className="text-gray-700">{univ?.yt}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Kirim Pesan */}
          <div className="col-span-12 md:col-span-8">
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Kirim Pesan
              </h1>

              <form className="space-y-6">
                {/* NAMA */}
                <div>
                  <label className="block font-semibold mb-2">Nama</label>

                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama"
                    className="w-full border border-gray-300 rounded-xl p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid md:grid-cols-12 gap-6">
                  {/* EMAIL */}
                  <div className="md:col-span-6">
                    <label className="block font-semibold mb-2">Email</label>

                    <input
                      type="email"
                      placeholder="Masukkan email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* SUBJECT */}

                    <label className="block font-semibold mb-2">Subject</label>

                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Masukkan subject"
                      className="w-full border border-gray-300 rounded-xl p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-6">
                    {/* PESAN */}
                    <label className="block font-semibold mb-2">Pesan</label>

                    <textarea
                      rows={6}
                      value={form.pesan}
                      name="pesan"
                      onChange={handleChange}
                      placeholder="Tulis pesan..."
                      className="w-full border border-gray-300 rounded-xl p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <ReCAPTCHA
                      sitekey="6LfU-_0sAAAAAI0mIt6z2sWTeTdvVrB7QVBBHh4t"
                      onChange={(token: string | null) =>
                        setCaptchaToken(token)
                      }
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 md:py-4 rounded-xl"
                >
                  {loading ? "Mengirim..." : "Kirim"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
