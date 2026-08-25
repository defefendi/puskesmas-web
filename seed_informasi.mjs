import { Client, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69f9bfa500229160605b');

const databases = new Databases(client);

const databaseId = 'puskesmaslenteng_db';
const collectionId = 'pusat_informasi';

const seedData = [
  { nama_aplikasi: 'Pendaftaran & Antrean Online', link_url: '/pendaftaran' },
  { nama_aplikasi: 'Survei Kepuasan Masyarakat (SKM)', link_url: 'https://forms.gle/contohskm' },
  { nama_aplikasi: 'Standar Tarif Layanan (Perda)', link_url: '/tarif' },
  { nama_aplikasi: 'Alur Pendaftaran & Rujukan', link_url: '/alur' },
  { nama_aplikasi: 'Hak dan Kewajiban Pasien', link_url: '/hak-kewajiban' },
  { nama_aplikasi: 'Jadwal Pelayanan Poli', link_url: '/jadwal' },
  { nama_aplikasi: 'Layanan Pengaduan (WhatsApp)', link_url: 'https://wa.me/6281234567890' }
];

async function seed() {
  for (let i = 0; i < seedData.length; i++) {
    const data = seedData[i];
    try {
      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data
      );
      console.log('Successfully inserted: ' + data.nama_aplikasi);
    } catch (e) {
      console.error('Failed to insert ' + data.nama_aplikasi + ': ', e.message);
    }
  }
}

seed();
