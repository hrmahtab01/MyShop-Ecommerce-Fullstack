import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Userlayout from "./Components/Layout/Userlayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Userlayout />}>
          {/* <user layout /> */}
        </Route>
        <Route>{/* <admin layout /> */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
