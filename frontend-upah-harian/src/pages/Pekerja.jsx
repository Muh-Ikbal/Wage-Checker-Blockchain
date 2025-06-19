import { useState, useEffect } from "react";
import { Users, AlertCircle, Pencil, Trash2, Plus, User } from "lucide-react";

export default function Pekerja() {
  const [pekerja, setPekerja] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch("/api/pekerja", { method: "GET" });
      if (!response.ok) throw new Error("Gagal mengambil data pekerja");
      const data = await response.json();
      setPekerja(data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus pekerja ini?");
    if (!konfirmasi) return;

    try {
      const res = await fetch(`/api/pekerja/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus data");
      alert("Data berhasil dihapus");
      getData(); // refresh
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleEdit = (id) => {
    alert("Edit pekerja ID: " + id);
    // bisa arahkan ke halaman edit nanti, contoh: navigate(`/edit-pekerja/${id}`)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Pekerja</h1>
        <p className="text-gray-600">Kelola data pekerja dalam sistem</p>
      </div>

      {/* Add Button */}
      <div className="mb-6">
        <a
          href="/workers/add"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Pekerja</span>
        </a>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Daftar Pekerja
              </h2>
              <p className="text-sm text-gray-600">
                {pekerja.length} pekerja terdaftar
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl inline-flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          ) : pekerja.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada data pekerja tersimpan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pekerja.map((p) => (
                <div
                  key={p.id}
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {p.name}
                        </h3>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium">
                            ID: {p.id}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <a
                        href={`/workers/edit/${p.id}`}
                        className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all duration-300 hover:scale-110"
                        title="Edit Pekerja"
                      >
                        <Pencil className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-300 hover:scale-110"
                        title="Hapus Pekerja"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
