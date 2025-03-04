import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex-col items-center justify-center p-8 md:p-12">
        <form className="w-full max-w-md p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">YourShop</h2>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
            <p className="text-center mb-6">
              Enter your email and password to login
            </p>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2"></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
