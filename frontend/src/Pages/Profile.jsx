import React, { useEffect, useState } from "react";
import MyOrderspage from "./MyOrderspage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Profile = () => {
  const data = useSelector((state) => state.userData.value);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!data?.token) {
      navigate("/login");
    }
  }, [navigate, data]);

  const handleLogout = () => {
    setLoader(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      setLoader(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="w-full md:w-1/3 lg:1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {data?.user?.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{data?.user?.email}</p>
            {loader ? (
              <h1 className="text-center">Loading...</h1>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-amber-600 duration-300 cursor-pointer "
              >
                Logout
              </button>
            )}
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrderspage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
