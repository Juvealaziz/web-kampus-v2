export default function Page_Berita() {
  return (
    <>
      <div className="bg-transparent mb-12">
        <nav className="flex  md:w-[1000px] mx-auto  justify-center mt-12 p-4 shadow-xl border-xl rounded-lg ">
          <div className="gap-4 flex ml-auto">
            <a
              href="/Admin-Pengumuman-Data"
              className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-green-700 to-green-900 text-white hover:opacity-90 transition"
            >
              Tambah Data
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
