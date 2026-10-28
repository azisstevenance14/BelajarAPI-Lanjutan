# 🌍 Dynamic Weather Search App (Geocoding API Integration)

Aplikasi web pencarian cuaca interaktif *real-time* yang memungkinkan pengguna mencari kondisi cuaca di berbagai kota di seluruh dunia. Dibuat menggunakan **Vanilla JavaScript (ES6+)** murni dengan mengintegrasikan dua API publik dari Open-Meteo secara asinkronus (*Chained API Request*).

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Open-Meteo](https://img.shields.io/badge/API-Open--Meteo-008080?style=for-the-badge)

---

## 🚀 Fitur Utama

- **🔍 Pencarian Kota Dinamis**: Pengguna dapat mengetik nama kota mana saja di dunia (contoh: *Gorontalo, Jakarta, Tokyo, London*) untuk mendapatkan data cuaca terkini.
- **🗺️ Integrasi Geocoding API**: Menerjemahkan nama kota input pengguna menjadi koordinat geografis (*latitude* & *longitude*) secara otomatis.
- **🌡️ Metrics Cuaca Real-Time**:
  - Suhu Udara (°C)
  - Kelembapan Udara (%)
  - Kecepatan Angin (km/jam)
  - Nama Kota & Negara Lokasi
- **🌤️ Penerjemah Kode Cuaca WMO**: Memetakan kode angka WMO dari API menjadi status cuaca yang mudah dipahami (Cerah, Berawan, Kabut, Hujan, Badai).
- **🎨 UI Glassmorphism Modern**: Tampilan responsif dengan efek transparan, tata letak CSS Grid & Flexbox, serta transisi kartu yang halus.
- **⚠️ Handling Input & Error Status**: Mengantisipasi kota yang tidak ditemukan atau kegagalan koneksi dengan memberikan umpan balik (*feedback*) berupa pesan status ke pengguna.

---

## 🛠️ Alur Kerja API (Chained Async/Await)

Aplikasi ini menggunakan pola pemanggilan API beruntun (*Chained API Fetch*):

1. **User Submit Form** ➡️ Mengambil teks nama kota dari elemen `<input>`.
2. **Fetch Geocoding API** ➡️ Mengirim nama kota ke `geocoding-api.open-meteo.com` untuk mendapatkan koordinat (*Latitude* & *Longitude*).
3. **Fetch Weather API** ➡️ Mengirim koordinat hasil pencarian ke `api.open-meteo.com` untuk menarik data meterologi *current weather*.
4. **DOM Manipulation** ➡️ Menyuntikkan hasil parsing JSON ke dalam kartu HTML dan menampilkan hasilnya ke layar.

---

## 📂 Struktur Project

```text
weather-search-app/
├── index.html       # Kerangka HTML & Formulir Pencarian
├── style.css        # Desain Glassmorphism & Layout Responsif
├── script.js        # Logika Asinkronus (Fetch, Event Listener, DOM)
└── README.md        # Dokumentasi Project