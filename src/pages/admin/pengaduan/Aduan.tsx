import Aside from "../Aside";
import Aheader from "./Aheader";
import PageL from "./PageL";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Aduan() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/pengaduan").then((res) => {
      console.log("Respon API:", res.data);
      setData(res.data);
    });
  }, []);
  const filteredData = data.filter((item: any) =>
    item.email?.toLowerCase().includes(search.toLowerCase()),
  );
  const currentData = filteredData.slice(start, end);
  return (
    <>
      <div className="bg-gray-100 h-full">
        {/* Sidebar */}
        <Aside />

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="col-span-1 md:col-span-9">
            <Aheader />
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mx-5 md:mx-12">
              <div className="flex border-b px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <div className="">
                  <h1 className="text-xl font-semibold">Tabel Pengaduan</h1>
                  <p className="text-sm text-blue-100">
                    Anda dapat mengelola data ini
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
                      <th className="p-3">Email</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Pesan</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="border border-black/200">
                    {currentData.map((item: any, index: number) => {
                      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=${encodeURIComponent(`Re: ${item.subject}`)}&body=${encodeURIComponent(`Halo ${item.nama},\n\nMenanggapi pesan Anda mengenai: "${item.pesan}"\n\n`)}`;
                      return (
                        <tr className="" key={index}>
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3"> {item.nama}</td>
                          <td className="p-3">
                            {" "}
                            <a href={`mailto:${item.email}`}> {item.email} </a>
                          </td>
                          <td className="p-3"> {item.subject}</td>
                          <td className="p-3"> {item.pesan}</td>
                          <td className="p-3"> {item.status}</td>
                          <td className="p-3 md:flex ">
                            <a
                              href={gmailLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn bg-blue-400 text-white p-0.5 hover:bg-blue-500 w-12 border border-black/10 rounded-sm"
                            >
                              Balas
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {data.length > 0 && (
                  <div className="flex justify-center gap-3 mt-10 mb-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 rounded-xl bg-gray-200"
                    >
                      Prev
                    </button>

                    <span className="px-4 py-2">{page}</span>

                    <button
                      disabled={end >= data.length}
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 rounded-xl bg-gray-200"
                    >
                      Next
                    </button>
                  </div>
                )}
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
