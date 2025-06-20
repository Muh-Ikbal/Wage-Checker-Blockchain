import { useState } from "react";
import {
  Shield,
  Wallet,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Lock,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BlockWage</h1>
                <p className="text-xs text-gray-600">Sistem Upah Blockchain</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Fitur
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Keuntungan
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Kontak
              </a>
            </nav>
            <div className="flex space-x-3">
              <a
              href="/wage-check"
                className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                Cek Upah
              </a>
             
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
                🚀 Revolusi Sistem Penggajian
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Sistem Upah
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Blockchain
                </span>
                <br />
                yang Transparan
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Kelola pembayaran upah pekerja dengan teknologi blockchain yang
                aman, transparan, dan tidak dapat dimanipulasi. Memberikan
                kepercayaan penuh untuk semua pihak.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
               
                <a
                href="/wage-check"
                  className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 flex items-center justify-center space-x-2"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Cek Upah Saya</span>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="h-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center px-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium">Upah Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Teknologi blockchain memberikan transparansi dan keamanan maksimal
              dalam pengelolaan upah pekerja
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Keamanan Tinggi
              </h3>
              <p className="text-gray-600">
                Data upah tersimpan dalam blockchain yang terenkripsi dan tidak
                dapat diubah atau dimanipulasi
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Transparansi Penuh
              </h3>
              <p className="text-gray-600">
                Semua transaksi upah dapat dilihat dan diverifikasi oleh semua
                pihak yang terlibat
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Proses Cepat
              </h3>
              <p className="text-gray-600">
                Pencatatan upah langsung tersimpan dalam blockchain dengan
                proses yang cepat dan efisien
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Mengapa Memilih BlockWage?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Tidak Ada Manipulasi
                    </h3>
                    <p className="text-gray-600">
                      Data upah tersimpan permanen dan tidak dapat diubah oleh
                      siapapun
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Privasi Terjaga
                    </h3>
                    <p className="text-gray-600">
                      Akses data hanya untuk pihak yang berwenang dengan
                      enkripsi tingkat tinggi
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Efisiensi Tinggi
                    </h3>
                    <p className="text-gray-600">
                      Mengurangi biaya administrasi dan mempercepat proses
                      penggajian
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Bergabunglah Sekarang
                </h3>
                <p className="text-gray-600">
                  Dapatkan sistem penggajian yang transparan dan aman
                </p>
              </div>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Mulai Gratis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">BlockWage</h3>
                  <p className="text-xs text-gray-400">
                    Sistem Upah Blockchain
                  </p>
                </div>
              </div>
              <p className="text-gray-400">
                Solusi penggajian berbasis blockchain yang transparan dan aman
                untuk masa depan yang lebih baik.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pengecekan Upah
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Laporan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bantuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dokumentasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@blockwage.com</p>
                <p>📱 +62 812-3456-7890</p>
                <p>📍 Kendari, Indonesia</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BlockWage. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
