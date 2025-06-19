import { useState, useEffect } from "react";
import {
  Search,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  Hash,
  ArrowLeft,
  Wallet,
  Download,
  Filter,
  Link,
  Unlink,
  Copy,
  ExternalLink,
} from "lucide-react";
import { getAllWages } from "../components/blockchain";

export default function WageCheckPage({
  walletAddress,
  walletConnected,
  connectWallet,
}) {
  const [workerId, setWorkerId] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [wages, setWages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [totalWages, setTotalWages] = useState(0);
  const [dateFilter, setDateFilter] = useState("");

  // Wallet connection state

  const fetchWages = async () => {
    setLoading(true);
    try {
      const data = await getAllWages(); // Ambil dari blockchain/smart contract
      let filtered = [...data];
      console.log(data);
      // Filter by date (opsional)
      if(workerId){
        filtered = filtered.filter((wage) => wage.worker_id === workerId);
      }
      if (dateFilter) {
        filtered = filtered.filter((wage) => wage.date.startsWith(dateFilter));
      }

      setWages(filtered);
      setTotalWages(
        filtered.reduce((sum, wage) => sum + parseFloat(wage.amount), 0)
      );
      setSearched(true);
    } catch (error) {
      alert("Gagal mengambil data upah: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!walletConnected) {
      alert(
        "Silakan hubungkan wallet terlebih dahulu untuk mengakses data blockchain"
      );
      return;
    }
    if (!workerId.trim()) {
      alert("Masukkan ID Pekerja");
      return;
    }

    fetchWages();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownloadReport = () => {
    // Create CSV content
    const csvContent = [
      ["Tanggal", "Nama", "ID Pekerja", "Jumlah", "Status", "Hash Transaksi"],
      ...wages.map((wage) => [
        formatDate(wage.date),
        wage.name,
        wage.worker_id,
        wage.amount,
        wage.verified ? "Terverifikasi" : "Pending",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `laporan-upah-${workerId || workerName}-${
        new Date().toISOString().split("T")[0]
      }.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoBack = () => {
    // Reset all states when going back
    setWages([]);
    setSearched(false);
    setWorkerId("");
    setWorkerName("");
    setDateFilter("");
    setTotalWages(0);
  };

  const openEtherscan = (txHash) => {
    window.open(`https://etherscan.io/tx/${txHash}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Cek Upah Pekerja
                  </h1>
                  <p className="text-sm text-gray-600">
                    Verifikasi upah dari blockchain
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Connection Section */}
            <div className="flex items-center space-x-4">
              {!walletConnected ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={async () => await connectWallet()}
                    className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                  >
                    <span>Connect Wallet</span>
                  </button>

                  <div className="relative group">
                    <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium">
                      <Wallet className="w-4 h-4" />
                      <span>Wallet Lain</span>
                    </button>

                    {/* Dropdown for other wallets */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div className="py-2">
                        <button
                          onClick={() => connectWallet("walletconnect")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span>WalletConnect</span>
                        </button>
                        <button
                          onClick={() => connectWallet("trustwallet")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          <span>Trust Wallet</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  {/* Wallet Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-green-600">
                            {walletAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Disconnect Button */}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Connection Alert */}
      {!walletConnected && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Koneksi Wallet Diperlukan
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Hubungkan wallet Anda untuk mengakses data upah dari
                  blockchain dan melakukan verifikasi transaksi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blockchain Status Bar */}
      {walletConnected && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Link className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">
                    Terhubung ke Blockchain
                  </h3>
                  <p className="text-sm text-blue-700">
                    Ethereum Mainnet • Gas Price: ~20 Gwei • Block: #18,542,891
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-700">Online</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Pencarian Data Upah
              </h2>
              <p className="text-sm text-gray-600">
                Masukkan ID atau nama pekerja untuk melihat riwayat upah
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Search Method Toggle */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash className="w-4 h-4 inline mr-2" />
                  ID Pekerja
                </label>
                <input
                  type="text"
                  value={workerId}
                  onChange={(e) => setWorkerId(e.target.value)}
                  placeholder="Contoh: PK001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Filter Bulan (Opsional)
                </label>
                <input
                  type="month"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Mencari...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Cari Upah</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {searched && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Riwayat Upah
                    </h2>
                    <p className="text-sm text-gray-600">
                      {wages.length} transaksi ditemukan
                      {dateFilter &&
                        ` untuk ${new Date(
                          dateFilter + "-01"
                        ).toLocaleDateString("id-ID", {
                          month: "long",
                          year: "numeric",
                        })}`}
                    </p>
                  </div>
                </div>
                {wages.length > 0 && (
                  <button
                    onClick={handleDownloadReport}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              {wages.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Tidak ditemukan data upah untuk {`ID: ${workerId}`}
                  </p>
                </div>
              ) : (
                <>
                  {/* Summary Card */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          Total Upah{" "}
                          {dateFilter
                            ? `Bulan ${new Date(
                                dateFilter + "-01"
                              ).toLocaleDateString("id-ID", {
                                month: "long",
                                year: "numeric",
                              })}`
                            : "Keseluruhan"}
                        </h3>
                        <p className="text-3xl font-bold text-green-700">
                          {formatCurrency(totalWages)}
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          Dari {wages.length} transaksi yang terverifikasi
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                  </div>

                  {/* Worker Info Card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {wages[0]?.name || "Nama tidak tersedia"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ID Pekerja:{" "}
                          {wages[0]?.worker_id || "ID tidak tersedia"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Wage Records List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Detail Transaksi Upah
                    </h3>
                    {wages.map((wage) => (
                      <div
                        key={wage.id}
                        className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 rounded-xl p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                              <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {formatDate(wage.date)}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-green-700">
                              {formatCurrency(wage.amount)}
                            </p>
                            <div className="flex items-center space-x-2 mt-1 justify-end">
                              {wage.verified ? (
                                <span className="flex items-center text-sm text-green-600">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Terverifikasi
                                </span>
                              ) : (
                                <span className="flex items-center text-sm text-yellow-600">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  Belum Terverifikasi
                                </span>
                              )}
                              <button
                                onClick={() => openEtherscan(wage.txHash)}
                                className="flex items-center text-blue-600 hover:text-blue-800 text-sm transition-colors"
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Lihat
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
