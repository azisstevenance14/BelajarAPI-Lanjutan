// 1. Tangkap Elemen-Elemen DOM
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const statusMessage = document.getElementById('status-message');
const weatherCard = document.getElementById('weather-card');

const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('weather-desc');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind-speed');

// 2. Fungsi Penerjemah Kode Cuaca WMO
function terjemahkanKodeCuaca(code) {
    if (code === 0) return 'Cerah';
    if (code >= 1 && code <= 3) return 'Berawan Sebagian';
    if (code >= 45 && code <= 48) return 'Kabut';
    if (code >= 51 && code <= 67) return 'Hujan Gerimis';
    if (code >= 80 && code <= 82) return 'Hujan Deras';
    if (code >= 95) return 'Badai Petir';
    return 'Cuaca Normal';
}

// 3. Event Listener Saat Form Di-submit (User Klik Cari / Enter)
searchForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Mencegah halaman reload otomatis
    
    const namaKota = cityInput.value.trim();
    if (!namaKota) return;

    statusMessage.innerText = 'Mencari lokasi kota...';
    weatherCard.classList.add('hidden');

    try {
        // --- LANGKAH 1: Ambil Koordinat (Lat & Long) dari Nama Kota ---
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(namaKota)}&count=1&language=id&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        // Cek Apakah Kota Ditemukan
        if (!geoData.results || geoData.results.length === 0) {
            statusMessage.innerText = `Kota "${namaKota}" tidak ditemukan! Coba nama kota lain.`;
            return;
        }

        // Ambil Data Hasil Pencarian Pertama
        const lokasi = geoData.results[0];
        const { latitude, longitude, name, country } = lokasi;

        statusMessage.innerText = 'Mengambil data cuaca...';

        // --- LANGKAH 2: Ambil Data Cuaca Menggunakan Koordinat Tersebut ---
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // --- LANGKAH 3: Tampilkan Hasil ke Layar HTML ---
        cityNameEl.innerText = `${name}, ${country}`;
        tempEl.innerText = weatherData.current.temperature_2m;
        descEl.innerText = terjemahkanKodeCuaca(weatherData.current.weather_code);
        humidityEl.innerText = `${weatherData.current.relative_humidity_2m}%`;
        windEl.innerText = `${weatherData.current.wind_speed_10m} km/jam`;

        // Sembunyikan Pesan Status & Tampilkan Kartu Cuaca
        statusMessage.innerText = '';
        weatherCard.classList.remove('hidden');

    } catch (error) {
        console.error('Terjadi Error:', error);
        statusMessage.innerText = 'Gagal mengambil data. Pastikan koneksi internet aktif!';
    }
});