import Aside from "../Aside";
import Aheader from "./Aheader";
import PageL from "./PageL";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilData() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/profil").then((res) => {
      setData(res.data);
    });
  }, []);
  const filteredData = data.filter(
    (item: any) =>
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.nip?.toLowerCase().includes(search.toLowerCase()),
  );
  const handleDelete = async (id) => {
    if (confirm("Apakah kamu yakin ingin menghapus data ini?")) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/profil/${id}`,
        );

        alert(response.data.message);

        // langsung update state tanpa reload
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus data.");
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/editProfil/${id}`);
  };

  return (
    <>
      <div className="bg-gray-100 h-full">
        {/* Sidebar */}
        <Aside />

        <div className="grid md:grid-cols-12 ">
          <div className="md:col-span-9">
            <Aheader />
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mx-5 md:mx-12">
              <div className="flex border-b px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <div className="">
                  <h1 className="text-xl font-semibold">
                    Tabel Data Dosen,Dekan,Pimpinan
                  </h1>
                  <p className="text-sm text-blue-100">
                    Anda dapat mengelola artikel dibawah ini
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
              <div className="overflow-x-auto ">
                <table className="w-full text-sm text-left bg-gray-50 text-gray-700 text-left mt-2 mb-2">
                  <thead className="uppercase text-xs">
                    <tr>
                      <th className="p-3">No</th>
                      <th className="p-3">Nama </th>
                      <th className="p-3">Nip</th>
                      <th className="p-3">Peran</th>
                      <th className="p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="border border-black/200">
                    {filteredData.map((item: any, index: number) => (
                      <tr className="" key={index}>
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3"> {item.nama}</td>
                        <td className="p-3">{item.nip}</td>
                        <td className="p-3">{item.peran}</td>
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
          <div className="md:col-span-3">
            <PageL />
          </div>
        </div>
      </div>
    </>
  );
}
