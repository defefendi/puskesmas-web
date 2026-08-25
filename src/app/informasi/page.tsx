import { databases } from '@/appwrite';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Link from 'next/link';

export const revalidate = 60;

export default async function InformasiPage() {
  let linkList: any[] = [];
  try {
    const res = await databases.listDocuments('puskesmaslenteng_db', 'pusat_informasi');
    linkList = res.documents;
  } catch (e: any) {
    console.warn(e.message);
  }

  return (
    <main className="min-h-screen bg-[#f0f9f3] flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 w-full max-w-[700px] mx-auto px-5 py-12 flex flex-col items-center">
        
        <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center shadow-md mb-6 p-2">
           <img src="/images/logo_puskesmaslenteng.png" alt="Logo Puskesmas" className="w-full h-full object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-[var(--ink)] mb-2 text-center">Pusat Informasi & Layanan Terpadu</h1>
        <p className="text-gray-500 text-center mb-10 text-[14px]">
           Akses cepat ke seluruh aplikasi internal, form pelaporan, dan portal layanan publik Puskesmas Lenteng.
        </p>

        <div className="w-full flex flex-col gap-4">
          {linkList.length > 0 ? (
            linkList.map((item, idx) => (
              <a href={item.link_url} target="_blank" rel="noopener noreferrer" key={idx} className="w-full bg-white border border-[var(--green-soft)] hover:border-[var(--green-mid)] p-4 rounded-[16px] shadow-sm hover:shadow-md transition flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                     <div className="w-[50px] h-[50px] bg-[#e6f4ea] rounded-[12px] flex items-center justify-center text-[var(--green-deep)] group-hover:scale-110 transition">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                     </div>
                     <div className="flex flex-col">
                        <h3 className="text-[16px] font-bold text-gray-800">{item.nama_aplikasi}</h3>
                        <span className="text-[12px] text-gray-500">Klik untuk membuka halaman</span>
                     </div>
                  </div>
                  <div className="w-[30px] h-[30px] bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[var(--green-mid)] group-hover:bg-[#e6f4ea] transition">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
              </a>
            ))
          ) : (
            <div className="w-full p-8 bg-white rounded-[16px] border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
               <p className="text-[13px]">Belum ada tautan informasi tersedia.</p>
            </div>
          )}
        </div>
      </div>
      <FooterSection />
    </main>
  );
}