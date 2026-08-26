import Image from 'next/image';
import Link from 'next/link';

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5 6.2c-.3-1.2-1.1-2.1-2.2-2.3C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.4C1.6 4.1.8 5 .5 6.2 0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.2 1.1 2.1 2.2 2.3 2 .4 9.3.4 9.3.4s7.3 0 9.3-.4c1.1-.2 1.9-1.1 2.2-2.3.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8z" fill="#FF0000"/>
    <path d="M9.5 15.5L15.5 12 9.5 8.5v7z" fill="#FFF"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEDA75" />
        <stop offset="25%" stopColor="#FA7E1E" />
        <stop offset="50%" stopColor="#D62976" />
        <stop offset="75%" stopColor="#962FBF" />
        <stop offset="100%" stopColor="#4F5BD5" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
    <rect x="6" y="6" width="12" height="12" rx="3" stroke="#FFF" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="2.5" stroke="#FFF" strokeWidth="2" fill="none" />
    <circle cx="16" cy="8" r="1" fill="#FFF" />
  </svg>
);

const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 4v9.9c0 1.9-1.5 3.5-3.5 3.5S5.5 15.8 5.5 13.9s1.5-3.5 3.5-3.5c.2 0 .5 0 .7.1V7.9c-.2 0-.5-.1-.7-.1-3.6 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6 6.6-3 6.6-6.6V8.1c1 .8 2.4 1.3 3.9 1.3V6.3c-1.8 0-3.3-1.1-3.8-2.3h-3.2z" fill="#69C9D0" transform="translate(-1, -1)"/>
    <path d="M12 4.5v10c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3c.3 0 .5.1.8.1v-2.7c-.3-.1-.5-.1-.8-.1-3.1 0-5.7 2.6-5.7 5.7s2.6 5.7 5.7 5.7 5.7-2.6 5.7-5.7V8.7c.9.8 2.1 1.2 3.4 1.2v-2.7c-1.6 0-2.9-1-3.4-2.1h-2.7z" fill="#EE1D52" transform="translate(1, 1)"/>
    <path d="M11.5 4v10c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3c.3 0 .5.1.8.1v-2.7c-.3-.1-.5-.1-.8-.1-3.1 0-5.7 2.6-5.7 5.7s2.6 5.7 5.7 5.7 5.7-2.6 5.7-5.7V8.7c.9.8 2.1 1.2 3.4 1.2v-2.7c-1.6 0-2.9-1-3.4-2.1h-2.7z" fill="#FFF"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" fill="#1877F2"/>
    <path d="M15.47 15.58l.53-3.5h-3.32v-2.26c0-.96.47-1.89 1.96-1.89h1.5V5.04s-1.37-.24-2.68-.24c-2.73 0-4.54 1.68-4.54 4.7v2.73H7.08v3.49h3.04V24a12.03 12.03 0 003.82 0v-8.44h2.8" fill="#FFF"/>
  </svg>
);
import { databases } from '@/appwrite';

export default async function FooterSection() {
  let informasiList: any[] = [];
  try {
    const res = await databases.listDocuments('puskesmaslenteng_db', 'pusat_informasi');
    informasiList = res.documents;
  } catch (e) {
    console.warn("Could not fetch pusat_informasi for footer", String(e));
  }

  let settings: any = null;
  try {
    settings = await databases.getDocument('puskesmaslenteng_db', 'pengaturan_situs', '6a8e612c001e08cefe87');
  } catch (e) {
    console.warn("Could not fetch pengaturan_situs for footer", String(e));
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
              <a href={settings?.youtubeUrl || "https://youtube.com/@puskesmaslenteng"} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:scale-110 hover:bg-white/10 transition cursor-pointer flex items-center justify-center" title="YouTube">
                <YoutubeIcon size={24} />
              </a>
              <a href={settings?.instagramUrl || "https://instagram.com/puskesmaslenteng"} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:scale-110 hover:bg-white/10 transition cursor-pointer flex items-center justify-center" title="Instagram">
                <InstagramIcon size={24} />
              </a>
              <a href={settings?.tiktokUrl || "https://tiktok.com/@puskesmaslenteng"} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:scale-110 hover:bg-white/10 transition cursor-pointer flex items-center justify-center" title="TikTok">
                <TiktokIcon size={24} />
              </a>
              <a href={settings?.facebookUrl || "https://facebook.com"} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:scale-110 hover:bg-white/10 transition cursor-pointer flex items-center justify-center" title="Facebook">
                <FacebookIcon size={24} />
              </a>
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
