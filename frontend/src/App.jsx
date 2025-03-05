import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Userlayout from "./Components/Layout/Userlayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Userlayout />}>
          {/* <user layout /> */}
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route>{/* <admin layout /> */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
