"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full bg-white px-5 py-4 flex justify-center sticky top-0 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="w-full max-w-[1150px] flex justify-between items-center">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Image 
              src="/images/logo_puskesmaslenteng.png" 
              alt="Logo Puskesmas Lenteng" 
              width={54} 
              height={54} 
              className="object-contain hover:scale-105 transition" 
            />
          </Link>
          <Link href="/" className="flex flex-col justify-center">
            <h1 className="font-bold text-[var(--green-deep)] text-[16px] leading-tight hover:text-[var(--green-mid)] transition">Puskesmas Lenteng</h1>
            <p className="text-black/45 text-[11px] leading-tight">Jl. Raya Lenteng</p>
          </Link>
        </div>

        {/* Links & Button */}
        <div className="hidden md:flex items-center">
          <Link href="/" className="px-3 py-2 text-[14px] font-semibold text-gray-800 hover:text-[var(--green-mid)] transition">
            Beranda
          </Link>
          <Link href="/informasi" className="px-3 py-2 text-[14px] font-semibold text-gray-800 hover:text-[var(--green-mid)] transition">
            Informasi Publik
          </Link>
          <Link href="/berita" className="px-3 py-2 text-[14px] font-semibold text-gray-800 hover:text-[var(--green-mid)] transition">
            Berita Kegiatan
          </Link>
          <Link href="/artikel" className="px-3 py-2 text-[14px] font-semibold text-gray-800 hover:text-[var(--green-mid)] transition">
            Artikel Edukasi
          </Link>
          <div className="w-5"></div>
        </div>

      </div>
    </nav>
  );
}
