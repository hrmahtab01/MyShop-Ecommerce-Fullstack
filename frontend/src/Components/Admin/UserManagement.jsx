import React, { useState } from "react";

const UserManagement = () => {
  const user = [
    {
      _id: 1,
      name: "mango",
      email: "withgaming50@gmail.com",
      role: "admin",
    },
  ];
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handlechange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const Handlesubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormdata({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleUserRolechange = (userid, newrole) => {
    console.log({ id: userid, role: newrole });
  };

  const HandleDeleteUser = (userid) => {
    if (window.confirm("are you sure you want to delete this user")) {
      console.log(userid);
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
            {user.map((item) => (
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
