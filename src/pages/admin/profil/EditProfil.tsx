import { useState, useEffect } from "react";
import Aside from "../Aside";
import PageL from "./PageL";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gambar, setGambar] = useState<File | null>(null);
  const [form, setForm] = useState({
    id: null,
    nip: "",
    nama: "",
    jabatan_f: "",
    jabatan_s: "",
    email: "",
    pendidikan: "",
    desk: "",
    gambar: "",
    peran: [] as string[],
  });
  useEffect(() => {
    if (!id) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/profil/${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handlePeranChange = (value: string) => {
    setForm((prev) => {
      const currentStatus = Array.isArray(prev.peran) ? prev.peran : [];

      const exists = currentStatus.includes(value);

      return {
        ...prev,
        peran: exists
          ? currentStatus.filter((item) => item !== value)
          : [...currentStatus, value],
      };
    });
  };

  const handleUpdate = async () => {
    if (!form.nip || !form.nama) {
      alert("Data belum lengkap!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("nip", form.nip);
      formData.append("nama", form.nama);
      formData.append("jabatan_f", form.jabatan_f);
      formData.append("jabatan_s", form.jabatan_s);
      formData.append("email", form.email);
      formData.append("pendidikan", form.pendidikan);
      formData.append("desk", form.desk);
      formData.append("peran", JSON.stringify(form.peran));
      formData.append("_method", "PUT");

      if (gambar) {
        formData.append("gambar", gambar);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/profil/${id}`, formData);

      alert("Berhasil tambah profil");
      navigate("/admin-profil");
    } catch (error: any) {
      console.log(error.response);
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
                <h1 className="mt-4 font-semibold text-lg">Edit Data</h1>
                <div className="gap-4 flex ml-auto">
                  <button
                    onClick={handleUpdate}
                    className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
                  >
                    Simpan Data
                  </button>
                  <a
                    href="/admin-profil"
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
                <h1 className="text-xl font-semibold">Form Data</h1>
                <p className="text-sm text-blue-100">
                  Anda dapat isi data dosen/dekan/pimpinan melalui form dibawah
                </p>
              </div>
              <div className="p-6 spaceY-5">
                <div className="grid md:grid-cols-12">
                  <div className="md:col-span-7">
                    <div className="">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Nama Lengkap
                      </label>

                      <input
                        type="text"
                        value={form.nama ? form.nama : ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            nama: e.target.value,
                          })
                        }
                        placeholder="Masukkan Nama Lengkap"
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
            
          "
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Foto Profil
                      </label>

                      <input
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
                        {gambar ? (
                          <img
                            src={URL.createObjectURL(gambar)}
                            alt=""
                            className="w-full h-full"
                          />
                        ) : (
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/uploads/${form.gambar}`}
                            alt=""
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    </div>

                    {/*alamat*/}
                    <div className="w-[350px] md:w-[350px]">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Detail Biodata
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
                              uploadUrl: `${import.meta.env.VITE_BASE_URL}/api/upload`,
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    {/*isi*/}
                    <div className="w-[400px] md:w-full">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        NIP
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <input
                          type="text"
                          value={form.nip ? form.nip : ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              nip: e.target.value,
                            })
                          }
                          placeholder="Masukkan Jabatan Fungsional"
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

                    {/*isi*/}
                    <div className="w-[400px] md:w-full">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Jabatan Fungsional
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <input
                          type="text"
                          value={form.jabatan_f ? form.jabatan_f : ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              jabatan_f: e.target.value,
                            })
                          }
                          placeholder="Masukkan Jabatan Fungsional"
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

                    {/*isi*/}
                    <div className="w-[400px] md:w-full">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Jabatan Struktural
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <input
                          type="text"
                          value={form.jabatan_s ? form.jabatan_s : ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              jabatan_s: e.target.value,
                            })
                          }
                          placeholder="Masukkan Jabatan Fungsional"
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
                        Pendidikan Tertinggi
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <select
                          name=""
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
                          value={form.pendidikan ? form.pendidikan : ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              pendidikan: e.target.value,
                            })
                          }
                        >
                          <option value="" disabled>
                            Pilih
                          </option>
                          <option value="Sarjana(S1)">Sarjana</option>
                          <option value="Magister(S2)">Magister</option>
                          <option value="Doktor(S3)">Doktor</option>
                        </select>
                      </div>
                    </div>

                    {/*isi*/}
                    <div className="w-[400px] md:w-full">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <input
                          type="text"
                          value={form.email ? form.email : ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              email: e.target.value,
                            })
                          }
                          placeholder="Masukkan EMail"
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

                    {/*isi*/}
                    <div className="w-[400px] md:w-full">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Peran
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={
                              Array.isArray(form.peran) &&
                              form.peran.includes("Pimpinan Universitas")
                            }
                            onChange={() =>
                              handlePeranChange("Pimpinan Universitas")
                            }
                          />
                          Pimpinan Universitas
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={
                              Array.isArray(form.peran) &&
                              form.peran.includes("Pimpinan Senat")
                            }
                            onChange={() => handlePeranChange("Pimpinan Senat")}
                          />
                          Pimpinan Senat
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={
                              Array.isArray(form.peran) &&
                              form.peran.includes("Pimpinan Fakultas")
                            }
                            onChange={() =>
                              handlePeranChange("Pimpinan Fakultas")
                            }
                          />
                          Pimpinan Fakultas
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={
                              Array.isArray(form.peran) &&
                              form.peran.includes("Dosen")
                            }
                            onChange={() => handlePeranChange("Dosen")}
                          />
                          Dosen
                        </label>
                      </div>
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
