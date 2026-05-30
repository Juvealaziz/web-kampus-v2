import { useState, useEffect } from "react";
import Aside from "../../admin/Aside";
import Aheader from "./Aheader";
import PageL from "./PageL";
import axios from "axios";

export default function ASosial() {
  const [isEdit, setIsEdit] = useState(false);
  /* declare */
  const [form, setForm] = useState({
    id: null,
    fb: "",
    ig: "",
    yt: "",
  });
  //tampil
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/univ`)
      .then((res) => {
        setForm({
          id: res.data?.id ?? "",
          fb: res.data?.fb ?? "",
          ig: res.data?.ig ?? "",
          yt: res.data?.yt ?? "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* Store */
  const HandleUpdate = async () => {
    try {
      //update
      if (form.id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/univ/${form.id}`, {
          yt: form.yt,
          ig: form.ig,
          fb: form.fb,
        });

        alert("Berhasil Diperbarui");
        window.location.reload();
        setIsEdit(false);
      } else {
        const Store = await axios.post(`${import.meta.env.VITE_API_URL}/univ`, {
          yt: form.yt,
          ig: form.ig,
          fb: form.fb,
        });
        alert("Berhasil Ditambah");
        window.location.reload();

        //tombol simpan
        setForm((prev) => ({
          ...prev,
          id: Store.data.data.id,
        }));
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };
  return (
    <>
      <div className="bg-gray-100 h-full">
        {/* Sidebar */}
        <Aside />

       <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-9">
            <Aheader />
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-5 md:mx-12">
              <div className="border-b px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <h1 className="text-xl font-semibold">Ubah Informasi Kami</h1>
                <p className="text-sm text-blue-100">
                  Anda dapat mengubah isi melalui form dibawah
                </p>
              </div>
              <div className="p-6 spaceY-5">
                <div className="">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Header
                  </label>

                  <input
                    type="text"
                    value={"Sosmed"}
                    placeholder=""
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
                    disabled
                  />
                </div>

                {/*isi*/}
                <div className="w-[400px] md:w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Nama Facebook
                  </label>

                  <div className="border rounded-xl overflow-hidden shadow-sm">
                    <input
                      type="text"
                      disabled={!isEdit}
                      value={form.fb ? form.fb : ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          fb: e.target.value,
                        })
                      }
                      placeholder="Masukkan FB universitas...."
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
                </div>

                {/*isi*/}
                <div className="w-[400px] md:w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Nama Instagram
                  </label>

                  <div className="border rounded-xl overflow-hidden shadow-sm">
                    <input
                      type="text"
                      disabled={!isEdit}
                      value={form.ig ? form.ig : ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ig: e.target.value,
                        })
                      }
                      placeholder="Nama Ig unisap"
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
                </div>

                {/*isi*/}
                <div className="w-[400px] md:w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Nama Youtube
                  </label>

                  <div className="border rounded-xl overflow-hidden shadow-sm">
                    <input
                      type="text"
                      disabled={!isEdit}
                      value={form.yt ? form.yt : ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          yt: e.target.value,
                        })
                      }
                      placeholder="Nama YT unisap"
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
                        onClick={HandleUpdate}
                        type="button"
                        className="
            px-5 py-2
            rounded-xl
            bg-blue-700
            text-white
            hover:bg-blue-800
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
