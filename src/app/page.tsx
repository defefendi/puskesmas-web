import { Query } from 'appwrite';
import { databases } from '@/appwrite';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FooterSection from '@/components/FooterSection';
import BMICalculator from '@/components/BMICalculator';
import GaleriSlider from '@/components/GaleriSlider';
import { InfoRujukan, ProgramInovasi, PengaduanKritik } from '@/components/SidebarWidgets';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function HomePage() {
  let bedData: any[] = [];
  let pengumumanData: any[] = [];
  let artikelData: any[] = [];
  
  try {
    const bedRes = await databases.listDocuments('puskesmaslenteng_db', 'ketersediaan_bed');
    bedData = bedRes.documents;
  } catch (e: any) {
    console.warn("Bed data error", e.message);
  }

  try {
    const pengRes = await databases.listDocuments('puskesmaslenteng_db', 'pengumuman', [Query.orderDesc('$createdAt'), Query.limit(3)]);
    pengumumanData = pengRes.documents;
  } catch (e: any) {
    console.warn("Pengumuman data error", e.message);
  }

  try {
    const artikelRes = await databases.listDocuments('puskesmaslenteng_db', 'artikel_kesehatan', [Query.orderDesc('$createdAt'), Query.limit(3)]);
    artikelData = artikelRes.documents;
  } catch (e: any) {
    console.warn("Artikel data error", e.message);
  }

  const klasterList = [
    { id: 'klaster-1', nama: 'Klaster 1 (Manajemen)', emoji: '🏥' },
    { id: 'klaster-2', nama: 'Klaster 2 (Ibu & Anak)', emoji: '👶' },
    { id: 'klaster-3', nama: 'Klaster 3 (Dewasa/Lansia)', emoji: '👨‍⚕️' },
    { id: 'klaster-4', nama: 'Klaster 4 (Penyakit Menular)', emoji: '🦠' },
    { id: 'lintas-klaster', nama: 'Lintas Klaster', emoji: '🚑' },
  ];

  return (
    <main className="min-h-screen bg-[var(--cream)] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      
      {/* Layanan Dashboard */}
      <div id="layanan" className="w-full bg-white py-16 px-5">
        <div className="max-w-[1150px] mx-auto flex flex-col lg:flex-row items-start gap-10">
          
          {/* KOLOM KIRI (Lebar Tetap 340px) */}
          <div className="w-full lg:w-[340px] flex flex-col gap-5 shrink-0">
            
            {/* Klaster Pelayanan */}
            <div className="bg-[#f0f9f3] p-6 rounded-[24px] border border-[var(--green-soft)] flex-1">
              <h2 className="text-[18px] font-bold text-[var(--green-deep)] mb-6 flex items-center gap-2">
                <Image src="/images/logo_puskesmaslenteng.png" alt="Icon" width={24} height={24} className="opacity-80" />
                Klaster Pelayanan
              </h2>
              <div className="flex flex-col gap-3">
                {klasterList.map((klaster) => (
                  <Link key={klaster.id} href={`/klaster/${klaster.id}`} className="bg-white px-5 py-4 rounded-[12px] border border-[var(--green-soft)]/50 flex items-center justify-between hover:border-[var(--green-mid)] hover:shadow-sm transition group shadow-sm">
                    <div className="flex items-center gap-3">
                       <span className="text-xl">{klaster.emoji}</span>
                       <span className="font-bold text-[14px] text-gray-800">{klaster.nama}</span>
                    </div>
                    <span className="text-[var(--green-mid)] font-bold transition">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ketersediaan Bed */}
            <div className="p-6 bg-[#2c3e50] rounded-[20px] shadow-lg text-white">
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-soft)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                <h3 className="font-bold text-[14px]">Ketersediaan Kamar</h3>
              </div>
              {bedData.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {bedData.map((bed, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[12px] bg-white/10 px-3 py-2 rounded-lg">
                      <span>{bed.nama_ruangan || '-'}</span>
                      <span className={`font-bold ${bed.tersedia === 0 ? "text-red-400" : "text-[var(--green-soft)]"}`}>
                        {bed.tersedia === 0 ? 'Penuh' : `${bed.tersedia} Kosong`}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-white/50 italic">Data bed belum tersedia.</p>
              )}
            </div>

            <InfoRujukan />
            <ProgramInovasi />
            <PengaduanKritik />

          </div>

          {/* KOLOM KANAN */}
          <div id="berita" className="flex-1 w-full flex flex-col gap-10">
            
            {/* Galeri Slider */}
            <GaleriSlider />
            
            {/* Berita Kegiatan Section */}
            <div>
               <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                  <h2 className="text-[22px] font-bold text-[var(--ink)]">Berita Kegiatan</h2>
                  <Link href="/berita" className="text-[13px] font-bold text-[var(--green-mid)] hover:text-[var(--green-deep)] transition">
                     Lihat Semua &rarr;
                  </Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pengumumanData.length > 0 ? (
                     pengumumanData.map((item, idx) => (
                        <Link href={`/berita/${item.$id}`} key={idx} className="group flex flex-col bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition">
                           <div className="w-full h-[160px] bg-gray-100 relative">
                              {item.fotoUrl ? (
                                 <img src={item.fotoUrl} alt={item.judul} className="object-cover w-full h-full" />
                              ) : (
                                 <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                              )}
                           </div>
                           <div className="p-4 flex flex-col flex-1">
                              <span className="text-[10px] text-gray-400 mb-2">{new Date(item.$createdAt).toLocaleDateString('id-ID')}</span>
                              <h3 className="text-[14px] font-bold text-gray-800 leading-[1.4] mb-2 group-hover:text-[var(--green-deep)] line-clamp-2">{item.judul}</h3>
                              <p className="text-[12px] text-gray-500 line-clamp-2 mt-auto">{item.isi}</p>
                           </div>
                        </Link>
                     ))
                  ) : (
                     <p className="text-[13px] text-gray-400 italic">Belum ada berita kegiatan terbaru.</p>
                  )}
               </div>
            </div>

            {/* BMICalculator (Now styled internally as a full horizontal strip) */}
            <BMICalculator />

            {/* Artikel Kesehatan Section */}
            <div>
               <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                  <h2 className="text-[22px] font-bold text-[var(--ink)]">Artikel Kesehatan</h2>
                  <Link href="/artikel" className="text-[13px] font-bold text-[var(--green-mid)] hover:text-[var(--green-deep)] transition">
                     Lihat Semua &rarr;
                  </Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {artikelData.length > 0 ? (
                     artikelData.map((item, idx) => (
                        <Link href={`/artikel/${item.$id}`} key={idx} className="group flex flex-col bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition">
                           <div className="w-full h-[160px] bg-gray-100 relative">
                              {item.fotoUrl ? (
                                 <img src={item.fotoUrl} alt={item.judul} className="object-cover w-full h-full" />
                              ) : (
                                 <div className="w-full h-full flex items-center justify-center text-gray-300">Artikel Kesehatan</div>
                              )}
                           </div>
                           <div className="p-4 flex flex-col flex-1">
                              <span className="text-[10px] bg-[#e6f4ea] text-[var(--green-deep)] font-bold px-2 py-1 rounded-md self-start mb-2">Edukasi</span>
                              <h3 className="text-[14px] font-bold text-gray-800 leading-[1.4] mb-2 group-hover:text-[var(--green-deep)] line-clamp-2">{item.judul}</h3>
                              <p className="text-[12px] text-gray-500 line-clamp-2 mt-auto">{item.isi}</p>
                           </div>
                        </Link>
                     ))
                  ) : (
                     <p className="text-[13px] text-gray-400 italic">Belum ada artikel kesehatan terbaru.</p>
                  )}
               </div>
            </div>

          </div>

        </div>
      </div>

      <FooterSection />
    </main>
  );
}
