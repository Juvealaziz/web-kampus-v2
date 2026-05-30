import { useState, useEffect } from "react";
import Aside from "../../admin/Aside";
import PageL from "./PageL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Aksi() {
  const navigate = useNavigate();
  const [gambar, setGambar] = useState<File | null>(null);
  const [form, setForm] = useState({
    id: null,
    judul: "",
    desk: "",
    kategori: "",
    tipe: "ukm",
    gambar: "",
  });

  const handlecreate = async () => {
    if (!form.judul || !form.desk || !gambar || !form.kategori) {
      alert(
        "Data belum dimasukkan! Pastikan Judul, Deskripsi, dan Gambar sudah terisi semua.",
      );
      return;
    }
    try {
      const formData = new FormData();

      formData.append("judul", form.judul);
      formData.append("desk", form.desk);
      formData.append("kategori", form.kategori);
      formData.append("tipe", form.tipe);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/UKM`, formData);

      alert("Berhasil tambah");
      navigate("/admin-UKM");

      setForm((prev) => ({
        ...prev,
        id: res.data.data.id,
      }));
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="bg-gray-100 h-full">
        {/* Sidebar */}
        <Aside />

        <div className="grid md:grid-cols-12 ">
          <div className="md:col-span-9">
            {/* Header */}

            <div className="bg-transparent mb-12">
              <nav className="flex  md:w-[1000px] mx-auto  justify-center mt-12 p-4 shadow-xl border-xl rounded-lg ">
                <h1 className="mt-4 font-semibold text-lg">Tambah Data</h1>
                <div className="gap-4 flex ml-auto">
                  <button
                    onClick={handlecreate}
                    className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
                  >
                    Simpan Data
                  </button>
                  <a
                    href="/admin-UKM"
                    className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-white hover:opacity-90 transition"
                  >
                    Kembali
                  </a>
                </div>
              </nav>
            </div>

            {/* ------ */}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-5 md:mx-12">
              <div className="border-b px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <h1 className="text-xl font-semibold">Form UKM</h1>
                <p className="text-sm text-blue-100">
                  Anda dapat isi artikel melalui form dibawah
                </p>
              </div>
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-7 p-5">
                  <div className="">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Gambar Unit kegiatan
                    </label>

                    <input
                      required
                      type="file"
                      name=""
                      id=""
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setGambar(e.target.files[0]);
                        }
                      }}
                    />
                    <div className="border border-black/20 w-[300px] h-[300px] mt-2">
                      {gambar && (
                        <img
                          src={URL.createObjectURL(gambar)}
                          alt=""
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 p-5">
                  {/*isi*/}
                  <div className="w-[400px] md:w-full">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Judul Kegiatan
                    </label>

                    <div className="border rounded-xl overflow-hidden shadow-sm">
                      <input
                        required
                        onChange={(e) =>
                          setForm({
                            ...form,
                            judul: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Masukkan judul...."
                        className="
            w-full
            border border-gray-300
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
            shadow-sm
            disabled:bg-gray-100
          "
                      />
                    </div>
                  </div>

                  {/*alamat*/}
                  <div className="w-[400px] md:w-full">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Deskripsi singkat
                    </label>

                    <div className="border rounded-xl overflow-hidden shadow-sm">
                      <textarea
                        required
                        name=""
                        onChange={(e) =>
                          setForm({
                            ...form,
                            desk: e.target.value,
                          })
                        }
                        className="
            w-full
            h-[200px]
            border border-gray-300
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
            shadow-sm
            disabled:bg-gray-100
          "
                      />
                    </div>
                  </div>

                  {/*alamat*/}
                  <div className="w-[400px] md:w-full">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Kategori
                    </label>

                    <div className="border rounded-xl overflow-hidden shadow-sm">
                      <select
                        required
                        value={form.kategori}
                        name=""
                        onChange={(e) =>
                          setForm({
                            ...form,
                            kategori: e.target.value,
                          })
                        }
                        id=""
                        className="
            w-full
            border border-gray-300
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
            shadow-sm
            disabled:bg-gray-100
          "
                      >
                        <option value="" disabled>
                          Pilih kategori
                        </option>
                        <option value="Alumni">Alumni</option>
                        <option value="Belajar">Belajar</option>
                        <option value="Ekstrakulikurer">Ekstrakurikuler</option>
                        <option value="Hiburan">Hiburan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <PageL />
          </div>
        </div>
      </div>
    </>
  );
}
