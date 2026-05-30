import Footer from "../../components/Footer";
import Navhead from "../../components/Header";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

export default function Pengaduan() {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/pengaduan`, {
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
      <script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></script>

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
            <a href="">Pengaduan</a>
          </li>
        </ul>
        <hr className="mt-4" />
        <div className="artikel mt-8 text-xl ml-2 mr-2 md:ml-0 md:ml-0">
          <h1 className="font-semibold text-2xl">Pengaduan</h1>
          <div className="grid md:grid-cols-12 gap-6 mt-4">
            <div className="col-span-12 md:col-span-4 bg-gray-100 rounded-2xl p-6 shadow-lg">
              {/* LOGO & CONTENT */}
              <div className="text-center">
                <div className="flex justify-center">
                  <img
                    src="https://kfmap.asia/storage/thumbs/storage/photos/ID.KPG.UNIV.USP/ID.KPG.UNIV.USP_1.jpeg"
                    alt="Logo Universitas"
                    className="w-full h-full  object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
            {/* Kirim Pesan */}
            <div className="col-span-12 md:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                  Form Pengaduan
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

                      <label className="block font-semibold mb-2">
                        Subject
                      </label>

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
      </div>

      <Footer />
    </div>
  );
}
