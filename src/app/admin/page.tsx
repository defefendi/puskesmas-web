"use client";

import { useState, useEffect } from "react";
import { databases, storage, ID } from "@/appwrite";
import Link from "next/link";
import { GenericAdminTab, TabBed, TabAntrean, TabDetailKlaster } from "./components";

type TabName = "antrean" | "pengumuman" | "tenaga-medis" | "poli" | "program" | "bed" | "rujukan" | "galeri" | "klaster" | "artikel" | "informasi";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Username atau password salah");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-[400px]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-[60px] h-[60px] bg-[var(--green-deep)] rounded-[16px] flex items-center justify-center mb-4">
               <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">SIMPUS Admin</h1>
            <p className="text-sm text-gray-500">Silakan login untuk melanjutkan</p>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
              <input required value={username} onChange={e=>setUsername(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[var(--green-mid)]" placeholder="admin" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input required value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[var(--green-mid)]" placeholder="••••••••" />
            </div>
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button type="submit" className="w-full bg-[var(--green-mid)] hover:bg-[var(--green-deep)] text-white font-bold py-3 rounded-lg transition mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminMain setIsLoggedIn={setIsLoggedIn} />;
}

function AdminMain({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) {
  const [activeTab, setActiveTab] = useState<TabName>("klaster");
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top App Bar */}
      <header className="h-[70px] bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-20">
        <Link href="/" className="text-[var(--green-deep)] mr-4 p-2 hover:bg-gray-100 rounded-full transition">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[var(--green-deep)] rounded-[10px] flex items-center justify-center">
            {/* Simple logo placeholder resembling the screenshot */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-[16px] text-gray-800 leading-tight">SIMPUS Admin</h1>
            <p className="text-[12px] text-gray-400 font-medium">Sistem Informasi Manajemen Puskesmas</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col justify-between overflow-y-auto hidden md:flex">
          <div className="flex flex-col py-6 px-4 gap-2">
            
            <SidebarItem active={activeTab === "antrean"} onClick={() => setActiveTab("antrean")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>} label="Dashboard Antrean" />
            <SidebarItem active={activeTab === "pengumuman"} onClick={() => setActiveTab("pengumuman")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>} label="Kelola Pengumuman" />
            <SidebarItem active={activeTab === "tenaga-medis"} onClick={() => setActiveTab("tenaga-medis")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} label="Kelola Tenaga Medis" />
            <SidebarItem active={activeTab === "poli"} onClick={() => setActiveTab("poli")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>} label="Kelola Poli/Layanan" />
            <SidebarItem active={activeTab === "program"} onClick={() => setActiveTab("program")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>} label="Kelola Program" />
            <SidebarItem active={activeTab === "bed"} onClick={() => setActiveTab("bed")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>} label="Kelola Bed / Kamar" />
            <SidebarItem active={activeTab === "rujukan"} onClick={() => setActiveTab("rujukan")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>} label="Info Rujukan" />
            <SidebarItem active={activeTab === "artikel"} onClick={() => setActiveTab("artikel")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>} label="Kelola Artikel Kesehatan" />
            <SidebarItem active={activeTab === "informasi"} onClick={() => setActiveTab("informasi")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>} label="Pusat Informasi & Link" />
            <SidebarItem active={activeTab === "galeri"} onClick={() => setActiveTab("galeri")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>} label="Galeri Slider" />
            
            <SidebarItem active={activeTab === "klaster"} onClick={() => setActiveTab("klaster")} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>} label="Kelola Detail Klaster" />

          </div>
          
          <div className="p-4 border-t border-gray-200">
             <button onClick={() => { setIsLoggedIn(false); window.location.href = "/"; }} className="flex items-center gap-4 w-full px-4 py-3 rounded-[12px] font-bold text-[14px] text-red-500 hover:bg-red-50 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Keluar
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-50/50">
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
            
            {activeTab === "klaster" && <TabDetailKlaster />}
            {activeTab === "pengumuman" && <TabPengumuman />}
            {activeTab === "galeri" && <TabGaleri />}
            
            {activeTab === "antrean" && <TabAntrean />}
            {activeTab === "bed" && <TabBed />}
            
            {activeTab === "tenaga-medis" && (
              <GenericAdminTab title="Kelola Tenaga Medis" collectionId="tenaga_medis" titleField="nama" subtitleField="jabatan" />
            )}
            {activeTab === "poli" && (
              <GenericAdminTab title="Kelola Poli/Layanan" collectionId="layanan" titleField="nama_layanan" subtitleField="deskripsi" />
            )}
            {activeTab === "program" && (
              <GenericAdminTab title="Kelola Program" collectionId="program" titleField="nama_program" subtitleField="deskripsi" />
            )}
            {activeTab === "rujukan" && (
              <GenericAdminTab title="Info Rujukan" collectionId="info_rujukan" titleField="judul" subtitleField="isi" />
            )}
            {activeTab === "artikel" && <TabArtikel />}
            {activeTab === "informasi" && (
              <GenericAdminTab title="Pusat Informasi & Tautan" collectionId="pusat_informasi" titleField="nama_aplikasi" subtitleField="link_url" />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

// Komponen Sidebar Item
function SidebarItem({ active, label, icon, onClick }: { active: boolean, label: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-[12px] font-bold text-[14px] transition-all
      ${active 
        ? 'bg-[var(--green-deep)] text-white shadow-md' 
        : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      <div className={`${active ? 'text-white' : 'text-gray-400'}`}>
        {icon}
      </div>
      {label}
    </button>
  );
}

// ----------------------------------------------------------------------
// TABS COMPONENTS
// ----------------------------------------------------------------------

function TabPengumuman() {
  const [beritaList, setBeritaList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [penulis, setPenulis] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const res = await databases.listDocuments("puskesmaslenteng_db", "pengumuman");
      setBeritaList(res.documents);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const handleDeleteBerita = async (id: string) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    try {
      await databases.deleteDocument("puskesmaslenteng_db", "pengumuman", id);
      fetchBerita();
    } catch (e: any) {
      alert("Gagal menghapus: " + e.message);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditId(item.$id);
      setJudul(item.judul);
      setIsi(item.isi);
      setPenulis(item.penulis);
      setFotoUrl(item.fotoUrl || "");
    } else {
      setEditId(null);
      setJudul("");
      setIsi("");
      setPenulis("");
      setFotoUrl("");
    }
    setFile(null);
    setFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalFotoUrl = fotoUrl;
      if (file) {
        const bucketId = "69f9c0fb00347cb5a073"; 
        const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);
        finalFotoUrl = `https://sgp.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uploadedFile.$id}/view?project=69f9bfa500229160605b`;
      }
      
      const payload = { judul, isi, penulis, fotoUrl: finalFotoUrl };
      if (editId) {
        await databases.updateDocument("puskesmaslenteng_db", "pengumuman", editId, payload);
      } else {
        await databases.createDocument("puskesmaslenteng_db", "pengumuman", 'unique()', payload);
      }
      setIsModalOpen(false);
      setFile(null);
      fetchBerita();
    } catch (e: any) {
      alert("Gagal menyimpan data: " + e.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-[22px] font-bold text-gray-800">Kelola Pengumuman</h2>
        <button onClick={() => handleOpenModal()} className="bg-[#1A8A57] hover:bg-[#146e45] text-white px-5 py-2.5 rounded-[12px] font-bold text-[13px] flex items-center gap-2 transition self-start sm:self-auto shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          Tambah Berita
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        {beritaList.length === 0 ? (
          <p className="text-[14px] text-gray-500 italic py-4">Belum ada pengumuman / Data gagal dimuat.</p>
        ) : (
          beritaList.map((b) => (
            <div key={b.$id} className="border border-gray-200 rounded-[16px] p-5 flex items-center justify-between bg-white hover:border-gray-300 transition">
              <div className="flex flex-col gap-1 pr-4">
                <h3 className="font-bold text-[15px] text-gray-800">{b.judul}</h3>
                <p className="text-[13px] text-gray-500 line-clamp-2">{b.isi}</p>
                <span className="text-[11px] text-gray-400 mt-1">Penulis: {b.penulis}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => handleOpenModal(b)} className="w-[36px] h-[36px] bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                </button>
                <button onClick={() => handleDeleteBerita(b.$id)} className="w-[36px] h-[36px] bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Pengumuman */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-[500px] shadow-xl">
            <h3 className="text-[20px] font-bold text-[var(--green-deep)] mb-4">
              {editId ? "✏️ Edit Pengumuman" : "Buat Pengumuman Baru"}
            </h3>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Judul</label>
                <input required value={judul} onChange={e=>setJudul(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Isi</label>
                <textarea required value={isi} onChange={e=>setIsi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)] min-h-[100px]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Penulis</label>
                <input required value={penulis} onChange={e=>setPenulis(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Unggah Gambar (Opsional)</label>
                <input onChange={e=>setFile(e.target.files?.[0] || null)} type="file" accept="image/*" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)]" />
                {fotoUrl && !file && <p className="text-[11px] text-gray-500 mt-1">Gambar saat ini sudah tersimpan. Unggah baru untuk mengganti.</p>}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button type="button" onClick={() => {setIsModalOpen(false); setFile(null);}} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition" disabled={isUploading}>Batal</button>
                <button type="submit" className="flex-1 bg-[var(--green-mid)] text-white font-bold py-3 rounded-lg hover:bg-[var(--green-deep)] transition" disabled={isUploading}>{isUploading ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TabArtikel() {
  const [artikelList, setArtikelList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [penulis, setPenulis] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchArtikel();
  }, []);

  const fetchArtikel = async () => {
    try {
      const res = await databases.listDocuments("puskesmaslenteng_db", "artikel_kesehatan");
      setArtikelList(res.documents);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const handleDeleteArtikel = async (id: string) => {
    if (!confirm("Hapus artikel_kesehatan ini?")) return;
    try {
      await databases.deleteDocument("puskesmaslenteng_db", "artikel_kesehatan", id);
      fetchArtikel();
    } catch (e: any) {
      alert("Gagal menghapus: " + e.message);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditId(item.$id);
      setJudul(item.judul);
      setIsi(item.isi);
      setPenulis(item.penulis);
      setFotoUrl(item.fotoUrl || "");
    } else {
      setEditId(null);
      setJudul("");
      setIsi("");
      setPenulis("");
      setFotoUrl("");
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalFotoUrl = fotoUrl;
      if (file) {
        const bucketId = "69f9c0fb00347cb5a073"; 
        const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);
        finalFotoUrl = `https://sgp.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uploadedFile.$id}/view?project=69f9bfa500229160605b`;
      }
      
      const payload = { judul, isi, penulis, fotoUrl: finalFotoUrl };
      if (editId) {
        await databases.updateDocument("puskesmaslenteng_db", "artikel_kesehatan", editId, payload);
      } else {
        await databases.createDocument("puskesmaslenteng_db", "artikel_kesehatan", 'unique()', payload);
      }
      setIsModalOpen(false);
      setFile(null);
      fetchArtikel();
    } catch (e: any) {
      alert("Gagal menyimpan data: " + e.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-[22px] font-bold text-gray-800">Kelola Artikel</h2>
        <button onClick={() => handleOpenModal()} className="bg-[#1A8A57] hover:bg-[#146e45] text-white px-5 py-2.5 rounded-[12px] font-bold text-[13px] flex items-center gap-2 transition self-start sm:self-auto shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          Tambah Artikel
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        {artikelList.length === 0 ? (
          <p className="text-[14px] text-gray-500 italic py-4">Belum ada artikel_kesehatan / Data gagal dimuat.</p>
        ) : (
          artikelList.map((b) => (
            <div key={b.$id} className="border border-gray-200 rounded-[16px] p-5 flex items-center justify-between bg-white hover:border-gray-300 transition">
              <div className="flex flex-col gap-1 pr-4">
                <h3 className="font-bold text-[15px] text-gray-800">{b.judul}</h3>
                <p className="text-[13px] text-gray-500 line-clamp-2">{b.isi}</p>
                <span className="text-[11px] text-gray-400 mt-1">Penulis: {b.penulis}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => handleOpenModal(b)} className="w-[36px] h-[36px] bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                </button>
                <button onClick={() => handleDeleteArtikel(b.$id)} className="w-[36px] h-[36px] bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Artikel */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-[500px] shadow-xl">
            <h3 className="text-[20px] font-bold text-[var(--green-deep)] mb-4">
              {editId ? "✏️ Edit Artikel" : "Buat Artikel Baru"}
            </h3>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Judul</label>
                <input required value={judul} onChange={e=>setJudul(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Isi</label>
                <textarea required value={isi} onChange={e=>setIsi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)] min-h-[100px]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Penulis</label>
                <input required value={penulis} onChange={e=>setPenulis(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Unggah Gambar (Opsional)</label>
                <input onChange={e=>setFile(e.target.files?.[0] || null)} type="file" accept="image/*" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)]" />
                {fotoUrl && !file && <p className="text-[11px] text-gray-500 mt-1">Gambar saat ini sudah tersimpan. Unggah baru untuk mengganti.</p>}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button type="button" onClick={() => {setIsModalOpen(false); setFile(null);}} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition" disabled={isUploading}>Batal</button>
                <button type="submit" className="flex-1 bg-[var(--green-mid)] text-white font-bold py-3 rounded-lg hover:bg-[var(--green-deep)] transition" disabled={isUploading}>{isUploading ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


function TabGaleri() {
  const [galeriList, setGaleriList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await databases.listDocuments("puskesmaslenteng_db", "galeri");
      setGaleriList(res.documents);
    } catch (e: any) {
      console.warn(e.message);
    }
  };

  const handleDeleteGaleri = async (id: string, fileUrl: string) => {
    if (!confirm("Hapus gambar ini?")) return;
    try {
      await databases.deleteDocument("puskesmaslenteng_db", "galeri", id);
      
      const match = fileUrl.match(/files\/([^\/]+)\/view/);
      if (match && match[1]) {
        try {
          await storage.deleteFile("69f9c0fb00347cb5a073", match[1]);
        } catch(e) { console.warn("File storage tidak ditemukan"); }
      }
      
      fetchGaleri();
    } catch (e: any) {
      alert("Gagal menghapus: " + e.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Silakan pilih gambar terlebih dahulu.");
      return;
    }
    
    setIsUploading(true);
    try {
      const bucketId = "69f9c0fb00347cb5a073"; 
      const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);
      const fileUrl = `https://sgp.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uploadedFile.$id}/view?project=69f9bfa500229160605b`;
      
      await databases.createDocument("puskesmaslenteng_db", "galeri", 'unique()', { url: fileUrl });
      
      setIsModalOpen(false);
      setFile(null);
      fetchGaleri();
    } catch (e: any) {
      alert("Gagal mengunggah gambar. Pastikan Anda sudah membuat Bucket dengan ID 'galeri_bucket' di Appwrite Storage. Error: " + e.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-[22px] font-bold text-gray-800">Galeri Slider</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#1A8A57] hover:bg-[#146e45] text-white px-5 py-2.5 rounded-[12px] font-bold text-[13px] flex items-center gap-2 transition self-start sm:self-auto shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          Tambah Gambar
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galeriList.length === 0 ? (
           <p className="text-[14px] text-gray-500 italic py-4 col-span-full">Belum ada gambar / Data gagal dimuat.</p>
        ) : (
          galeriList.map((g) => (
            <div key={g.$id} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.url} alt="Galeri" className="w-full h-full object-cover" />
              <button onClick={() => handleDeleteGaleri(g.$id, g.url)} className="absolute inset-0 bg-black/60 text-white font-bold text-[13px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition backdrop-blur-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Hapus
              </button>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-[400px] shadow-xl">
            <h3 className="text-[20px] font-bold text-[var(--green-deep)] mb-4">Upload Gambar Baru</h3>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-600 mb-1">Pilih File Gambar</label>
                <input required type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-[var(--green-mid)]" />
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition">Batal</button>
                <button type="submit" disabled={isUploading} className="flex-1 bg-[var(--green-mid)] text-white font-bold py-3 rounded-lg hover:bg-[var(--green-deep)] transition disabled:opacity-50">
                  {isUploading ? "Mengunggah..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
