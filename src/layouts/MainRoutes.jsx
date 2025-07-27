import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/header/Navbar";

const MainRoutes = () => {
  const location = useLocation();

  const onHeaderAndFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div>
      {onHeaderAndFooter || <Navbar />}

      <Outlet />
      {onHeaderAndFooter || <Footer />}
    </div>
  );
};

export default MainRoutes;
