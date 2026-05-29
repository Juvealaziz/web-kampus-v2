import Aheader from "../Layanan/Aheader";
import Aside from "../Aside";
import PageL from "./PageL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function AProdi() {
  const [pages, setPages] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //Tampil data
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/prodi").then((res) => {
      setPages(res.data);
    });
  }, []);
  const filteredData = pages.filter((item: any) =>
    item.nama?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (id) => {
    navigate(`/admin-prodi/${id}`);
  };
  const handleDelete = async (id) => {
    if (confirm("Apakah kamu yakin ingin menghapus data ini?")) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/prodi/${id}`,
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

  return (
    <>
      <div className="bg-gray-100 h-full">
        {/* Sidebar */}
        <Aside />
        <div className="grid md:grid-cols-12 ">
          <div className="md:col-span-6 ">
            <div className="bg-transparent mb-12">
              <nav className="flex   mx-auto  justify-center mt-12 p-4 shadow-xl border-xl rounded-lg w-[80%] md:w-full">
                <div className="flex ml-auto gap-4">
                  <a
                    href="/admin-Fakultas"
                    className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
                  >
                    Fakultas
                  </a>
                  <a
                    href="/admin-Prodi"
                    className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
                  >
                    Prodi
                  </a>
                </div>
              </nav>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden    md:w-full">
              <div className=" flex border-b px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <div className="">
                  <h1 className="text-xl font-semibold">Prodi</h1>
                  <p className="text-sm text-blue-100">
                    Anda dapat mengubah isi melalui form dibawah
                  </p>
                </div>
                <div className="ml-auto">
                  <h1 className="text-sm font-semibold ">Cari</h1>
                  <div className="bg-gray-200 py-1 px-1 border border-black/100 rounded-xl hover:border-green/100 hover:bg-gray-100">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      id=""
                      className="outline-none bg-transparent text-black px-2 w-20 md:w-40"
                    />
                    <button disabled>
                      <FaSearch className="text-black  hover:scale-410 duration-300 text-lg" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 spaceY-5">
                <div className="overflow-x-auto ">
                  <table className="w-full text-sm text-left bg-gray-50 text-gray-700 text-left mt-2 mb-2">
                    <thead className="uppercase text-xs">
                      <tr>
                        <th className="p-3">No</th>
                        <th className="p-3">Nama</th>
                        <th className="p-3">tanggal</th>
                        <th className="p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="border border-black/200">
                      {filteredData.map((item, index) => (
                        <tr className="" key={item.id}>
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{item.nama}</td>

                          <td className="p-3">
                            {item.created_at.split("T")[0]}
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
          <div className="md:col-span-6 mt-4 md:mt-0">
            <PageL />
          </div>
        </div>
      </div>
    </>
  );
}
