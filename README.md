# Trashify
**Scan. Sort. Save the Planet!**

## 📌 Tentang Trashify
Trashify adalah aplikasi manajemen limbah digital berbasis web yang memanfaatkan teknologi pemrosesan gambar untuk mengenali jenis sampah secara otomatis. Pengguna dapat memindai sampah, melihat lokasi pembuangan yang sesuai, serta melacak riwayat dan statistik kebiasaan ramah lingkungan mereka.

## 👥 Tim Pengembang
- **Ketua Kelompok**: Adji Dharmawan Indrianto - 22/499366/TK/54743  
- **Anggota 1**: Steven Namora Roha Saragi Napitu - 22/505930/TK/55405  
- **Anggota 2**: Tsaniya Khamal Khasanah - 22/503817/TK/55074

## 🚀 Fitur Utama
- 📷 **Scan & Klasifikasi Otomatis**: Unggah atau ambil foto sampah, lalu model API mengenali kategori (organik, anorganik, B3).
- 🤖 **Chatbot Interaktif**: Bantuan real‑time lewat chatbot untuk menjawab pertanyaan tentang pemilahan sampah, tips daur ulang, dan lokasi drop‑off. 
- 📊 **Riwayat & Statistik**: Dashboard menampilkan riwayat pembuangan dan grafik perkembangan kebiasaan.  
- 📍 **Lokasi Pembuangan**: Rekomendasi titik drop-off terdekat berdasarkan kategori sampah.  
- 📚 **Materi Edukasi**: Panduan memilah sampah & daur ulang.  
- 🔐 **Autentikasi**: Login/register menggunakan JWT dengan proteksi rute API.

## ⚙️ Teknologi
- **Frontend**: Next.js 13, Tailwind CSS  
- **Backend**: Node.js, Express.js, JWT, bcrypt  
- **Database**: PostgreSQL  
- **Model Klasifikasi**: TensorFlow.js
- **Deployment**:  
  - Frontend: [Vercel](https://senior-project-b3-05.vercel.app/)  
  - Backend: [Railway](https://seniorprojectb305-production.up.railway.app/)
 
## 🔗 Link Project Plan
- **ERD Diagram**: https://drive.google.com/file/d/1Oz2TV3yhAj19PWaVHxFy2HFekvySRGzt/view?usp=drive_link  
- **Use Case Diagram**: https://drive.google.com/file/d/1fBXwdMukOe5gKoq0vJaSnYfP140Yej62/view?usp=drive_link  
- **Desain Figma (Lo-Fi)**: https://www.figma.com/design/mFV2QpuH5CkntNINssYpy6/Lo-Fi-Trashify?node-id=0-1&t=GlhK1zdsbB3B8KmE-1
- **Desain Figma (Hi-Fi)**: https://www.figma.com/design/hDgtLvlAP89vSw0swyJWT4/Trashify?node-id=0-1&t=DxWC8lmR0OfSOuQX-1

## 🤝 Kontribusi
1. Fork repository ini
2. Buat branch baru: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambah fitur XYZ`
4. Push dan buka pull request

## 🎮 Penggunaan
1. Menjalankan Backend (Express.js)
  ```bash
  cd backend
   npm run dev
  ```
  Program akan berjalan pada port 8080 dengan url `http://localhost:8080`
  
2. Menjalankan Frontend (React + Next.js)
  ```bash
  cd backend
   npm run dev
```
Program akan berjalan pada port 3000 dengan url `http://localhost:3000`

## 📡 API Endpoints

Trashify menyediakan API RESTful yang komprehensif untuk mengakses fitur-fitur aplikasi secara programatis. Berikut adalah endpoint yang tersedia:

| Method | URL | Deskripsi |
|--------|-----|-----------|
| POST | `/api/pengguna/login` | Login user |
| POST | `/api/pengguna/register` | Register user |
| POST | `/api/sampah/create` | Upload gambar dan mengirim sampah |
| GET | `/api/sampah/total-waste?userId` | Lihat total sampah berdasarkan user Id |
| GET | `/api/sampah/weekly-weight?userId` | Mendapatkan sampah dalam satu minggu |

**Trashify — Bersama kita pilah, demi bumi yang lebih bersih** 🌱🌍
