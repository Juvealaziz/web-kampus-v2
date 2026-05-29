import { useState, useEffect } from "react";
import Aside from "../../admin/Aside";
import Aheader from "./Aheader";
import PageL from "./PageL";
import axios from "axios";

export default function AHubungi() {
  const [isEdit, setIsEdit] = useState(false);
  /* declare */
  const [form, setForm] = useState({
    id: null,
    no_telp: "",
    email: "",
  });
  //tampil
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/univ")
      .then((res) => {
        setForm({
          id: res.data?.id ?? "",
          no_telp: res.data?.no_telp ?? "",
          email: res.data?.email ?? "",
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
        await axios.put(`http://127.0.0.1:8000/api/univ/${form.id}`, {
          no_telp: form.no_telp,
          email: form.email,
        });

        alert("Berhasil Diperbarui");
        window.location.reload();
        setIsEdit(false);
      } else {
        const Store = await axios.post("http://127.0.0.1:8000/api/univ", {
          no_telp: form.no_telp,
          email: form.email,
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

        <div className="grid md:grid-cols-12 ">
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
                    value={"Kontak"}
                    placeholder="Masukkan Email Universitas"
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
                    E-Mail
                  </label>

                  <div className="border rounded-xl overflow-hidden shadow-sm">
                    <input
                      type="text"
                      disabled={!isEdit}
                      value={form.email ? form.email : ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      placeholder="Masukkan Email universitas...."
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
                    No Telpon
                  </label>

                  <div className="border rounded-xl overflow-hidden shadow-sm">
                    <input
                      type="text"
                      disabled={!isEdit}
                      value={form.no_telp ? form.no_telp : ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          no_telp: e.target.value,
                        })
                      }
                      placeholder="Masukkan No Telepon Universitas"
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
