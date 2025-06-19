import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Database, LogOut, Menu, X, Wallet } from "lucide-react";

const Sidebar = ({
  isOpen,
  onToggle,
  walletAddress,
  setWalletAddress,
  setWalletConnection,
  switchWallet,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/dashboard",
      description: "Overview dan ringkasan",
    },
    {
      id: "workers",
      label: "Data Pekerja",
      icon: Users,
      path: "/workers",
      description: "Kelola data pekerja",
    },
  ];

  const bottomItems = [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const MenuItem = ({ item, isActive }) => {
    const Icon = item.icon;

    return (
      <div
        className={`relative group cursor-pointer transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
        } rounded-xl mx-3 mb-2`}
        onClick={() => navigate(item.path)}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="flex items-center px-4 py-3 space-x-3">
          <Icon
            className={`w-5 h-5 ${
              isActive
                ? "text-white"
                : "text-gray-600 group-hover:text-blue-600"
            }`}
          />
          <div className={`flex-1 ${isOpen ? "block" : "hidden"}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{item.label}</span>
              {item.badge && (
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </div>
            {hoveredItem === item.id && (
              <p className="text-xs opacity-75 mt-1">{item.description}</p>
            )}
          </div>
        </div>

        {isActive && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-2xl border-r border-gray-200 z-50 transition-all duration-300 ${
          isOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div
            className={`flex items-center space-x-3 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">WorkChain</h1>
              <p className="text-xs text-gray-600">Blockchain Payroll</p>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <div className={`mx-3 mt-4 mb-6 ${isOpen ? "block" : "hidden"}`}>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Wallet className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-green-800 font-medium">
                  Wallet Connected
                </p>
                <p className="text-xs text-green-700 font-mono truncate max-w-[120px]">
                  {walletAddress}
                </p>
              </div>
              <button
                onClick={async () => {
                  await switchWallet();
                }}
                className="text-xs bg-gradient-to-r from-green-200 to-emerald-200 border border-green-200 rounded-xl px-3 py-2"
              >
                change
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 py-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>
        </nav>

        <div className="border-t border-gray-200 p-2">
          <div className="space-y-1 mb-4">
            {bottomItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>

          <div className="mx-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 space-x-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5" />
              <span
                className={`font-medium text-sm ${isOpen ? "block" : "hidden"}`}
              >
                Keluar
              </span>
            </button>
          </div>
        </div>

        <div
          className={`p-4 border-t border-gray-200 ${
            isOpen ? "block" : "hidden"
          }`}
        ></div>
      </div>
    </>
  );
};

export default Sidebar;
