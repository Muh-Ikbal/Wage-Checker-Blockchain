# 💰 Upah Harian Blockchain

Aplikasi berbasis React dan Ethereum (Ganache/MetaMask) untuk mencatat dan memverifikasi upah pekerja secara terdesentralisasi menggunakan teknologi blockchain.

## 🛠️ Fitur Utama

- ✅ Pencatatan upah oleh mandor
- 🔍 Pengecekan upah pekerja berdasarkan ID
- 🔐 Autentikasi dengan JWT
- 🔗 Koneksi wallet (MetaMask)
- 📦 Penyimpanan upah langsung ke smart contract
- 📃 Export laporan upah (CSV)

---

## 📦 Teknologi

- React
- solidity
- Ganache (local blockchain)
- MetaMask
- Supabase (untuk login Web2)
- Truffle
- node v-18

---

## 🚀 Instalasi & Menjalankan

### 1. **Clone repositori**
```bash
https://github.com/Muh-Ikbal/Wage-Checker-Blockchain.git
cd wage-checker-blockchain
```
### 2. **Install Dependenci**
```bash
cd frontend-upah-harian
npm install
```
### 3. **jalankan blockchain**
pastikan **ganache** sudah running
```bash
cd blockchain
truffle compile
truffle migrate
```

### 4. **salin contract address dari truffle migrate**
copy contract address yang sudah di generate melalu **truffle migrate** lalu paste ke **/frontend-upah-harian/src/components/blockchain.js**
paste contract di file:
```bash
cd frontend-upah-harian/components/blockchain.js
```

### 5. **Jalankan Project**
pastikan berada di  /frontend-upah-harian:
```bash
npm run dev
node server.js
```
