import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Aside from "../../admin/Aside";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Berita() {
  const navigate = useNavigate();
  const [gambar, setGambar] = useState<File | null>(null);
  const [form, setForm] = useState({
    id: null,
    judul: "",
    desk: "",
    kategori: "",
    tipe: "Berita",
    gambar: "",
    status: [] as string[],
    author: "",
  });

  const handleStatusChange = (value: string) => {
    setForm((prev) => {
      const exists = prev.status.includes(value);

      return {
        ...prev,
        status: exists
          ? prev.status.filter((item) => item !== value)
          : [...prev.status, value],
      };
    });
  };

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
      formData.append("author", form.author);
      formData.append("status", JSON.stringify(form.status));

      if (gambar) {
        formData.append("gambar", gambar);
      }

      const res = await axios.post("http://127.0.0.1:8000/api/UKM", formData);

      alert("Berhasil tambah");
      navigate("/admin-berita");

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
                    href="/admin-berita"
                    className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-white hover:opacity-90 transition"
                  >
                    Kembali
                  </a>
                </div>
              </nav>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-5 md:mx-12">
              <div className="border-b px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <h1 className="text-xl font-semibold">Form Berita</h1>
                <p className="text-sm text-blue-100">
                  Anda dapat isi artikel melalui form dibawah
                </p>
              </div>
              <div className="p-6 spaceY-5">
                <div className="">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Judul Berita
                  </label>

                  <input
                    type="text"
                    value={form.judul ? form.judul : ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        judul: e.target.value,
                      })
                    }
                    placeholder="Masukkan Judul Berita..."
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

                {/*isi*/}
                <div className="w-[400px] md:w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Isi Konten
                  </label>

                  <div className="border rounded-xl overflow-hidden shadow-sm">
                    <CKEditor
                      editor={ClassicEditor}
                      data={form.desk ?? ""}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setForm((prev) => ({
                          ...prev,
                          desk: data,
                        }));
                      }}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "|",
                          "insertTable",
                          "imageUpload",
                          "|",
                          "undo",
                          "redo",
                        ],
                        ckfinder: {
                          uploadUrl: "http://127.0.0.1:8000/api/upload",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            {/* CARD */}
            <div className="sticky top-0 h-screen overflow-y-auto ">
              <div className="p-6">
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-300 transition duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  {/* ATAS GULUNGAN PUTIH */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[104%] h-6 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full shadow-lg z-30">
                    {/* UJUNG KIRI */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-300 border-[3px] border-blue-500"></div>

                    {/* UJUNG KANAN */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-300 border-[3px] border-blue-500"></div>
                  </div>

                  <div className=" mt-4">
                    {/* BODY */}
                    <div className="p-6">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Kategori Berita
                      </label>
                      <input
                        required
                        onChange={(e) =>
                          setForm({
                            ...form,
                            kategori: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Masukkan kategori...."
                        className="
            border border-black/20 w-full rounded-lg
          "
                      />
                    </div>

                    <div className="p-6 -mt-6">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setForm({
                            ...form,
                            author: e.target.value,
                          })
                        }
                        placeholder="Nama Penulis"
                        className="border border-black/20 w-full rounded-lg"
                      />
                    </div>
                    <div className=" p-6 -mt-6 border">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Atur Berita
                      </label>

                      <div className="flex flex-col ">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={form.status.includes("Berita Pilihan")}
                            onChange={() =>
                              handleStatusChange("Berita Pilihan")
                            }
                          />
                          Berita Pilihan
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={form.status.includes("Berita Utama")}
                            onChange={() => handleStatusChange("Berita Utama")}
                          />
                          Berita Utama
                        </label>
                      </div>
                    </div>

                    <div className="p-6 -mt-6">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Gambar
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
                      <div className="border border-black/20 w-[200px] h-[200px] mt-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
