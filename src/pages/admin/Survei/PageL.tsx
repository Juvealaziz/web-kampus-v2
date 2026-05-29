import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
export default function PageL() {
  const [isTambah, setIsTambah] = useState(false);
  const { id } = useParams();

  const [form, setForm] = useState({
    id: null,
    judul: "",
    tipe: "survei",
    url: "",
    status: "",
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
      formData.append("url", form.url);
      formData.append("status", form.status);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/Data_Unduh",
        formData,
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
      formData.append("url", form.url);
      formData.append("status", form.status);
      formData.append("_method", "PUT");

      await axios.post(
        `http://127.0.0.1:8000/api/Data_Unduh/${form.id}`,
        formData,
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
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Input Judul Link
                </label>

                <input
                  type="text"
                  placeholder="Masukkan judul Google Form"
                  value={form.judul}
                  disabled={!isTambah}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      judul: e.target.value,
                    })
                  }
                  className="border p-2 w-full rounded-lg"
                />
              </div>

              <div className="p-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Input Link Gform Anda
                </label>

                <input
                  type="text"
                  placeholder="Masukkan Link Google Form"
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
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Status link
                </label>
                <select
                  value={form.status}
                  disabled={!isTambah}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                  name=""
                  id=""
                  className="border p-2 w-full rounded-lg"
                >
                  <option value="" disabled>
                    pilih status
                  </option>
                  <option value="aktif">aktif</option>
                  <option value="nonaktif">nonaktif</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
