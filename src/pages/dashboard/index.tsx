import Aside from "../admin/Aside";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FaBasketballBall,
  FaEnvelope,
  FaGlobe,
  FaUser,
  FaCircle,
} from "react-icons/fa";
import {} from "recharts";
import Modal from "./modal";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashdata() {
  ///admin
  const [selectedUser, setSelectedUser] = useState(null);
  const [data_login, setData_login] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 2;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users").then((res) => {
      setData_login(res.data);
    });
  }, []);
  const [search, setSearch] = useState("");
  const filteredData = data_login.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()),
  );
  const filter = filteredData.slice(start, end);

  const handleDelete = async (id) => {
    if (confirm("Apakah kamu yakin ingin menghapus data ini?")) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/users/${id}`,
        );

        alert(response.data.message);

        // langsung update state tanpa reload
        setData_login(data_login.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus data.");
      }
    }
  };

  //==========================================================================================//
  // UKM
  const [Ukms, setUkms] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/UKM").then((res) => {
      setUkms(res.data);
    });
  }, []);

  const pengumuman = Ukms.filter((item: any) =>
    item.tipe?.includes("pengumuman"),
  ).length;

  const prestasi = Ukms.filter((item: any) =>
    item.tipe?.includes("prestasi"),
  ).length;

  const ukm = Ukms.filter((item: any) => item.tipe?.includes("ukm")).length;

  const lomba = Ukms.filter((item: any) => item.tipe?.includes("lomba")).length;
  const berita = Ukms.filter((item: any) =>
    item.tipe?.includes("Berita"),
  ).length;

  const b_p = Ukms.filter((item: any) =>
    item.status?.includes("Berita Pilihan"),
  ).length;
  const b_u = Ukms.filter((item: any) =>
    item.status?.includes("Berita Utama"),
  ).length;
  const b_l = berita - b_u - b_p;

  // =====

  // Data pegawai

  const [Pegawe, setPegawe] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/profil").then((res) => {
      setPegawe(res.data);
    });
  }, []);
  const dosen = Pegawe.filter((item: any) =>
    item.peran?.includes("Dosen"),
  ).length;
  const p_univ = Pegawe.filter((item: any) =>
    item.peran?.includes("Pimpinan Universitas"),
  ).length;
  const p_fak = Pegawe.filter((item: any) =>
    item.peran?.includes("Pimpinan Fak"),
  ).length;
  const p_senat = Pegawe.filter((item: any) =>
    item.peran?.includes("Pimpinan Senat"),
  ).length;
  const pegawai = [
    { name: "Dosen", value: dosen },
    { name: "P.Univ", value: p_univ },
    { name: "P. Fak", value: p_fak },
    { name: "P. Senat", value: p_senat },
  ];
  const COLORS_Pegawai = [
    "#2563eb", // d
    "#f59e0b", // u
    "#b4b4b4", // f
    "#16a34a", // s
  ];

  //=====
  //Fakultas
  const [fklts, setFklts] = useState([]);
  const [prodi, setProdi] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/fakultas/`)
      .then((res) => {
        setFklts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://127.0.0.1:8000/api/prodi").then((res) => {
      setProdi(res.data);
    });
  }, []);

  const fakultas = fklts.map((item: any) => ({
    fakultas: item.nama,
    prodi: prodi.filter((p: any) => p.id_fakultas === item.id).length,
  }));

  //=======
  //Berita

  const data = [
    { name: "Berita Pilihan", value: b_p },
    { name: "Berita Utama", value: b_u },
    { name: "Berita Lainnya", value: b_l },
  ];

  const COLORS = ["#2563eb", "#16a34a", "#f59e0b"];
  //====
  //Download
  const [File_d, setFile_d] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/Data_Unduh").then((res) => {
      setFile_d(res.data);
    });
  }, []);
  const fl = File_d.length;
  const sakip = File_d.filter((item: any) =>
    item.tipe?.includes("sakip"),
  ).length;
  const K_e = File_d.filter((item: any) =>
    item.tipe?.includes("kode_etik"),
  ).length;
  const K_a = File_d.filter((item: any) =>
    item.tipe?.includes("akreditasi"),
  ).length;

  const file_doc = [
    { name: "File Sakip", value: sakip },
    { name: "File kode Etik", value: K_e },
    { name: "File Akreditasi", value: K_a },
  ];
  const COLORSFile = ["#2563eb", "#16a34a", "#f59e0b"];

  //=====
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-100 h-full ">
        {/* Sidebar */}
        <Aside />
        <div className="bg-gray-100 h-full md:p-6 ">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="col-span-6">
              <div className="grid md:grid-cols-12 gap-2">
                <div className="col-span-6  bg-white rounded-2xl shadow-lg p-4 overflow-hidden">
                  <div className="flex gap-2">
                    <img
                      src="https://www.nicepng.com/png/detail/240-2403733_news-icon-png-transparent.png"
                      alt=""
                      className="w-12 h-12"
                    />
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-xl">
                        Jumlah Berita
                      </label>
                      <span>2025/2026</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col text-center">
                      <label htmlFor="" className="font-bold text-lg">
                        {berita} Berita
                      </label>
                      <span>statistic</span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-4 overflow-hidden">
                      <div className="flex justify-center">
                        <PieChart width={220} height={180}>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="40%"
                            outerRadius={50}
                            dataKey="value"
                            label={({ percent }) =>
                              `${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {data.map((entry, index) => (
                              <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>

                          <Legend
                            verticalAlign="bottom"
                            wrapperStyle={{
                              fontSize: "10px",
                              paddingTop: "5px",
                            }}
                          />

                          <Tooltip
                            contentStyle={{
                              borderRadius: "12px",
                              border: "none",
                            }}
                          />
                        </PieChart>
                      </div>
                    </div>
                  </div>
                  <div className=""></div>
                </div>
                <div className="col-span-6  bg-white rounded-2xl shadow-lg p-4 overflow-hidden">
                  <div className="flex gap-2">
                    <img
                      src="https://www.nicepng.com/png/detail/240-2403733_news-icon-png-transparent.png"
                      alt=""
                      className="w-12 h-12"
                    />
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-xl">
                        Jumlah File
                      </label>
                      <span>2025/2026</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col text-center">
                      <label htmlFor="" className="font-bold text-lg">
                        {fl} File
                      </label>
                      <span>statistic</span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-4 overflow-hidden">
                      <div className="flex justify-center">
                        <PieChart width={220} height={180}>
                          <Pie
                            data={file_doc}
                            cx="50%"
                            cy="40%"
                            outerRadius={50}
                            dataKey="value"
                            label={({ percent }) =>
                              `${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {data.map((entry, index) => (
                              <Cell
                                key={index}
                                fill={COLORSFile[index % COLORS.length]}
                              />
                            ))}
                          </Pie>

                          <Legend
                            verticalAlign="bottom"
                            wrapperStyle={{
                              fontSize: "10px",
                              paddingTop: "5px",
                            }}
                          />

                          <Tooltip
                            contentStyle={{
                              borderRadius: "12px",
                              border: "none",
                            }}
                          />
                        </PieChart>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 bg-white rounded-2xl shadow-lg p-4">
                  <div className="mb-4">
                    <h1 className="text-xl font-bold">Statistik Fakultas</h1>

                    <p className="text-gray-500 text-sm">
                      Jumlah Program Studi
                    </p>
                  </div>

                  <div className="w-full h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={fakultas}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="fakultas" />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="prodi" radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-6 md:ml-12">
              {/*grid colom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                <div className="bg-blue-500 hover:bg-blue-600 h-24 border rounded-lg flex p-2 border-black/20 shadow-2xl">
                  <FaEnvelope className="h-8 w-8" />
                  <div className="">
                    <h1 className="text-sm py-1 text-white">Pengumuman</h1>
                    <h1 className="text-2xl text-white py-2">{pengumuman}</h1>
                  </div>
                </div>
                <div className="bg-green-600 hover:bg-green-700 h-24 border rounded-lg flex p-2 border-black/20 shadow-2xl">
                  <FaUser className="h-8 w-8" />
                  <div className="">
                    <h1 className="text-sm py-1 text-white">Prestasi</h1>
                    <h1 className="text-2xl text-white py-2">{prestasi}</h1>
                  </div>
                </div>
                <div className="bg-orange-600 gap-2 hover:bg-orange-700 h-24 border rounded-lg flex p-2 border-black/20 shadow-2xl">
                  <FaBasketballBall className="h-8 w-8" />
                  <div className="">
                    <h1 className="text-sm py-1 text-white">UKM</h1>
                    <h1 className="text-2xl text-white py-2">{ukm}</h1>
                  </div>
                </div>

                <div className="bg-red-600 gap-2 hover:bg-red-700 h-24 border rounded-lg flex p-2 border-black/20 shadow-2xl">
                  <FaGlobe className="h-8 w-8" />
                  <div className="">
                    <h1 className="text-sm py-1 text-white">Lomba</h1>
                    <h1 className="text-2xl text-white py-2">{lomba}</h1>
                  </div>
                </div>
              </div>
              <div className="col-span-12 bg-white rounded-2xl shadow-lg p-4 mt-2 h-[400px] md:h-auto">
                <div className="mb-4">
                  <h1 className="text-xl font-bold">Pegawai Terinput</h1>

                  <p className="text-gray-500 text-sm">
                    Jumlah Dosen, Pemimpin Univ, Pemimpin Fakultas, dan Pemimpin
                    Senat
                  </p>
                </div>

                <div className="w-full h-[150px] lg:flex-wrap">
                  <div className="grid md:grid-cols-12 ">
                    <div className="col-span-8 flex md:grid-cols-4 gap-2 mt-8">
                      <div className="bg-blue-200 shadow-xl">
                        <span className="text-2xl font-bold px-4">{dosen}</span>
                        <div className="flex flex-col gap-2 mt-4 items-center">
                          <FaCircle />
                          <span className="text-lg -mt-2">Dosen</span>
                        </div>
                      </div>

                      <div className="bg-orange-200">
                        <span className="text-2xl font-bold px-4">
                          {p_univ}
                        </span>
                        <div className="flex flex-col gap-2 mt-4 items-center">
                          <FaCircle />
                          <span className="text-base -mt-2">P.Univ</span>
                        </div>
                      </div>

                      <div className="bg-gray-300">
                        <span className="text-2xl font-bold px-4">{p_fak}</span>
                        <div className="flex flex-col gap-2 mt-4 items-center">
                          <FaCircle />
                          <span className="text-base -mt-2">P.Fak</span>
                        </div>
                      </div>

                      <div className="bg-green-300">
                        <span className="text-2xl font-bold px-4">
                          {p_senat}
                        </span>
                        <div className="flex flex-col gap-2 mt-4 items-center">
                          <FaCircle />
                          <span className="text-base -mt-2">P.Senat</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4 ">
                      <div className="md:h-[150px] text-center ">
                        <PieChart width={190} height={200}>
                          <Pie
                            data={pegawai}
                            cx="50%"
                            cy="40%"
                            outerRadius={50}
                            dataKey="value"
                            label={({ percent }) =>
                              `${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {data.map((entry, index) => (
                              <Cell
                                key={index}
                                fill={
                                  COLORS_Pegawai[index % COLORS_Pegawai.length]
                                }
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======== */}

              <div className="col-span-12 bg-white rounded-2xl shadow-lg p-4 mt-2">
                <div className="mb-4">
                  <h1 className="text-xl font-bold">Daftar Admin</h1>

                  <p className="text-gray-500 text-sm">Kelola Data Admin</p>
                </div>

                <div className="w-full h-[250px] bg-white rounded-2xl shadow-lg p-4 overflow-auto">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search user..."
                      className="border rounded-xl px-3 py-2 text-sm outline-none w-[200px]"
                    />

                    <button
                      onClick={() => {
                        setSelectedUser(null);
                        setOpen(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm"
                    >
                      + Tambah
                    </button>
                  </div>

                  {/* Table */}
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="p-2">No</th>
                        <th className="p-2">Nama</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Password</th>
                        <th className="p-2 text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filter.map((item: any, index: number) => (
                        <tr className="border-b">
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">{item.email}</td>
                          <td className="p-2">******</td>

                          <td className="p-2">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedUser(item);
                                  setOpen(true);
                                }}
                                className="bg-yellow-400 text-white px-3 py-1 rounded-lg"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {data_login.length > 0 && (
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="border px-3 py-1 rounded-lg"
                      >
                        Prev
                      </button>

                      <button className="bg-blue-600 text-white px-3 py-1 rounded-lg">
                        {page}
                      </button>

                      <button
                        disabled={end >= data_login.length}
                        onClick={() => setPage(page + 1)}
                        className="border px-3 py-1 rounded-lg"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* ======== */}
          </div>
        </div>

        {/* modal */}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Modal onClose={() => setOpen(false)} selectedUser={selectedUser} />
          </div>
        )}
      </div>
    </>
  );
}
