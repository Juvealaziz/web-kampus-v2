export default function Aheader() {
  return (
    <>
      <div className="bg-transparent mb-12">
        <nav className="flex  md:w-[1000px] mx-auto  justify-center mt-12 p-4 shadow-xl border-xl rounded-lg ">
          <div className="flex flex-wrap gap-3 md:gap-4 md:ml-auto  justify-end">
            <a
              href="/admin-biaya"
              className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
            >
              Biaya
            </a>
            <a
              href="/admin-formulir"
              className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
            >
              Formulir
            </a>

            <a
              href="/admin-sistem"
              className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
            >
              Sistem Pembelajaran
            </a>
            <a
              href="/admin-kalender"
              className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
            >
              Kalender
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
