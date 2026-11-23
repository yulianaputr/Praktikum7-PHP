# Praktikum 7 - Aplikasi Web CRUD Data Mahasiswa (PHP Native & MySQL)

Aplikasi web berbasis arsitektur Client-Server yang mengimplementasikan operasi **CRUD (Create, Read, Update, Delete)** menggunakan PHP Native, MySQL, HTML, CSS, dan JavaScript dengan pertukaran data berformat JSON.

## Identitas Mahasiswa
- **Nama:** Yuliana Putri
- **NIM:** 2211501030
- **Program Studi:** S1 Teknologi Informasi

## Teknologi yang Digunakan
- **Web Server & Database:** Laragon 6.0.0 (Apache 2.4.54, PHP 8.1.10, MySQL 8.0.30)
- **Back-End:** PHP Native (MySQLi Prepared Statement & JSON API)
- **Front-End:** HTML5, CSS3, JavaScript (Fetch API)

## Struktur Folder Project
```text
praktikum-fullstack/
├── backend/
│   ├── create.php    # Endpoint tambah data mahasiswa
│   ├── db.php        # Konfigurasi koneksi database MySQL
│   ├── delete.php    # Endpoint hapus data mahasiswa
│   ├── read.php      # Endpoint ambil seluruh data mahasiswa
│   └── update.php    # Endpoint ubah data mahasiswa
├── index.html        # Halaman utama antarmuka pengguna
├── script.js         # Logika front-end & komunikasi API (Fetch)
└── style.css         # Styling tampilan halaman web
```

## Cara Menjalankan Project di Lokal
1. Simpan folder project di dalam direktori `C:\laragon\www\praktikum-fullstack\`.
2. Jalankan **Apache** dan **MySQL** pada aplikasi Laragon.
3. Buat database baru bernama `praktikum-fullstack` melalui phpMyAdmin atau HeidiSQL, lalu jalankan query berikut:
   ```sql
   CREATE TABLE IF NOT EXISTS mahasiswa (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nama VARCHAR(150) NOT NULL,
       nim VARCHAR(50) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
4. Akses aplikasi melalui browser pada alamat `http://localhost/praktikum-fullstack/index.html`.
