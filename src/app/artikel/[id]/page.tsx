import { databases } from '@/appwrite';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import Link from 'next/link';
import { Query } from 'appwrite';

export const revalidate = 60;

export default async function DetailArtikel({ params }: { params: { id: string } }) {
  let item = null;
  let recentList: any[] = [];
  
  try {
    item = await databases.getDocument('puskesmaslenteng_db', 'artikel_kesehatan', params.id);
    const recentRes = await databases.listDocuments('puskesmaslenteng_db', 'artikel_kesehatan', [
      Query.orderDesc('$createdAt'),
      Query.limit(5)
    ]);
    recentList = recentRes.documents.filter((d: any) => d.$id !== params.id).slice(0, 3);
  } catch (e: any) {
    console.warn("Item not found", e.message);
  }

  if (!item) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
          <Link href="/artikel" className="text-[var(--green-mid)] hover:underline">Kembali ke Daftar Artikel</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] flex flex-col">
      <Navbar />
      
      <div className="flex-1 w-full max-w-[800px] mx-auto px-5 py-12">
        <Link href="/artikel" className="text-[var(--green-mid)] hover:underline mb-8 inline-block text-sm font-bold">
           &larr; Kembali ke Daftar Artikel
        </Link>
        
        <article className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 mb-12">
           {item.fotoUrl && (
              <div className="w-full h-[300px] md:h-[400px] relative">
                 <img src={item.fotoUrl} alt={item.judul} className="object-cover w-full h-full" />
              </div>
           )}
           <div className="p-6 md:p-10">
              <span className="text-[12px] bg-[#e6f4ea] text-[var(--green-deep)] font-bold px-3 py-1 rounded-md mb-4 inline-block">Edukasi Kesehatan</span>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--ink)] mb-4 leading-tight">{item.judul}</h1>
              <div className="flex items-center gap-4 text-[13px] text-gray-500 border-b border-gray-100 pb-6 mb-6">
                 <span>Penulis: <strong>{item.penulis}</strong></span>
                 <span>•</span>
                 <span>{new Date(item.$createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                 {item.isi}
              </div>
           </div>
        </article>

        {/* BACA JUGA SECTION */}
        {recentList.length > 0 && (
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-[var(--ink)] mb-4 border-b border-gray-100 pb-3">Baca Juga Artikel Lainnya</h3>
             <div className="flex flex-col gap-4">
               {recentList.map((recent: any, idx: number) => (
                 <Link href={`/artikel/${recent.$id}`} key={idx} className="group flex gap-4 items-center">
                   {recent.fotoUrl ? (
                     <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                       <img src={recent.fotoUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="" />
                     </div>
                   ) : (
                     <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                   )}
                   <div className="flex-1">
                     <h4 className="font-bold text-[14px] text-gray-800 group-hover:text-[var(--green-deep)] transition line-clamp-2 leading-[1.4] mb-1">{recent.judul}</h4>
                     <span className="text-[11px] text-gray-400">{new Date(recent.$createdAt).toLocaleDateString('id-ID')}</span>
                   </div>
                 </Link>
               ))}
             </div>
          </div>
        )}
      </div>

      <FooterSection />
    </main>
  );
}