"use client";

import { useState } from 'react';
import { databases } from '@/appwrite';
import { ID } from 'appwrite';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, User, FileText, Activity } from 'lucide-react';

export default function PendaftaranPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    tglLahir: '',
    usia: '',
    klaster: '',
    keluhan: ''
  });

  const klasterOptions = [
    'Klaster 2 (Usia < 18, Anak, KIA)',
    'Klaster 3 (Usia > 18 & Lansia)',
    'Klaster 4 (Penyakit Menular)',
    'Lintas Klaster',
  ];

  const handleNikChange = (nik: string) => {
    setFormData(prev => ({ ...prev, nik }));
    
    if (nik.length === 16) {
      try {
        const hh = parseInt(nik.substring(6, 8));
        const bb = parseInt(nik.substring(8, 10));
        const tt = parseInt(nik.substring(10, 12));
        
        const tanggalLahir = hh > 40 ? hh - 40 : hh;
        const tahunLahir = tt > 26 ? 1900 + tt : 2000 + tt;
        
        const dob = new Date(tahunLahir, bb - 1, tanggalLahir);
        const today = new Date();
        
        let age = today.getFullYear() - dob.getFullYear();
        if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
          age--;
        }
        
        let autoKlaster = '';
        if (age < 18) autoKlaster = klasterOptions[0];
        else autoKlaster = klasterOptions[1];

        setFormData(prev => ({
          ...prev,
          tglLahir: `${tanggalLahir.toString().padStart(2, '0')}/${bb.toString().padStart(2, '0')}/${tahunLahir}`,
          usia: age.toString(),
          klaster: autoKlaster
        }));
      } catch (e) {
        console.error("Invalid NIK");
      }
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (formData.nik.length !== 16 || !formData.nama) return alert('Pastikan NIK 16 digit dan Nama terisi.');
      setStep(2);
    } else if (step === 2) {
      if (!formData.klaster || !formData.keluhan) return alert('Harap pilih klaster dan isi keluhan.');
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const randomNo = "A-" + Date.now().toString().slice(-4);
      await databases.createDocument(
        'puskesmaslenteng_db',
        'antrean',
        ID.unique(),
        {
          nama: formData.nama,
          klaster: formData.klaster,
          status: 'Menunggu',
          nik: formData.nik,
          usia: parseInt(formData.usia) || 0,
          keluhan: formData.keluhan
        }
      );
      setSuccessId(randomNo);
    } catch (error) {
      alert("Gagal mendaftar: " + String(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (successId) {
    return (
      <main className="min-h-screen bg-[var(--cream)]">
        <Navbar />
        <div className="max-w-2xl mx-auto mt-20 p-8 glass-card text-center animate-fade-in">
          <CheckCircle size={80} className="text-[var(--green-soft)] mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-500 mb-2">Nomor Antrean Anda</h2>
          <div className="text-6xl font-black text-[var(--green-deep)] mb-6">{successId}</div>
          <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">Pendaftaran Berhasil!</h3>
          <p className="text-gray-500 mb-8">Silakan tunggu panggilan di ruang tunggu {formData.klaster.split(' ')[0]}.</p>
          <Link href="/" className="btn-primary w-full justify-center">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[var(--cream)]">
      <Navbar />
      
      <div className="flex-1 w-full max-w-3xl mx-auto p-5 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--green-deep)] font-bold mb-8 hover:-translate-x-1 transition">
          <ArrowLeft size={16} /> Kembali
        </Link>
        
        <div className="glass-card">
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-green-50 rounded-full text-[var(--green-mid)] mb-4">
              <Activity size={32} />
            </div>
            <h1 className="text-3xl font-black text-[var(--green-deep)] mb-2" style={{fontFamily: 'var(--font-outfit)'}}>Pendaftaran Pasien</h1>
            <p className="text-gray-500 text-sm">Lengkapi langkah di bawah ini untuk mengambil nomor antrean.</p>
          </div>

          {/* Stepper Progress */}
          <div className="flex mb-8 items-center justify-between px-10 relative">
            <div className="absolute top-1/2 left-12 right-12 h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-12 h-1 bg-[var(--green-mid)] -z-10 -translate-y-1/2 transition-all duration-300" style={{width: `${(step-1)*50}%`}}></div>
            
            {[1,2,3].map((s) => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-[var(--green-deep)] text-white shadow-md shadow-green-900/20' : 'bg-gray-200 text-gray-400'}`}>
                {s}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <div className="animate-fade-in space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-2 mb-4"><User size={20} className="text-[var(--green-mid)]"/> Data Diri Pasien</h2>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">NIK (16 Digit)</label>
                  <input type="text" maxLength={16} value={formData.nik} onChange={(e) => handleNikChange(e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50 focus:border-[var(--green-mid)] focus:ring-1 focus:ring-[var(--green-mid)] outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                  <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 focus:border-[var(--green-mid)] focus:ring-1 focus:ring-[var(--green-mid)] outline-none transition" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-[3]">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tgl Lahir (Auto)</label>
                    <input type="text" readOnly value={formData.tglLahir} className="w-full p-3 border rounded-xl bg-gray-200 text-gray-600 outline-none" />
                  </div>
                  <div className="flex-[2]">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Usia</label>
                    <input type="text" readOnly value={formData.usia} className="w-full p-3 border rounded-xl bg-gray-200 text-gray-600 outline-none" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-2 mb-4"><FileText size={20} className="text-[var(--green-mid)]"/> Layanan & Keluhan</h2>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tujuan Klaster</label>
                  <select value={formData.klaster} onChange={(e) => setFormData({...formData, klaster: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 focus:border-[var(--green-mid)] focus:ring-1 focus:ring-[var(--green-mid)] outline-none transition">
                    <option value="" disabled>Pilih Klaster</option>
                    {klasterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Keluhan Utama</label>
                  <textarea rows={4} value={formData.keluhan} onChange={(e) => setFormData({...formData, keluhan: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 focus:border-[var(--green-mid)] focus:ring-1 focus:ring-[var(--green-mid)] outline-none transition"></textarea>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-2 mb-4">Konfirmasi Pendaftaran</h2>
                <div className="bg-green-50/50 p-6 rounded-xl border border-green-100 space-y-3 text-sm">
                  <div className="flex"><span className="w-24 text-gray-500">NIK</span><span className="font-bold">: {formData.nik}</span></div>
                  <div className="flex"><span className="w-24 text-gray-500">Nama</span><span className="font-bold">: {formData.nama}</span></div>
                  <div className="flex"><span className="w-24 text-gray-500">Tgl Lahir</span><span className="font-bold">: {formData.tglLahir}</span></div>
                  <div className="flex"><span className="w-24 text-gray-500">Usia</span><span className="font-bold">: {formData.usia} Tahun</span></div>
                  <div className="flex"><span className="w-24 text-gray-500">Tujuan</span><span className="font-bold text-[var(--green-deep)]">: {formData.klaster}</span></div>
                  <div className="flex"><span className="w-24 text-gray-500">Keluhan</span><span className="font-bold">: {formData.keluhan}</span></div>
                </div>
                <p className="text-red-500 text-xs mt-2 italic">⚠️ Pastikan data di atas sudah benar sebelum menekan tombol Kirim.</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="flex-1 py-3 px-4 rounded-xl border-2 border-[var(--green-mid)] text-[var(--green-deep)] font-bold hover:bg-green-50 transition">
                Kembali
              </button>
            )}
            <button 
              onClick={step === 3 ? handleSubmit : handleNext} 
              disabled={isLoading}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition ${isLoading ? 'bg-gray-400' : 'bg-[var(--green-mid)] hover:bg-[var(--green-deep)]'}`}
            >
              {isLoading ? 'Memproses...' : (step === 3 ? 'Kirim Pendaftaran' : 'Lanjut')}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
