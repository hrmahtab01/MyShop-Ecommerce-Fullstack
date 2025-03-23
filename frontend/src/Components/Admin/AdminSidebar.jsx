import React, { useState } from "react";
import {
  FaBox,
  FaClipboardList,
  FaSignLanguage,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FaBoxOpen, FaShop } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to={"/admin"} className="text-2xl font-medium">
          YourShop
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center"> Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to={"/admin/user"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center gap-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to={"/admin/products"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center gap-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to={"/admin/orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center gap-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to={"/admin/shop"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center gap-2"
          }
        >
          <FaShop />
          <span>Shop</span>
        </NavLink>
        <div className="mt-6">
          {loading ? (
            <p className="text-center">Loading.....</p>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded flex items-center justify-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
