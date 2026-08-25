import { databases } from '@/appwrite';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Link from 'next/link';
import { Query } from 'appwrite';

export const revalidate = 60;

export default async function ArtikelPage() {
  let artikelList: any[] = [];
  try {
    const res = await databases.listDocuments('puskesmaslenteng_db', 'artikel_kesehatan', [Query.orderDesc('$createdAt')]);
    artikelList = res.documents;
  } catch (e: any) {
    console.warn(e.message);
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] flex flex-col">
      <Navbar />
      <div className="flex-1 w-full max-w-[1150px] mx-auto px-5 py-12">
        <div className="mb-10 text-center">
           <h1 className="text-3xl font-bold text-[var(--ink)] mb-4">Artikel Edukasi Kesehatan</h1>
           <p className="text-gray-500 max-w-2xl mx-auto">Kumpulan artikel, tips, dan informasi kesehatan bermanfaat untuk Anda dan keluarga.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artikelList.length > 0 ? (
            artikelList.map((item, idx) => (
              <Link href={`/artikel/${item.$id}`} key={idx} className="group flex flex-col bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="w-full h-[200px] bg-gray-100 relative">
                    {item.fotoUrl ? (
                        <img src={item.fotoUrl} alt={item.judul} className="object-cover w-full h-full" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">Artikel Kesehatan</div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] bg-[#e6f4ea] text-[var(--green-deep)] font-bold px-2 py-1 rounded-md self-start mb-2">Edukasi</span>
                    <h3 className="text-[16px] font-bold text-gray-800 leading-[1.4] mb-3 group-hover:text-[var(--green-deep)] line-clamp-2">{item.judul}</h3>
                    <p className="text-[13px] text-gray-500 line-clamp-3 mt-auto">{item.isi}</p>
                    <div className="mt-4 pt-4 border-t border-gray-50 text-[11px] text-gray-400 flex justify-between">
                       <span>{new Date(item.$createdAt).toLocaleDateString('id-ID')}</span>
                       <span>Oleh: {item.penulis}</span>
                    </div>
                  </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full py-10">Belum ada artikel.</p>
          )}
        </div>
      </div>
      <FooterSection />
    </main>
  );
}