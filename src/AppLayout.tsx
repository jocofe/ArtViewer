import { Outlet } from "react-router-dom";
import { TopBar } from "./layouts/Topbar/TopBar";
import { Footer } from "./layouts/Footer/Footer";
import "./styles/index.scss";
import React from "react";

const AppLayout: React.FC = () => {
  console.log("AppLayout renderizado");

  return (
    <>
      <TopBar size="normal" type="without-login" />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
