"use client";

import { useEffect, useState } from "react";
import { databases } from "@/appwrite";

// --- Info Rujukan ---
export function InfoRujukan() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await databases.listDocuments("puskesmaslenteng_db", "info_rujukan");
        setData(res.documents);
      } catch (e: any) {
        console.warn("Error fetching info_rujukan:", e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 flex flex-col items-start w-full">
      <div className="flex items-center gap-2 mb-4 text-[var(--ink)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 10h4"/><path d="M12 8v4"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-4l-3-4h-4"/><path d="M3 9v8a1 1 0 0 0 1 1h2"/><path d="M5 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"/><path d="M15 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"/></svg>
        <h3 className="font-bold text-[16px]">Informasi Rujukan</h3>
      </div>

      {loading ? (
        <div className="text-[13px] text-gray-400">Memuat...</div>
      ) : data.length === 0 ? (
        <div className="text-[13px] text-gray-500">Informasi rujukan belum tersedia.</div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {data.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <h4 className="font-bold text-[14px] text-[var(--ink)]">• {item.judul}</h4>
              <p className="text-[13px] text-black/50 leading-[1.5] pl-3">{item.isi}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Program Inovasi ---
export function ProgramInovasi() {
  const programs = [
    { nama: "Ketan Srikandi", desc: "Kelompok Pantauan Sukarela Risti Kandungan" },
    { nama: "Teropong Emas", desc: "Temukan, Obati, Pantau Orang dengan Gangguan Jiwa" },
    { nama: "Gempur Rokok", desc: "Gerakan Membantu Perokok Berhenti Rokok" }
  ];

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 flex flex-col items-start w-full">
      <div className="flex items-center gap-2 mb-4 text-[var(--ink)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>
        <h3 className="font-bold text-[16px]">Program Inovasi</h3>
      </div>
      
      <div className="flex flex-col gap-3 w-full">
        {programs.map((prog, idx) => (
          <div key={idx} className="flex gap-3 items-center border border-gray-100 rounded-xl p-3 bg-gray-50">
            <div className="w-[40px] h-[40px] rounded-lg bg-[var(--green-soft)] flex items-center justify-center shrink-0">
              <span className="text-[var(--green-deep)] font-bold text-[16px]">{idx + 1}</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-[13px] text-[var(--ink)] leading-tight">{prog.nama}</h4>
              <p className="text-[11px] text-gray-500 leading-tight mt-1">{prog.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Pengaduan & Kritik ---
export function PengaduanKritik() {
  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 flex flex-col items-start w-full">
      <div className="flex items-center gap-2 mb-2 text-[var(--ink)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        <h3 className="font-bold text-[16px]">Pengaduan & Kritik</h3>
      </div>
      <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
        Punya keluhan, saran, atau kritik untuk pelayanan kami? Sampaikan melalui:
      </p>
      
      <div className="flex flex-col gap-3 w-full">
        <a href="https://wa.me/6287765953171?text=Halo%20Admin%20Pengaduan" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-xl font-bold text-[13px] hover:bg-[#20b858] transition shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          Layanan Pengaduan
        </a>
        <a href="https://wa.me/6287765953171?text=Halo%20Admin%20Kritik%26Saran" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white border border-[#25D366] text-[#25D366] px-4 py-3 rounded-xl font-bold text-[13px] hover:bg-[#25D366]/10 transition shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          Kotak Saran & Kritik
        </a>
        <a href="https://www.lapor.go.id/" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white border border-[var(--green-mid)] text-[var(--green-mid)] px-4 py-3 rounded-xl font-bold text-[13px] hover:bg-gray-50 transition shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Portal SP4N LAPOR
        </a>
      </div>
    </div>
  );
}
