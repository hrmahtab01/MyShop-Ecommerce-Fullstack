import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Toaster, toast } from "sonner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://myshop-ecommerce-fullstack.onrender.com/api/v1/auth/signup", {
        name,
        email,
        password,
      })
      .then((respone) => {
        toast.success( respone.data?.message || "Signup successfully");

        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data?.message || "something went wrong");
        setTimeout(() => {
          setLoading(false);
        }, 500);

        console.log(error);
      });
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
        <form
          onSubmit={Handlesubmit}
          className="w-full max-w-md p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">YourShop</h2>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
            <p className="text-center mb-6">
              Enter your name email and password to signup
            </p>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
              />
            </div>
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
              {loading ? "loading..." : " Sign Up "}
            </button>
            <p className="mt-6 text-center text-sm ">
              already have an account?
              <Link to={"/login"} className="text-teal-500 font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/901d5513904805.5627a2590ce00.jpg"
            alt="sign in image"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
