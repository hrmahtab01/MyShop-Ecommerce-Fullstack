import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("https://myshop-ecommerce-fullstack.onrender.com/api/v1/auth/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data));
        toast.success(response.data.message || "Login successfully");
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "something went wrong");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
        <form
          onSubmit={HandleSubmit}
          className="w-full max-w-md p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">YourShop</h2>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
            <p className="text-center mb-6">
              Enter your email and password to login
            </p>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black p-2 rounded-lg font-semibold hover:bg-teal-800 text-white duration-300 cursor-pointer"
            >
              {loading ? "Loading..." : " Sign in"}
            </button>
            <p className="mt-6 text-center text-sm ">
              Don't have an account?
              <Link to={"/signup"} className="text-teal-500 font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src="https://www.iconicindia.com/cdn/shop/articles/Winter_Outfit_Ideas.png?v=1693488909"
            alt="sign in image"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
