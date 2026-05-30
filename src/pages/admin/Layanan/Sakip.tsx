import Aside from "../Aside";
import Aheader from "./Aheader";
import PageL from "./PageL";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ASakip() {
  const [pages, setPages] = useState<any[]>([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/Data_Unduh`)
      .then((res) => {
        const filtered = res.data.filter((item: any) => item.tipe === "sakip");

        setPages(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //hapus
  const handleDelete = async (id) => {
    if (confirm("Apakah kamu yakin ingin menghapus data ini?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/Data_Unduh/${id}`,
        );

        alert(response.data.message);
        // langsung update state tanpa reload
        setData(data.filter((item) => item.id !== id));
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus data.");
      }
    }
  };
  //edit
  const handleEdit = (id) => {
    navigate(`/admin-sakip/${id}`);
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
                <h1 className="text-xl font-semibold">Sakip</h1>
                <p className="text-sm text-blue-100">
                  Anda dapat mengubah isi melalui form dibawah
                </p>
              </div>
              <div className="p-6 spaceY-5">
                <div className="overflow-x-auto ">
                  <table className="w-full text-sm text-left bg-gray-50 text-gray-700 text-left mt-2 mb-2">
                    <thead className="uppercase text-xs">
                      <tr>
                        <th className="p-3">No</th>
                        <th className="p-3">Judul</th>
                        <th className="p-3">File</th>
                        <th className="p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="border border-black/200">
                      {pages.map((item, index) => (
                        <tr className="" key={item.id}>
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{item.judul}</td>
                          <td className="p-3">
                            <a
                              href={`http://127.0.0.1:8000/storage/${item.file_path}`}
                              className="text-blue-400"
                              download
                            >
                              Unduh
                            </a>
                          </td>
                          <td className="p-3 md:flex ">
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="btn bg-blue-400 text-white p-0.5 hover:bg-blue-500 w-12 border border-black/10 rounded-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="mt-2 md:mt-0 md:ml-2 btn bg-red-400 text-white p-0.5 hover:bg-red-500 w-12 border border-black/10 rounded-sm"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
