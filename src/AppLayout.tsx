import { Outlet } from "react-router-dom";
import { TopBar } from "./layouts/Topbar/TopBar";
import { Footer } from "./layouts/Footer/Footer";
import "./styles/index.scss";
import { useState } from "react";
import { ModalDefault } from "./components/Dialogs/ModalDefault";

const AppLayout: React.FC = () => {
  console.log('AppLayout renderizado');

  const [isModalClose, SetIsModalClose] = useState(false);

  const handleCloseModal = () => {
    SetIsModalClose(true)
  };


  return (
    <>
      <TopBar  size='normal' type='without-login' />
      <Outlet />
      <Footer />
      <ModalDefault isClose={isModalClose} onClose={handleCloseModal}/>
    </>
  );
}

export default AppLayout;
