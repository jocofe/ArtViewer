import { Outlet } from "react-router-dom";
import { TopBar } from "./layouts/Topbar/TopBar";
import { Footer } from "./layouts/Footer/Footer";
import "./styles/index.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArtItem, ArtListItem, ArtListItemFromApi } from "./models/art-list";

export const mapArtApitoArtView = (art: ArtListItemFromApi): ArtListItem[] => {
  return art.records.map((artItem: ArtItem, index: number) => {
    return {
      title: artItem._primaryTitle,
      imageUrlThumbnail: artItem._images._primary_thumbnail,
      imageUrlBase: artItem._images._iiif_image_base_url,
      id: index + 1,
      author: artItem._primaryMaker.name,
      date: artItem._primaryDate,
      location: artItem._primaryPlace
    };
  });
};

function AppLayout() {
  console.log('AppLayout renderizado');

  const [artpieces, setArtPieces] = useState<[]>([]);

  useEffect (() => {

        const fetchArt = async () => {
            const apiURL = `https://api.vam.ac.uk/v2/objects/search?q_object_type=drawing&order_sort=asc&page=1&page_size=15&images_exist=true`;
            console.log ('llamada API');
            const response = await axios.get(apiURL);
            //setArtPieces(mapArtApitoArtView(response.data));
            const mapArt = mapArtApitoArtView(response.data);
            console.log(mapArt);
        };

        fetchArt();
    }, []);

  return (
    <>
      <TopBar  size='normal' type='without-login' />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
