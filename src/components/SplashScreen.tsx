"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Memulai transisi fade out setelah 2.5 detik
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 2500);

    // Menghilangkan komponen sepenuhnya setelah 3 detik
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!showSplash) return null;

  return (
    <div
      className={"fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 " + (fade ? "opacity-0" : "opacity-100")}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 animate-pulse">
        <Image
          src="/images/logo_puskesmaslenteng.png"
          alt="Logo Puskesmas Lenteng"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className="mt-6 text-xl md:text-2xl font-bold text-[var(--green-deep)] text-center font-outfit">
        Selamat Datang di Puskesmas Lenteng
      </h1>
    </div>
  );
}
