import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiPlus,
  FiList,
  FiShoppingBag,
  FiHome,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const SideBar = () => {
  const pathname = usePathname();
  const menuItems = [
    { name: "Add Products", path: "/dashboard", icon: <FiHome /> },
    // { name: "Add Product", path: "/dashboard/add-product", icon: <FiPlus /> },
    { name: "Product List", path: "/dashboard/product-list", icon: <FiList /> },
    // { name: "Orders", path: "/dashboard/orders", icon: <FiShoppingBag /> },
    // { name: "Customers", path: "/dashboard/customers", icon: <FiUsers /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FiSettings /> },
  ];

  return (
    <div className="md:w-64 w-16 min-h-screen bg-black text-gray-300 py-4 flex flex-col border-r border-gray-800 transition-all duration-300">
      {/* Logo/Header */}
      <div className="px-4 py-6 mb-4 flex justify-center md:justify-start">
        <h1 className="text-xl font-bold text-white hidden md:block">
          Seller Panel
        </h1>
        <span className="md:hidden text-white text-xl font-bold">BP</span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link href={item.path} key={item.name} passHref>
              <div className="group relative">
                <div
                  className={`flex items-center justify-center md:justify-start py-3 px-2 md:px-4 gap-3 mx-1 md:mx-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "hover:bg-gray-800 hover:text-white text-gray-400"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                  </span>
                  <p className="hidden md:block text-sm font-medium whitespace-nowrap">
                    {item.name}
                  </p>
                </div>
                {/* Tooltip for mobile */}
                <span className="md:hidden absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="px-2 md:px-4 py-4 border-t border-gray-800">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">BP</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white whitespace-nowrap">
              Base Pay
            </p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
