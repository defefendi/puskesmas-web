"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { databases } from "@/appwrite";
import Link from "next/link";
import Image from "next/image";

export default function DetailKlasterPage() {
  const params = useParams();
  const klasterId = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKlaster = async () => {
      try {
        const res = await databases.listDocuments("puskesmaslenteng_db", "detail_klaster");
        const found = res.documents.find(doc => doc.nama_klaster.toLowerCase().includes(klasterId.replace("-", " ")));
        if (found) {
           setData(found);
        } else {
           // Fallback to exact match if not found by name heuristic, although ID is usually passed.
           const doc = await databases.getDocument("puskesmaslenteng_db", "detail_klaster", klasterId);
           setData(doc);
        }
      } catch (e) {
        console.warn("Klaster tidak ditemukan", e);
      } finally {
        setLoading(false);
      }
    };
    if (klasterId) fetchKlaster();
  }, [klasterId]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-[var(--green-deep)]">Memuat data klaster...</div>;
  if (!data) return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-bold text-gray-500 gap-4">
     Klaster tidak ditemukan.
     <Link href="/" className="bg-[var(--green-mid)] text-white px-6 py-2 rounded-xl">Kembali ke Beranda</Link>
  </div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-[var(--green-deep)] text-white pt-16 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">{data.nama_klaster}</h1>
          <p className="text-white/80 max-w-2xl text-[15px] md:text-[18px]">
            Sasaran: {data.sasaran}
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-12 -mt-12 relative z-20 pb-20">
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 md:p-10 mb-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* KOLOM KIRI */}
              <div>
                 <div className="mb-8">
                    <h2 className="text-xl font-black text-[var(--green-deep)] mb-4 flex items-center gap-2">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                       Layanan Kami
                    </h2>
                    <div className="text-gray-600 text-[14px] leading-relaxed whitespace-pre-wrap">
                       {data.layanan || "Belum ada informasi layanan."}
                    </div>
                 </div>

                 <div>
                    <h2 className="text-xl font-black text-[var(--green-deep)] mb-4 flex items-center gap-2">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                       Fasilitas
                    </h2>
                    <div className="text-gray-600 text-[14px] leading-relaxed whitespace-pre-wrap">
                       {data.fasilitas || "Belum ada informasi fasilitas."}
                    </div>
                 </div>
              </div>

              {/* KOLOM KANAN */}
              <div className="flex flex-col gap-6">
                 {data.url_gambar_ruangan && (
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                       <div className="bg-gray-100 p-2 font-bold text-center text-[12px] text-gray-500 border-b border-gray-100">Gambar Ruangan</div>
                       <img src={data.url_gambar_ruangan} alt="Gambar Ruangan" className="w-full h-auto object-cover" />
                    </div>
                 )}
                 {data.url_struktur_organisasi && (
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                       <div className="bg-gray-100 p-2 font-bold text-center text-[12px] text-gray-500 border-b border-gray-100">Struktur Organisasi</div>
                       <img src={data.url_struktur_organisasi} alt="Struktur Organisasi" className="w-full h-auto object-cover" />
                    </div>
                 )}
              </div>

           </div>
        </div>
        <div className="flex justify-center">
           <Link href="/" className="bg-gray-100 text-gray-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-200 transition">
              Kembali ke Beranda
           </Link>
        </div>
      </main>
    </div>
  );
}
