import { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Navigate, useParams } from "react-router-dom";

export default function PageL() {
  const [isTambah, setIsTambah] = useState(false);
  const [fakultas, setFakultas] = useState<any[]>([]);

  const { id } = useParams();
  const [form, setForm] = useState({
    id: null,
    id_fakultas: "",
    nama: "",
    desk: "",
    program: "",
  });
  //Tampil data
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/prodi/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);
  //update data
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("id_fakultas", form.id_fakultas);
      formData.append("nama", form.nama);
      formData.append("desk", form.desk);
      formData.append("program", form.program);
      formData.append("_method", "PUT");

      await axios.post(`${import.meta.env.VITE_API_URL}/prodi/${form.id}`, formData);

      alert("Berhasil update");
      setIsTambah(false);
      window.location.reload();
    } catch (error: any) {
      console.log("ERROR:", error.response?.data);
      alert("Gagal update");
    }
  };

  //Isi data untuk backend
  const handlecreate = async () => {
    try {
      const formData = new FormData();

      formData.append("id_fakultas", form.id_fakultas);
      formData.append("nama", form.nama);
      formData.append("desk", form.desk);
      formData.append("program", form.program);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/prodi`,
        formData,
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

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/fakultas`).then((res) => {
      setFakultas(res.data);
    });
  }, []);

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

            <div className="p-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Input Nama Prodi
              </label>

              <input
                type="text"
                placeholder="Nama Prodi"
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
                Program
              </label>

              <select
                value={form.program}
                onChange={(e) =>
                  setForm({
                    ...form,
                    program: e.target.value,
                  })
                }
                className="border p-2 w-full"
              >
                <option value="">Pilih Program</option>
                <option value="Sarjana">S1</option>
                <option value="Magister">S2</option>
                <option value="Doktor">S3</option>
              </select>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Pilih Fakultas
              </label>

              <select
                disabled={!isTambah}
                value={form.id_fakultas}
                onChange={(e) =>
                  setForm({
                    ...form,
                    id_fakultas: e.target.value,
                  })
                }
                className="border p-2 w-full"
              >
                <option value="">Pilih Fakultas</option>

                {fakultas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
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
                    uploadUrl: `${import.meta.env.VITE_BASE_URL}/api/upload`,
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
