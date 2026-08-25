"use client";
import { useState } from 'react';

export default function BMICalculator() {
  const [bb, setBb] = useState('');
  const [tb, setTb] = useState('');

  let imt: number | null = null;
  let kategori = '';
  let warna = 'bg-white/10';
  let bbIdeal: number | null = null;
  let keterangan = '';

  const bbVal = parseFloat(bb);
  const tbVal = parseFloat(tb);

  if (bbVal > 0 && tbVal > 0) {
    const tMeter = tbVal / 100;
    imt = bbVal / (tMeter * tMeter);

    if (imt < 18.5) {
      kategori = 'BB Kurang';
      warna = 'bg-blue-500 text-white';
    } else if (imt <= 22.9) {
      kategori = 'Normal';
      warna = 'bg-green-500 text-white';
    } else if (imt <= 24.9) {
      kategori = 'Kelebihan';
      warna = 'bg-orange-400 text-white';
    } else if (imt <= 29.9) {
      kategori = 'Obesitas 1';
      warna = 'bg-orange-500 text-white';
    } else {
      kategori = 'Obesitas 2';
      warna = 'bg-red-500 text-white';
    }

    const aa2 = imt < 18.5 ? 18.5 * (tMeter * tMeter) : 22.9 * (tMeter * tMeter);
    bbIdeal = aa2;

    if (bbVal > aa2) {
      keterangan = `Turunkan ${(bbVal - aa2).toFixed(1)} kg`;
    } else if (bbVal < aa2) {
      keterangan = `Naikkan ${(aa2 - bbVal).toFixed(1)} kg`;
    } else {
      keterangan = 'Ideal!';
    }
  }

  return (
    <div className="w-full bg-gradient-to-r from-[var(--green-deep)] to-[#1A8A57] rounded-[24px] lg:rounded-[100px] p-3 lg:px-8 lg:py-3 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-3 text-white mx-auto my-6 border border-white/20 backdrop-blur-md">
      
      {/* Title */}
      <div className="flex items-center gap-2 flex-shrink-0 w-full lg:w-auto justify-center lg:justify-start border-b lg:border-b-0 border-white/10 pb-2 lg:pb-0">
         <span className="font-bold text-[14px]">Cek IMT</span>
      </div>
      
      {/* Inputs */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <label className="text-[11px] font-semibold opacity-90">BB (kg)</label>
          <input 
            type="number" 
            value={bb} 
            onChange={(e) => setBb(e.target.value)} 
            className="w-[50px] h-[30px] px-1 text-[13px] font-bold text-[var(--ink)] bg-white rounded-md outline-none text-center"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <label className="text-[11px] font-semibold opacity-90">TB (cm)</label>
          <input 
            type="number" 
            value={tb} 
            onChange={(e) => setTb(e.target.value)} 
            className="w-[50px] h-[30px] px-1 text-[13px] font-bold text-[var(--ink)] bg-white rounded-md outline-none text-center"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-[1px] h-6 bg-white/20 mx-1"></div>

      {/* Results */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between lg:justify-start gap-3 lg:gap-5 w-full lg:w-auto pt-1 lg:pt-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] opacity-90">IMT:</span>
          <div className={`px-2.5 py-0.5 rounded-md font-bold text-[13px] shadow-sm min-w-[45px] text-center ${warna}`}>
            {imt === null ? '-' : imt.toFixed(1)}
          </div>
          {imt !== null && (
            <span className={`text-[11px] font-bold px-2 py-0.5 bg-white/10 rounded-md border border-white/20 text-white`}>{kategori}</span>
          )}
        </div>

        {imt !== null && (
          <div className="flex items-center gap-3 lg:gap-4 lg:border-l border-white/20 lg:pl-4">
             <div className="flex items-center gap-1.5">
                <span className="text-[10px] opacity-80">BB Ideal:</span>
                <span className="text-[12px] font-bold bg-white text-[var(--green-deep)] px-2 py-0.5 rounded-md">{bbIdeal?.toFixed(1)}kg</span>
             </div>
             <div className="flex items-center gap-1.5">
                <span className="text-[10px] opacity-80">Target:</span>
                <span className="text-[12px] font-bold bg-[#ffc107] text-black px-2 py-0.5 rounded-md shadow-sm">{keterangan}</span>
             </div>
          </div>
        )}
      </div>

    </div>
  );
}
