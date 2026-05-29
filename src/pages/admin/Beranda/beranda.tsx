import Aheader from "../Layanan/Aheader";
import Aside from "../Aside";
import PageL from "./PageL";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ABeranda() {
  const [pages, setPages] = useState<any[]>([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/Data_Unduh")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.tipe === "video_kampus" || item.tipe === "poster",
        );

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
          `http://127.0.0.1:8000/api/Data_Unduh/${id}`,
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
    navigate(`/admin-beranda/${id}`);
  };
  return (
    <>
      <div className="bg-gray-100 h-full">
        {/* Sidebar */}
        <Aside />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* MAIN CONTENT */}
          <div className="md:col-span-9 w-full">
            {/* NAV */}
            <div className="mb-6">
              <nav className="flex justify-center mt-6 md:mt-12 p-3 md:p-4 shadow-xl rounded-lg w-full max-w-4xl mx-auto">
                <div className="flex gap-4">
                  <a
                    href="/admin-beranda"
                    className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
                  >
                    Beranda
                  </a>
                </div>
              </nav>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-2 md:mx-6">
              <div className="border-b px-4 md:px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <h1 className="text-lg md:text-xl font-semibold">Beranda</h1>
                <p className="text-xs md:text-sm text-blue-100">
                  Anda dapat mengubah isi melalui form dibawah
                </p>
              </div>

              <div className="p-4 md:p-6">
                {/* TABLE WRAPPER RESPONSIVE */}
                <div className="overflow-x-auto">
                  <table className="min-w-[600px] w-full text-sm text-left bg-gray-50 text-gray-700">
                    <thead className="uppercase text-xs">
                      <tr>
                        <th className="p-3">No</th>
                        <th className="p-3">Judul</th>
                        <th className="p-3">File</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pages.map((item, index) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{item.judul}</td>

                          <td className="p-3">
                            <a
                              href={`${import.meta.env.VITE_API_URL}/storage/${item.file_path}`}
                              className="text-blue-500 break-all"
                              download
                            >
                              {item.file_path}
                            </a>
                          </td>

                          <td className="p-3">{item.tipe}</td>

                          <td className="p-3">
                            <div className="flex flex-col md:flex-row gap-2">
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="md:col-span-3 w-full">
            <PageL />
          </div>
        </div>
      </div>
    </>
  );
}
