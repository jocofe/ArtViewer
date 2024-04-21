import { Outlet } from "react-router-dom";
import { TopBar } from "./layouts/Topbar/TopBar";
import { Footer } from "./layouts/Footer/Footer";
import "./styles/index.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ModalDefault } from "./components/Dialogs/ModalDefault";

const AppLayout: React.FC = () => {
  console.log("AppLayout renderizado");

  const [isModalClose, SetIsModalClose] = useState(false);

  const handleCloseModal = () => {
    SetIsModalClose(true);
  };


  useEffect (() => {
        const fetchArt = async () => {
            const apiURL = `https://api.vam.ac.uk/v2/objects/search?q_object_type=drawing&order_sort=asc&page=1&page_size=15&images_exist=true`;
            console.log ('llamada API');
            const response = await axios.get(apiURL);
            console.log(response.data);
        };

        fetchArt();
    }, []);

  return (
    <>
      <TopBar size="normal" type="without-login" />
      <Outlet />
      <ModalDefault isClose={isModalClose} onClose={handleCloseModal} />
      <Footer />
    </>
  );
};

export default AppLayout;
