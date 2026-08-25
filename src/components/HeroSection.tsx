"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [isAlurModalOpen, setIsAlurModalOpen] = useState(false);

  return (
    <div className="w-full bg-gradient-to-br from-[var(--green-deep)] to-[#1A8A57] px-5 py-[60px]">
      <div className="max-w-[1100px] w-full mx-auto flex flex-col lg:flex-row items-center lg:justify-between lg:items-start gap-10">
        
        {/* Kiri: Teks & Tombol */}
        <div className="flex-[5] flex flex-col gap-4 text-white w-full py-2">
          <h1 className="text-[32px] md:text-[36px] font-black leading-[1.2]" style={{fontFamily: 'serif'}}>
            Kesehatan Anda adalah<br/>Prioritas Kami
          </h1>
          <p className="text-white/90 text-[15px] md:text-[16px] leading-[1.6] mb-2 max-w-[500px]">
            Puskesmas Lenteng hadir memberikan pelayanan kesehatan primer yang berkualitas, cepat, dan mudah diakses.
          </p>
          
          <div className="flex flex-wrap gap-[12px]">
            <Link href="/pendaftaran" className="bg-white text-[var(--green-deep)] px-[16px] py-[10px] rounded-[8px] font-bold text-[13px] flex items-center gap-2 hover:bg-gray-100 transition shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>
              Daftar Online
            </Link>
            <button onClick={() => setIsAlurModalOpen(true)} className="border border-white text-white px-[16px] py-[10px] rounded-[8px] font-bold text-[13px] flex items-center gap-2 hover:bg-white/10 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
              Alur Pelayanan
            </button>
          </div>
        </div>

        {/* Kanan: Kartu Kontak (Versi Compact) */}
        <div className="flex-1 flex flex-col lg:items-end w-full gap-[15px] lg:ml-auto">
          {/* Jam Buka Layanan */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-md p-4 rounded-[12px] flex items-center w-full max-w-[340px]">
            <div className="w-[95px] flex flex-col flex-shrink-0 justify-center gap-2">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <h3 className="text-white font-bold text-[12px] leading-[1.2]">Jam Buka<br/>Layanan</h3>
              </div>
              <div className="inline-flex items-center gap-1 bg-[#ff4d4f] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md self-start">
                <span className="text-[9px]">🚨</span> UGD 24 Jam
              </div>
            </div>
            
            <div className="w-[1px] h-12 bg-white/20 mx-3 flex-shrink-0"></div>
            
            <div className="flex-1 flex items-center">
              <div className="text-white font-semibold text-[11px] leading-[1.4] flex flex-col gap-1.5">
                <div className="flex gap-1">
                  <span>-</span>
                  <div>
                    <span className="opacity-90">Senin - Sabtu :</span><br/>
                    <span>07.30 - 12.00</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span>-</span>
                  <div>
                    <span className="opacity-90">Jum'at :</span><br/>
                    <span>07.30 - 10.30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kontak Darurat */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-md p-4 rounded-[12px] flex items-center w-full max-w-[340px]">
            <div className="w-[95px] flex flex-shrink-0 items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <h3 className="text-white font-bold text-[12px] leading-[1.2]">Kontak<br/>Darurat</h3>
            </div>
            
            <div className="w-[1px] h-12 bg-white/20 mx-3 flex-shrink-0"></div>
            
            <div className="flex-1 flex flex-col gap-2">
              <a href="https://wa.me/6287765953171" target="_blank" rel="noreferrer" className="bg-[#25D366] hover:bg-[#20b858] text-white flex items-center justify-center gap-2 px-3 py-1.5 rounded-md font-bold text-[11px] transition self-start min-w-[110px]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WhatsApp
              </a>
              <a href="tel:112" className="bg-[#A0522D] hover:bg-[#8B4513] text-white flex items-center justify-center gap-2 px-3 py-1.5 rounded-md font-bold text-[11px] transition self-start min-w-[110px]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                112
              </a>
            </div>
          </div>
        </div>

      </div>

      {isAlurModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsAlurModalOpen(false)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
             <button onClick={() => setIsAlurModalOpen(false)} className="absolute -top-12 right-0 text-white hover:text-gray-300 font-bold text-lg bg-white/20 px-4 py-2 rounded-lg">
                Tutup (X)
             </button>
             <img src="/images/alur_pelayanan.png" alt="Alur Pelayanan" className="w-full h-auto rounded-xl object-contain max-h-[85vh] bg-white" />
          </div>
        </div>
      )}
    </div>
  );
}
