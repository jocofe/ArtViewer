import { Outlet } from "react-router-dom";
import { TopBar } from "./layouts/Topbar/TopBar";
import { Footer } from "./layouts/Footer/Footer";
import "./styles/index.scss";
import { useState } from "react";
import { ModalDefault } from "./components/Dialogs/ModalDefault";
import { ArtistSlider } from "./components/ArtistSlider/ArtistSlider";

const AppLayout: React.FC = () => {
  console.log("AppLayout renderizado");

  const [isModalClose, SetIsModalClose] = useState(false);

  const handleCloseModal = () => {
    SetIsModalClose(true);
  };

  return (
    <>
      <TopBar size="normal" type="without-login" />
      <ArtistSlider/>
      <Outlet />
      <ModalDefault isClose={isModalClose} onClose={handleCloseModal} />
      <Footer />
    </>
  );
};

export default AppLayout;
