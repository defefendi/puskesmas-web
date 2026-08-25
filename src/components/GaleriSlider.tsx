"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { databases } from "@/appwrite";

export default function GaleriSlider() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

      useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const res = await databases.listDocuments("puskesmaslenteng_db", "galeri");
        if (res.documents.length > 0) {
          setImages(res.documents.map((doc) => doc.url));
        } else {
          setImages([
            "/images/slider-1.jpg",
            "/images/slider-2.jpg",
          ]);
        }
      } catch (e: any) {
        console.warn("Error fetching galeri:", e.message);
        setImages([
            "/images/slider-1.jpg",
            "/images/slider-2.jpg",
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchGaleri();
  }, []);

  useEffect(() => {
    if (images.length === 0 || loading) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }
    }, 3000); // Auto slide every 3 seconds
    return () => clearInterval(interval);
  }, [images, loading]);

  return (
    <div className="w-full flex flex-col items-start mb-10">
      <h2 className="text-[20px] font-bold text-[var(--ink)] mb-4">Galeri Kegiatan</h2>
      
      {loading ? (
        <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-[16px] flex items-center justify-center">
          <span className="text-gray-400">Memuat galeri...</span>
        </div>
      ) : (
        <div ref={scrollRef} className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
          {images.map((url, idx) => (
            <div key={idx} className="snap-center shrink-0 w-full h-[300px] relative rounded-[16px] overflow-hidden">
              <Image 
                src={url} 
                alt={`Galeri ${idx + 1}`} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 95vw"
              />
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
