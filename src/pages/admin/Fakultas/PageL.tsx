import { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Navigate, useParams } from "react-router-dom";

export default function PageL() {
  const [isTambah, setIsTambah] = useState(false);
  const [gambar, setGambar] = useState<File | null>(null);

  const { id } = useParams();
  const [form, setForm] = useState({
    id: null,
    nama: "",
    desk: "",
    no_telp: "",
    email: "",
    alamat: "",
    url: "",
    fb: "",
    yt: "",
    ig: "",
    gambar: null,
  });
  //Tampil data
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/fakultas/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);
  //update data
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("nama", form.nama);
      formData.append("desk", form.desk);
      formData.append("no_telp", form.no_telp);
      formData.append("email", form.email);
      formData.append("alamat", form.alamat);
      formData.append("url", form.url);
      formData.append("fb", form.fb);
      formData.append("yt", form.yt);
      formData.append("ig", form.ig);
      formData.append("_method", "PUT");

      if (gambar) {
        formData.append("gambar", gambar);
      }

      await axios.post(
        `http://127.0.0.1:8000/api/fakultas/${form.id}`,
        formData,
      );

      alert("Berhasil update");
      window.location.reload();
      setIsTambah(false);
    } catch (error: any) {
      console.log("ERROR:", error.response?.data);
      alert("Gagal update");
    }
  };

  //Isi data untuk backend
  const handlecreate = async () => {
    //alert eror
    const requiredFields = ["nama", "email", "no_telp"];
    for (const field of requiredFields) {
      if (!form[field]) {
        alert(`${field} wajib diisi`);

        return;
      }
    }
    try {
      const formData = new FormData();

      formData.append("nama", form.nama);
      formData.append("desk", form.desk);
      formData.append("no_telp", form.no_telp);
      formData.append("email", form.email);
      formData.append("alamat", form.alamat);
      formData.append("url", form.url);
      formData.append("fb", form.fb);
      formData.append("yt", form.yt);
      formData.append("ig", form.ig);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/fakultas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Berhasil tambah");
      setIsTambah(false);
      window.location.reload();
    } catch (error: any) {
      if (error.response?.status === 422) {
        alert(error.response.data.message);
      } else {
        alert("Terjadi kesalahan");
      }
    }
  };

  return (
    <>
      {/* CARD */}

      <div className="w-[500px] md:w-[80%] ml-auto">
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
            <div className="p-6 flex">
              {!isTambah ? (
                <button
                  onClick={() => setIsTambah(true)}
                  className="ml-auto bg-blue-300 p-1 text-white border border-black/20 rounded-lg"
                >
                  {id ? "Edit Data" : "Tambah Data"}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsTambah(false)}
                    type="button"
                    className="
          ml-auto bg-gray-300 p-1 text-white border border-black/20 rounded-lg mr-2
        "
                  >
                    Batal
                  </button>

                  <button
                    onClick={id ? handleUpdate : handlecreate}
                    type="button"
                    className="
          bg-blue-300 p-1 text-white border border-black/20 rounded-lg
        "
                  >
                    Simpan
                  </button>
                </>
              )}
            </div>
            <hr className="mb-2" />
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Input Nama Fakultas
                  </label>

                  <input
                    type="text"
                    placeholder="Nama Fakultas"
                    value={form.nama}
                    disabled={!isTambah}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nama: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded-lg"
                  />
                </div>
                <div className="p-6 -mt-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    No telp Fakultas
                  </label>

                  <input
                    type="text"
                    placeholder="Nomor Fakultas"
                    value={form.no_telp}
                    disabled={!isTambah}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        no_telp: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded-lg"
                  />
                </div>

                <div className="p-6 -mt-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email Fakultas
                  </label>

                  <input
                    type="text"
                    placeholder="Email Fakultas"
                    value={form.email}
                    disabled={!isTambah}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="md:col-span-8">
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Alamat
                  </label>

                  <input
                    type="text"
                    placeholder="Alamat Fakultas"
                    value={form.alamat}
                    disabled={!isTambah}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        alamat: e.target.value,
                      })
                    }
                    className="border p-2 w-full rounded-lg"
                  />
                </div>
                <div className="grid md:grid-cols-12">
                  <div className="col-span-6">
                    <div className="p-6 -mt-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Instagram
                      </label>

                      <input
                        type="text"
                        placeholder="Ig Fakultas"
                        value={form.ig}
                        disabled={!isTambah}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            ig: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-lg"
                      />
                    </div>
                    <div className="p-6 -mt-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        URL Web Fakultas
                      </label>

                      <input
                        type="text"
                        placeholder="Url"
                        value={form.url}
                        disabled={!isTambah}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            url: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="p-6 -mt-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Facebook
                      </label>

                      <input
                        type="text"
                        placeholder="Fb Fakultas"
                        value={form.fb}
                        disabled={!isTambah}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            fb: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-lg"
                      />
                    </div>
                    <div className="p-6 -mt-2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Youtube
                      </label>

                      <input
                        type="text"
                        placeholder="Yt Fakultas"
                        value={form.yt}
                        disabled={!isTambah}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            yt: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Barcode Fakultas
              </label>
              <input
                required
                type="file"
                disabled={!isTambah}
                name=""
                id=""
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setGambar(e.target.files[0]);
                  }
                }}
              />
              <div className="border border-black/20 w-[50%] h-[50%] mt-2">
                {gambar ? (
                  <img
                    src={URL.createObjectURL(gambar)}
                    alt=""
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={`http://127.0.0.1:8000/uploads/${form.gambar}`}
                    alt=""
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Konten
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={form.desk ? form.desk : ""}
                disabled={!isTambah}
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
    </>
  );
}
