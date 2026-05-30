import { useState, useEffect } from "react";
import Aside from "../Aside";
import Aheader from "./Aheader";
import PageL from "./PageL";
import axios from "axios";
import { data } from "react-router-dom";

export default function AUniversitas() {
  const [isEdit, setIsEdit] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  /* declare */
  const [form, setForm] = useState({
    id: null,
    nama_univ: "",
    alamat: "",
    link_alamat: "",
    desk: "",
    logo: "",
  });
  //tampil
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/univ`)
      .then((res) => {
        setForm({
          id: res.data?.id ?? "",
          nama_univ: res.data?.nama_univ ?? "",
          alamat: res.data?.alamat ?? "",
          link_alamat: res.data?.link_alamat ?? "",
          desk: res.data?.desk ?? "",
          logo: res.data?.logo ?? "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* Store */
  const HandleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("nama_univ", form.nama_univ);
      formData.append("alamat", form.alamat);
      formData.append("link_alamat", form.link_alamat);
      formData.append("desk", form.desk);

      // tambah gambar
      if (logo) {
        formData.append("logo", logo);
      }

      // update
      if (form.id) {
        formData.append("_method", "PUT");
        console.log(logo);
        console.log(formData.get("logo"));
        await axios.post(`${import.meta.env.VITE_API_URL}/univ/${form.id}`, formData);

        alert("Berhasil Diperbarui");
        window.location.reload();
        setIsEdit(false);
      } else {
        const Store = await axios.post(
          `${import.meta.env.VITE_API_URL}/univ`,
          formData,
        );

        alert("Berhasil Ditambah");
        window.location.reload();
        setIsEdit(false);

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
                    disabled
                    type="text"
                    value={"Universitas"}
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
                  />
                </div>

                <div className="grid md:grid-cols-12">
                  <div className="md:col-span-7">
                    <div className="">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Logo Universtis
                      </label>

                      <input
                        type="file"
                        name=""
                        id=""
                        disabled={!isEdit}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setLogo(e.target.files[0]);
                          }
                        }}
                      />
                      <div className="border border-black/20 w-[300px] h-[300px] mt-2">
                        {isEdit ? (
                          logo ? (
                            <img
                              src={URL.createObjectURL(logo)}
                              alt=""
                              className="w-full h-full"
                            />
                          ) : (
                            <img
                              src={`http://127.0.0.1:8000/uploads/${form.logo}`}
                              alt=""
                              className="w-full h-full"
                            />
                          )
                        ) : (
                          <img
                            src={`http://127.0.0.1:8000/uploads/${form.logo}`}
                            alt=""
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    </div>

                    {/*alamat*/}
                    <div className="w-[350px] md:w-[350px]">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Deskripsi Singkat Universitas
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <textarea
                          name=""
                          value={form.desk ? form.desk : ""}
                          disabled={!isEdit}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              desk: e.target.value,
                            })
                          }
                          className="
            w-[350px]
            h-[200px]
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

                  <div className="md:col-span-5">
                    {/*isi*/}
                    <div className="w-[400px] md:w-full">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Nama Universtis
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <input
                          type="text"
                          disabled={!isEdit}
                          value={form.nama_univ ? form.nama_univ : ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              nama_univ: e.target.value,
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
                    </div>

                    {/*alamat*/}
                    <div className="w-[400px] md:w-full">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Alamat Universitas
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <textarea
                          name=""
                          value={form.alamat ? form.alamat : ""}
                          disabled={!isEdit}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              alamat: e.target.value,
                            })
                          }
                          className="
            w-full
            h-[200px]
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
                        Link Google Maps
                      </label>

                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <input
                          type="url"
                          disabled={!isEdit}
                          value={form.link_alamat ? form.link_alamat : ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              link_alamat: e.target.value,
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
                    </div>
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
