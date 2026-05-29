export default function Aheader() {
  return (
    <>
      <div className="bg-transparent mb-12">
        <nav className="flex  md:w-[1000px] mx-auto  justify-center mt-12 p-4 shadow-xl border-xl rounded-lg ">
          <div className="flex ml-auto gap-4">
            <a
              href="/admin-sakip"
              className="transform skew-x-[-20deg] px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90 transition"
            >
              Akreditasi
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
