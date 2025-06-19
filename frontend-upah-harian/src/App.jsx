import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import Pekerja from "./pages/Pekerja";
import FormPekerja from "./pages/FormPekerja";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/DashboardLayout";
import WageCheckPage from "./pages/WageChecker";
function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
        }
      }
    };
    checkConnection();
  }, []);

  const switchWallet = async () => {
    console.log("running....");
    if (!window.ethereum) return alert("MetaMask tidak ditemukan");

    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } else {
        alert("Tidak ada akun yang dipilih");
      }
    } catch (err) {
      console.error("Gagal mengganti akun wallet:", err);
      alert("Gagal mengganti akun wallet: " + err.message);
    }
  };

  const isAuthenticated = !!localStorage.getItem("token"); // cek token JWT
  console.log(isAuthenticated);
  return (
    <Router>
      <Routes>
        {/* Halaman publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/wage-check"
          element={
            <WageCheckPage
              connectWallet={switchWallet}
              walletAddress={walletAddress}
              walletConnected={walletConnected}
            />
          }
        />

        {/* Halaman dengan login dan layout Sidebar */}
        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                setWalletConnection={setWalletConnected}
                switchWallet={switchWallet}
              />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <DashboardAdmin
                walletAddress={walletAddress}
                walletConnected={walletConnected}
              />
            }
          />
          <Route path="/workers" element={<Pekerja />} />
          <Route path="/workers/add" element={<FormPekerja />} />
          <Route path="/workers/edit/:pekerjaId" element={<FormPekerja />} />
        </Route>

        {/* Redirect jika path tidak dikenali */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
