import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Userlayout from "./Components/Layout/Userlayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Userlayout />}>
          {/* <user layout /> */}
          <Route index element={<Home />} />
        </Route>
        <Route>{/* <admin layout /> */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
