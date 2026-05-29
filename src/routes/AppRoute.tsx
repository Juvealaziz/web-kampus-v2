import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "../pages/users/Beranda";
import Visi from "../pages/users/Visi";
import Struktur from "../pages/users/Struktur";
import PimpinanUniv from "../pages/users/PimpinanUniversitas";
import PimpinanF from "../pages/users/PimpinanF";
import Senat from "../pages/users/Senat";
import Berita from "../pages/users/Berita";
import Kontak from "../pages/users/Kontak";
import Sejarah from "../pages/users/Sejarah";
import FakultasTeknik from "../pages/Fakultas/FakultasTeknik";
import Sambutan from "../pages/users/Sambutan";
import Biaya from "../pages/Fakultas/Biaya";
import SistemPembelajaran from "../pages/Fakultas/SIstemPembelajaran";
import Formulir from "../pages/Fakultas/Formulir";
import KalenderAkademik from "../pages/Fakultas/KalenderAkademik";
import UKM from "../pages/Fakultas/UKM";
import Prestasi from "../pages/Fakultas/Prestasi";
import Fasilitas from "../pages/Fakultas/Fasilitas";
import Beasiswa from "../pages/Fakultas/Beasiswa";
import Akreditasi from "../pages/Fakultas/Akreditasi";
import Pengaduan from "../pages/Fakultas/Pengaduan";
import Sakip from "../pages/Fakultas/Sakip";
import Pengumuman from "../pages/Fakultas/Pengumuman";
import ASambutan from "../pages/admin/Sambutan";
import AVisi from "../pages/admin/Visi";
import AStruktur from "../pages/admin/Struktur";
import ASejarah from "../pages/admin/Sejarah";
import AFormulir from "../pages/admin/Akademik/Formulir";
import ASistem from "../pages/admin/Akademik/Sistem";
import ABeasiswa from "../pages/admin/Kemahasiswaan/Beasiswa";
import AFasilitas from "../pages/admin/Kemahasiswaan/Fasilitas";
import ABerita from "../pages/admin/Dinamis/Berita";
import BeritaPage from "../pages/admin/Dinamis/Berita_Page";
import AHubungi from "../pages/admin/Hubungi/Hubungi";
import AUniversitas from "../pages/admin/Hubungi/AUniversitas";
import ASosial from "../pages/admin/Hubungi/Sosial";
import BiroAkademik from "../pages/users/BAK";
import ABiro from "../pages/admin/Biro/BAK";
import ABiroK from "../pages/admin/Biro/BKU";
import BiroKeuangan from "../pages/users/BKU";
import UKMData from "../pages/admin/UKM/UKM_data";
import Aksi from "../pages/admin/UKM/Aksi";
import Edit from "../pages/admin/UKM/Edit";
import ASakip from "../pages/admin/Layanan/Sakip";
import ASurvei from "../pages/admin/Survei/Survei";
import APP from "../pages/admin/App/App";
import AKode from "../pages/admin/kode_etik/Kode_etik";
import AKalender from "../pages/admin/Akademik/Kalender";
import ABiaya from "../pages/admin/Akademik/Biaya";
import NotifData from "../pages/admin/pengumuman/Notif";
import AksiNotif from "../pages/admin/pengumuman/AksiNotif";
import EditNotif from "../pages/admin/pengumuman/EditNotif";
import ProfilData from "../pages/admin/profil/Profil";
import AksiProfil from "../pages/admin/profil/AksiProfil";
import Dosen from "../pages/users/Dosen";
import PrestasiData from "../pages/admin/Prestasi/Prestasi";
import AksiPrestasi from "../pages/admin/Prestasi/Aksi_Prestasi";
import EditPrestasi from "../pages/admin/Prestasi/Edit_Prestasi";
import EditBerita from "../pages/admin/Dinamis/Edit_Berita";
import AFakultas from "../pages/admin/Fakultas/fakultas";
import AProdi from "../pages/admin/prodi/prodi";
import AAkreditasi from "../pages/admin/Akreditasi/Akreditasi";
import Login_page from "../pages/admin/login/login";
import Dashdata from "../pages/dashboard/index";
import EditProfil from "../pages/admin/profil/EditProfil";
import EditLomba from "../pages/admin/lomba/EditLomba";
import AksiLomba from "../pages/admin/lomba/AksiLomba";
import LombaData from "../pages/admin/lomba/lomba";
import ABeranda from "../pages/admin/Beranda/beranda";
import Detail from "../pages/users/Detail";
import DetailProdi from "../pages/Fakultas/prodi";
import Aduan from "../pages/admin/pengaduan/Aduan";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Beranda" element={<Beranda />} />
        <Route path="/Visi" element={<Visi />} />
        <Route path="/StrukturOrganisasi" element={<Struktur />} />
        <Route path="/PimpinanUniversitas" element={<PimpinanUniv />} />
        <Route path="/PimpinanSenat" element={<Senat />} />
        <Route path="/PimpinanFakultas" element={<PimpinanF />} />
        <Route path="/Dosen" element={<Dosen />} />
        <Route path="/Berita" element={<Berita />} />
        <Route path="/Kontak" element={<Kontak />} />
        <Route path="/Sejarah" element={<Sejarah />} />
        <Route path="/Fakultas/:id/:nama" element={<FakultasTeknik />} />
        <Route path="/Sambutan-Rektor" element={<Sambutan />} />
        <Route path="/Biaya-Studi" element={<Biaya />} />
        <Route path="/Sistem-Pembelajaran" element={<SistemPembelajaran />} />
        <Route path="/Formulir" element={<Formulir />} />
        <Route path="/Kalender-Akademik" element={<KalenderAkademik />} />
        <Route path="/Unit-Kegiatan-Mahasiswa" element={<UKM />} />
        <Route path="/Prestasi" element={<Prestasi />} />
        <Route path="/Fasilitas" element={<Fasilitas />} />
        <Route path="/Beasiswa" element={<Beasiswa />} />
        <Route path="/Akreditasi" element={<Akreditasi />} />
        <Route path="/Pengaduan" element={<Pengaduan />} />
        <Route path="/Sakip" element={<Sakip />} />
        <Route path="/Pengumuman" element={<Pengumuman />} />
        <Route path="/Biro-Akademik" element={<BiroAkademik />} />
        <Route path="/Biro-Keuangan" element={<BiroKeuangan />} />
        <Route path="/Admin-Sambutan" element={<ASambutan />} />
        <Route path="/Admin-Visi" element={<AVisi />} />
        <Route path="/Admin-Struktur" element={<AStruktur />} />
        <Route path="/Admin-Sejarah" element={<ASejarah />} />
        <Route path="/Admin-Formulir" element={<AFormulir />} />
        <Route path="/Admin-Sistem" element={<ASistem />} />
        <Route path="/Admin-Beasiswa" element={<ABeasiswa />} />
        <Route path="/Admin-Fasilitas" element={<AFasilitas />} />
        <Route path="/Admin-Form-Berita" element={<ABerita />} />
        <Route path="/Admin-Berita" element={<BeritaPage />} />
        <Route path="/Admin-Hubungi" element={<AHubungi />} />
        <Route path="/Admin-Universitas" element={<AUniversitas />} />
        <Route path="/Admin-Sosial" element={<ASosial />} />
        <Route path="/Admin-Biro-Akademik" element={<ABiro />} />
        <Route path="/Admin-Biro-Keuangan" element={<ABiroK />} />
        <Route path="/Admin-UKM" element={<UKMData />} />
        <Route path="/Admin-UKM-Data" element={<Aksi />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/Admin-Sakip" element={<ASakip />} />
        <Route path="/Admin-Sakip/:id" element={<ASakip />} />
        <Route path="/Admin-Survei" element={<ASurvei />} />
        <Route path="/Admin-Survei/:id" element={<ASurvei />} />
        <Route path="/Admin-Aplikasi" element={<APP />} />
        <Route path="/Admin-Aplikasi/:id" element={<APP />} />
        <Route path="/Admin-Kode-Etik" element={<AKode />} />
        <Route path="/Admin-Kode-Etik/:id" element={<AKode />} />
        <Route path="/Admin-Kalender" element={<AKalender />} />
        <Route path="/Admin-Biaya" element={<ABiaya />} />
        <Route path="/Admin-Pengumuman" element={<NotifData />} />
        <Route path="/Admin-Pengumuman-Data" element={<AksiNotif />} />
        <Route path="/editnotif/:id" element={<EditNotif />} />
        <Route path="/Admin-Profil" element={<ProfilData />} />
        <Route path="/Admin-Profil-Tambah" element={<AksiProfil />} />
        <Route path="/editProfil/:id" element={<EditProfil />} />
        <Route path="/Admin-Prestasi" element={<PrestasiData />} />
        <Route path="/Admin-Prestasi-Aksi" element={<AksiPrestasi />} />
        <Route path="/editPrestasi/:id" element={<EditPrestasi />} />
        <Route path="/editBerita/:id" element={<EditBerita />} />
        <Route path="/Admin-Fakultas" element={<AFakultas />} />
        <Route path="/Admin-Fakultas/:id" element={<AFakultas />} />
        <Route path="/Admin-Prodi" element={<AProdi />} />
        <Route path="/Admin-Prodi/:id" element={<AProdi />} />
        <Route path="/Admin-Akreditasi" element={<AAkreditasi />} />
        <Route path="/Admin-Akreditasi/:id" element={<AAkreditasi />} />
        <Route path="/Admin-Login" element={<Login_page />} />
        <Route path="/Admin-Dashboard" element={<Dashdata />} />

        <Route path="/Admin-Lomba" element={<LombaData />} />
        <Route path="/Admin-Lomba-Data" element={<AksiLomba />} />
        <Route path="/editlomba/:id" element={<EditLomba />} />

        <Route path="/Admin-Beranda" element={<ABeranda />} />
        <Route path="/Admin-Beranda/:id" element={<ABeranda />} />
        <Route path="/Detail/:id/:judul" element={<Detail />} />
        <Route path="/Detail_Prodi/:id/:nama" element={<DetailProdi />} />

        <Route path="/Admin-Pengaduan" element={<Aduan />} />
      </Routes>
    </BrowserRouter>
  );
}
