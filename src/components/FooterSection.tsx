import Image from 'next/image';
import Link from 'next/link';
import { Globe, Camera, MessageCircle, Play } from 'lucide-react';
import { databases } from '@/appwrite';

export default async function FooterSection() {
  let informasiList: any[] = [];
  try {
    const res = await databases.listDocuments('puskesmaslenteng_db', 'pusat_informasi');
    informasiList = res.documents;
  } catch (e) {
    console.warn("Could not fetch pusat_informasi for footer", String(e));
  }

  return (
    <footer className="w-full bg-[#161A18] text-white pt-20 pb-8 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Brand & Socials */}
          <div className="flex-[4] space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image src="/images/logo_puskesmaslenteng.png" alt="Logo Puskesmas Lenteng" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Puskesmas Lenteng</h3>
                <p className="text-white/50 text-xs">Dinas Kesehatan Kabupaten Sumenep</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Memberikan pelayanan kesehatan primer berkualitas, terjangkau, dan merata kepada seluruh masyarakat Lenteng dan sekitarnya.
            </p>
            <div className="flex gap-3">
              {[Globe, Camera, MessageCircle, Play].map((Icon, idx) => (
                <div key={idx} className="p-2.5 bg-white/5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer">
                  <Icon size={20} />
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-white font-bold text-sm mb-1">Unduh apk Hadir App</p>
              <p className="text-white/50 text-xs mb-3">Absensi online pegawai Puskesmas Lenteng.</p>
              <a href="https://bit.ly/hadir_pkm_lenteng" target="_blank" rel="noreferrer" className="inline-block relative transition hover:scale-105">
                <div className="shadow-lg shadow-black/30 rounded-lg overflow-hidden relative w-32 h-16">
                  <Image src="/images/playstore.png" alt="Play Store" fill className="object-contain" />
                </div>
              </a>
              <p className="text-white/40 text-[10px] italic mt-1">*Via direct download (APK)</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex-[2] space-y-4">
            <h4 className="font-bold text-base">Layanan</h4>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <Link href="/klaster/klaster-1" className="hover:text-white transition">Klaster 1 (Manajemen)</Link>
              <Link href="/klaster/klaster-2" className="hover:text-white transition">Klaster 2 (Ibu & Anak)</Link>
              <Link href="/klaster/klaster-3" className="hover:text-white transition">Klaster 3 (Dewasa & Lansia)</Link>
              <Link href="/klaster/klaster-4" className="hover:text-white transition">Klaster 4 (Penyakit Menular)</Link>
              <Link href="/klaster/lintas-klaster" className="hover:text-white transition">Lintas Klaster</Link>
            </div>
          </div>

          <div className="flex-[2] space-y-4">
            <h4 className="font-bold text-base">Informasi</h4>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              {informasiList.length > 0 ? (
                informasiList.map((item, idx) => (
                  <Link href={item.link_url} key={idx} className="hover:text-white transition" target="_blank">
                    {item.nama_aplikasi}
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/informasi" className="hover:text-white transition">Pusat Informasi</Link>
                </>
              )}
            </div>
          </div>

          <div className="flex-[2] space-y-4">
            <h4 className="font-bold text-base">Tautan</h4>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <a href="https://dp2kb.sumenepkab.go.id/" target="_blank" rel="noreferrer" className="hover:text-white transition">Dinas Kesehatan</a>
              <a href="https://dinkes.jatimprov.go.id/" target="_blank" rel="noreferrer" className="hover:text-white transition">Dinkes Prov Jatim</a>
              <a href="https://www.kemkes.go.id/id/home" target="_blank" rel="noreferrer" className="hover:text-white transition">Kemenkes RI</a>
              <a href="https://www.bpjs-kesehatan.go.id/#/" target="_blank" rel="noreferrer" className="hover:text-white transition">BPJS Kesehatan</a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/50 text-xs">
          <p>© 2026 fnd – Puskesmas Lenteng.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
