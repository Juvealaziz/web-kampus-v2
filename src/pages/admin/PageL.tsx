export default function PageL() {
  return (
    <>
      {/* CARD */}
      <div className="sticky top-0 h-screen overflow-y-auto ">
        <div className="p-6">
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-300 transition duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            {/* ATAS GULUNGAN PUTIH */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[104%] h-6 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full shadow-lg z-30">
              {/* UJUNG KIRI */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-300 border-[3px] border-blue-500"></div>

              {/* UJUNG KANAN */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-300 border-[3px] border-blue-500"></div>
            </div>

            <div className=" mt-4">
              {/* BODY */}
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Halaman Sambutan Rektor
                </label>
                <a
                  href="/Sambutan-Rektor"
                  className="border-b border-black/10 hover:bg-blue-200 rounded-lg p-2"
                >
                  Sambutan Rektor
                </a>
              </div>

              <div className="p-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Halaman Visi, Misi dan Tujuan
                </label>
                <a
                  href="/visi"
                  className="border-b border-black/10 hover:bg-blue-200 rounded-lg p-2"
                >
                  Visi, Misi dan Tujuan
                </a>
              </div>

              <div className="p-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Struktur Organisasi
                </label>
                <a
                  href="/strukturOrganisasi"
                  className="border-b border-black/10 hover:bg-blue-200 rounded-lg p-2"
                >
                  Struktur
                </a>
              </div>

              <div className="p-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Sejarah
                </label>
                <a
                  href="/sejarah"
                  className="border-b border-black/10 hover:bg-blue-200 rounded-lg p-2"
                >
                  Sejarah
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
