export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  tanggal: Date;
  tagLabel: string;
  isUrgent?: boolean;
}

export interface Pasien {
  id: string;
  nik: string;
  nama: string;
  usia: number;
  klaster: string;
  keluhan: string;
  status: string;
  waktuDaftar: Date;
}

export interface TenagaMedis {
  id: string;
  nama: string;
  jabatan: string;
  jadwal: string;
  emoji: string;
}

export interface Layanan {
  id: string;
  nama: string;
  deskripsi: string;
  emoji: string;
}

export interface ProgramPuskesmas {
  id: string;
  nama: string;
  deskripsi: string;
  jadwal: string;
}
