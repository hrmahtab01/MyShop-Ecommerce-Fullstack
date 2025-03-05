import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Userlayout from "./Components/Layout/Userlayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/collections/:collection" element={<CollectionPage />} />
        </Route>
        <Route>{/* <admin layout /> */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
