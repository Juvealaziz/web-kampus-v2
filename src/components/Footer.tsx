import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMap,
  FaPhone,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Footer() {
  const [form, setForm] = useState({
    id: null,
    nama_univ: "",
    alamat: "",
    no_telp: "",
    desk: "",
    email: "",
  });
  //tampil
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/univ`)
      .then((res) => {
        setForm({
          id: res.data?.id ?? "",
          nama_univ: res.data?.nama_univ ?? "",
          alamat: res.data?.alamat ?? "",
          desk: res.data?.desk ?? "",
          email: res.data?.email ?? "",
          no_telp: res.data?.no_telp ?? "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8 mt-16">
      <div className="container mx-auto px-6">
        {/* Grid Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{form.nama_univ}</h2>

            <p className="text-gray-300 leading-relaxed">{form.desk}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontak Info</h3>

            <div className="space-y-3 text-gray-300">
              <div
                className="
              flex gap-3"
              >
                <span>
                  <FaMap />
                </span>
                <p className="-mt-2">{form.alamat}</p>
              </div>
              <div
                className="
              flex gap-3"
              >
                <span>
                  <FaPhone />
                </span>
                <p className="-mt-2">{form.no_telp}</p>
              </div>

              <div
                className="
              flex gap-3"
              >
                <span>
                  <FaEnvelope />
                </span>
                <p className="-mt-2">{form.email}</p>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Profil</h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="/Visi" className="hover:text-blue-400 transition">
                  Visi, Misi dan Tujuan
                </a>
              </li>

              <li>
                <a href="/Fasilitas" className="hover:text-blue-400 transition">
                  Fasilitas
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Informasi</h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="/Prestasi" className="hover:text-blue-400 transition">
                  Prestasi
                </a>
              </li>

              <li>
                <a
                  href="/Pengumuman"
                  className="hover:text-blue-400 transition"
                >
                  Pengumuman
                </a>
              </li>

              <li>
                <a
                  href="/Unit-Kegiatan-Mahasiswa"
                  className="hover:text-blue-400 transition"
                >
                  Kegiatan Mahasiswa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social */}
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-blue-400 transition">
                <FaGlobe />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center">
              © 2026 Universitas San Pedro.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
