import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Hash, Save, ArrowLeft, UserPlus, Edit3 } from "lucide-react";

export default function FormPekerja() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { pekerjaId } = useParams(); // id dari URL jika edit

  useEffect(() => {
    if (pekerjaId) {
      setIsEdit(true);
      setLoading(true);
      fetch(`/api/pekerja/${pekerjaId}`)
        .then((res) => res.json())
        .then((data) => {
          setId(data.id);
          setName(data.name);
        })
        .catch(() => alert("Gagal memuat data pekerja"))
        .finally(() => setLoading(false));
    }
  }, [pekerjaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isEdit ? `/api/pekerja/${pekerjaId}` : "/api/pekerja";
    const method = isEdit ? "PUT" : "POST";
    const body = JSON.stringify({ id, name });

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert(data.message);
      navigate("/pekerja");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/pekerja");
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all duration-300 hover:scale-110"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? "Edit Pekerja" : "Tambah Pekerja"}
            </h1>
            <p className="text-gray-600">
              {isEdit
                ? "Perbarui data pekerja"
                : "Tambahkan pekerja baru ke sistem"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              {isEdit ? (
                <Edit3 className="w-6 h-6 text-blue-600" />
              ) : (
                <UserPlus className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEdit ? "Form Edit Pekerja" : "Form Tambah Pekerja"}
              </h2>
              <p className="text-sm text-gray-600">
                {isEdit
                  ? "Ubah informasi pekerja"
                  : "Masukkan data pekerja baru"}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isEdit && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Hash className="w-4 h-4 inline mr-2" />
                    ID Pekerja
                  </label>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Masukkan ID pekerja"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nama Pekerja
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap pekerja"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Batal</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>
                    {loading ? "Menyimpan..." : isEdit ? "Perbarui" : "Simpan"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
