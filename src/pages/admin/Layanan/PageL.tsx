import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function PageL() {
  const [isTambah, setIsTambah] = useState(false);
  const [file_path, setFile] = useState<File | null>(null);
  const { id } = useParams();
  const [form, setForm] = useState({
    id: null,
    judul: "",
    file_path: "",
    tipe: "sakip",
  });
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/Data_Unduh/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handlecreate = async () => {
    try {
      const formData = new FormData();

      formData.append("judul", form.judul);
      formData.append("tipe", form.tipe);

      if (file_path) {
        formData.append("file", file_path);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/Data_Unduh",
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
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
    }
  };

  //update data
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("judul", form.judul);
      formData.append("tipe", form.tipe);
      formData.append("_method", "PUT");

      if (file_path) {
        formData.append("file", file_path);
      }

      await axios.post(
        `http://127.0.0.1:8000/api/Data_Unduh/${form.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Berhasil update");
      setIsTambah(false);
      window.location.reload();
    } catch (error: any) {
      console.log("ERROR:", error.response?.data);
      alert("Gagal update");
    }
  };
  return (
    <>
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
              <div className="p-6 flex  ">
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
              <div className="p-6 -mt-8">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Input Judul
                </label>
                <input
                  disabled={!isTambah}
                  type="text"
                  value={form.judul}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      judul: e.target.value,
                    })
                  }
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

              <div className="p-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Input File
                </label>
                <input
                  type="file"
                  disabled={!isTambah}
                  name=""
                  id=""
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
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
          </div>
        </div>
      </div>
    </>
  );
}
