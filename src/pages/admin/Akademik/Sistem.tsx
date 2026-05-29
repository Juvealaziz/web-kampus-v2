import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Aside from "../../admin/Aside";
import Aheader from "./Aheader";
import PageL from "./PageL";
import axios from "axios";

export default function ASistem() {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: null,
    judul: "",
    isi: "",
  });
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/pages")
      .then((res) => {
        const data = res.data.find((item: any) => item.judul === "Sistem");
        setForm({
          id: data?.id ?? null,
          judul: data?.judul ?? "Sistem",
          isi: data?.isi ?? "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = async () => {
    try {
      if (form.id) {
        await axios.put(`http://127.0.0.1:8000/api/pages/${form.id}`, {
          judul: form.judul,
          isi: form.isi,
        });

        alert("Berhasil update");
        window.location.reload();
        setIsEdit(false);
      } else {
        const res = await axios.post("http://127.0.0.1:8000/api/pages", {
          judul: form.judul,
          isi: form.isi,
        });

        alert("Berhasil tambah");
        window.location.reload();
        setIsEdit(false);

        // simpan id hasil create
        setForm((prev) => ({
          ...prev,
          id: res.data.data.id,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 h-full">
        {/* Sidebar */}
        <Aside />

        <div className="grid md:grid-cols-12 ">
          <div className="md:col-span-9">
            <Aheader />
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-5 md:mx-12">
              <div className="border-b px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <h1 className="text-xl font-semibold">
                  Ubah Konten Sistem Pembelajaran
                </h1>
                <p className="text-sm text-blue-100">
                  Anda dapat mengubah isi melalui form dibawah
                </p>
              </div>
              <div className="p-6 spaceY-5">
                <div className="">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Judul Artikel
                  </label>

                  <input
                    type="text"
                    value={form.judul ? form.judul : "Sistem"}
                    disabled={!isEdit || isEdit}
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
                      data={form.isi ?? ""}
                      disabled={!isEdit}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setForm((prev) => ({
                          ...prev,
                          isi: data,
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

                <div className="flex justify-end gap-3 pt-4">
                  {!isEdit ? (
                    <button
                      onClick={() => setIsEdit(true)}
                      type="button"
                      className="
            px-5 py-2
            rounded-xl
            border
            text-gray-600
            hover:bg-yellow-200
            transition
            bg-yellow-400
          "
                    >
                      Ubah
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEdit(false)}
                        type="button"
                        className="
            px-5 py-2
            rounded-xl
            border
            text-gray-600
            hover:bg-gray-100
            transition
          "
                      >
                        Batal
                      </button>

                      <button
                        onClick={handleUpdate}
                        disabled={!isEdit}
                        type="button"
                        className="
            px-5 py-2
            rounded-xl
            bg-blue-700
            text-white
            hover:bg-blue-800
            disabled:bg-gray-400
            shadow-md
            transition
          "
                      >
                        Simpan
                      </button>
                    </>
                  )}
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
