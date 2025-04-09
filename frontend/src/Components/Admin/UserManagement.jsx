import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const UserManagement = () => {
  const userId = useSelector((state) => state.userData?.value.user);
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [allUser, setAllUser] = useState([]);

  

  const fetchAlluser = async () => {
  await axios
      .get("https://myshop-ecommerce-fullstack.onrender.com/api/v1/auth/alluser")
      .then((response) => {
        setAllUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAlluser();
  }, []);

  useEffect(() => {
    if (!userId.role === "admin") {
      navigate("/");
    }
  }, [navigate, userId]);

  const handlechange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://myshop-ecommerce-fullstack.onrender.com/api/v1/auth/signup", formData)
      .then(() => {
        toast.success("user added successfully");
        setFormdata({
          name: "",
          email: "",
          password: "",
          role: "customer",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message || "something went wrong");
      });
  };

  const handleUserRolechange = async (userid, newrole) => {
    await axios
      .patch(`https://myshop-ecommerce-fullstack.onrender.com/api/v1/auth/update/${userid}`, {
        role: newrole,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "something went wrong");
      });
    
  };

  const HandleDeleteUser = async (userid) => {
    if (window.confirm("are you sure you want to delete this user")) {
      axios
        .delete(`https://myshop-ecommerce-fullstack.onrender.com/api/v1/auth/delete/${userid}`)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message || "something went wrong");
        });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 "> User Management</h2>
      {/* add new user form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4"> Add New User</h3>
        <form onSubmit={Handlesubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handlechange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handlechange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlechange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handlechange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button
            className="bg-green-500 py-2 px-4 text-white rounded hover:bg-green-600 duration-300 cursor-pointer"
            type="submit"
          >
            Add User
          </button>
        </form>
      </div>
      {/* user list management */}
      <div className="overflow-x-auto shadow sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="text-xs bg-gray-100 uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name </th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-700 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">
                  <select
                    className="p-2 border rounded"
                    value={item.role}
                    onChange={(e) =>
                      handleUserRolechange(item._id, e.target.value)
                    }
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4 ">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 duration-300 cursor-pointer"
                    onClick={() => HandleDeleteUser(item._id)}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
