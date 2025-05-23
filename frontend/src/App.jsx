import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Userlayout from "./Components/Layout/Userlayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./Components/Products/ProductDetails";
import Checkout from "./Components/Cart/Checkout";
import OrderConfirmPage from "./Pages/OrderConfirmPage";
import OrderDetailspage from "./Pages/OrderDetailspage";
import MyOrderspage from "./Pages/MyOrderspage";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdmiHomepage from "./Pages/AdmiHomepage";
import UserManagement from "./Components/Admin/UserManagement";
import ProductManagement from "./Components/Admin/ProductManagement";
import EditProductPage from "./Components/Admin/EditProductPage";
import OrderManagement from "./Components/Admin/OrderManagement";
import Success from "./Components/Common/Success";
import Paymentfail from "./Components/Common/paymentfail";
import Cancel from "./Components/Common/Cancel";

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
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmorder" element={<OrderConfirmPage />} />
          <Route path="/order/:id" element={<OrderDetailspage />} />
          <Route path="my-orders" element={<MyOrderspage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Paymentfail />} />
          <Route path="/cancel" element={<Cancel />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          {/* <admin layout /> */}
          <Route index element={<AdmiHomepage />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
