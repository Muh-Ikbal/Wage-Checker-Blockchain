import { useState, useEffect } from "react";
import {
  Wallet,
  Plus,
  Users,
  Calendar,
  DollarSign,
  Database,
  User,
  Hash,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getAllWages, addWage } from "../components/blockchain";
// import Sidebar from "../components/Sidebar";

export default function DashboardAdmin({ walletAddress, walletConnected }) {
  const [wages, setWages] = useState([]);
  const [workerId, setWorkerId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/pekerja", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(() => alert("Gagal memuat data pekerja"));
  }, []);

  useEffect(() => {
    const selected = data.find((p) => p.id === workerId);
    if (selected) {
      setName(selected.name);
    } else {
      setName("");
    }
  }, [workerId, data]);
  useEffect(() => {
    if (walletConnected && walletAddress) {
      fetchData();
    }
  }, [walletConnected, walletAddress]);

  const fetchData = () => {
    getAllWages()
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setWages(sorted);
      })
      .catch((e) => alert("Error blockchain: " + e.message));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (amount < 0) {
        alert("Upah tidak valid");
        return;
      }
      await addWage(workerId, name, amount, date);
      alert("Upah berhasil disimpan!");
      fetchData();
      setWorkerId("");
      setAmount("");
      setDate("");
      setName("");
    } catch (err) {
      alert("Gagal menyimpan: Upah hari ini sudah diinput");
    }
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

  // const truncateWallet = (address) => {
  //   if (!address) return "Belum terhubung";
  //   return `${address.slice(0, 6)}...${address.slice(-4)}`;
  // };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Admin
        </h1>
        <p className="text-gray-600">Kelola upah pekerja berbasis blockchain</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Tambah Data Upah
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash className="w-4 h-4 inline mr-2" />
                  ID Pekerja
                </label>
                <select
                  value={workerId}
                  onChange={(e) => setWorkerId(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                >
                  <option value="">Pilih ID Pekerja</option>
                  {data.map((pekerja) => (
                    <option key={pekerja.id} value={pekerja.id}>
                      {pekerja.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nama Pekerja
                </label>
                <input
                  value={name}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Nominal Upah
                </label>
                <input
                  placeholder="Masukkan nominal upah"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Tanggal
                </label>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Database className="w-5 h-5" />
                <span>Simpan ke Blockchain</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Data Upah Tersimpan
                    </h2>
                    <p className="text-sm text-gray-600">
                      {wages.length} data dalam blockchain
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {wages.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada data upah tersimpan</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wages.map((w, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {w.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Hash className="w-3 h-3 mr-1" />
                                ID: {w.worker_id}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(w.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(w.amount)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Tersimpan di blockchain
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
