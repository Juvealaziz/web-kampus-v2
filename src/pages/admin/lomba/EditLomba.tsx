import { useState, useEffect } from "react";
import Aside from "../Aside";
import PageL from "./PageL";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function EditLomba() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    id: null,
    judul: "",
    desk: "",
    tipe: "lomba",
  });

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/UKM/${id}`)
      .then((res) => {
        console.log("FULL RESPONSE:", res);
        console.log("res.data:", res.data);
        setForm(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleUpdate = async () => {
    if (!form.judul || !form.desk || !form.id) {
      alert("Data belum lengkap!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("judul", form.judul);
      formData.append("desk", form.desk);
      formData.append("tipe", form.tipe);
      formData.append("_method", "PUT");

      await axios.post(`${import.meta.env.VITE_API_URL}/UKM/${form.id}`, formData);

      alert("Berhasil Diperbarui");
      navigate("/admin-lomba");
    } catch (error: any) {
      console.log("ERROR:", error.response?.data);
      alert("Gagal update");
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
                    Update
                  </button>
                  <a
                    href="/admin-lomba"
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
                <h1 className="text-xl font-semibold">Form Lomba</h1>
                <p className="text-sm text-blue-100">
                  Anda dapat isi artikel melalui form dibawah
                </p>
              </div>
              <div className="p-6 spaceY-5">
                <div className="">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Judul Lomba
                  </label>

                  <input
                    type="text"
                    value={form.judul}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        judul: e.target.value,
                      })
                    }
                    placeholder="Masukkan judul artikel..."
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
                          uploadUrl: `${import.meta.env.VITE_BASE_URL}/api/upload`,
                        },
                      }}
                    />
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
