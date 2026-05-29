export default function Header_Aksi() {
  return (
    <>
      <div className="bg-transparent mb-12">
        <nav className="flex  md:w-[1000px] mx-auto  justify-center mt-12 p-4 shadow-xl border-xl rounded-lg ">
          <h1 className="mt-4 font-semibold text-lg">Tambah Data</h1>
          <div className="gap-4 flex ml-auto">
            <a
              href=""
              className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
            >
              Simpan Data
            </a>
            <a
              href="/admin-Prestasi"
              className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-white hover:opacity-90 transition"
            >
              Kembali
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
