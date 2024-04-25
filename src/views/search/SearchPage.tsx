import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ArtItem, ArtListItem, ArtListItemFromApi } from "../../models/art-list";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { ArtCard } from "../../components/ArtCard/ArtCard";

export const mapSearchToArtView = (art: ArtListItemFromApi): ArtListItem[] => {
  return art.records.map((artItem: ArtItem) => {
      return {
      title: artItem._primaryTitle,
      imageUrlThumbnail: artItem._images._primary_thumbnail,
      imageUrlBase: artItem._images._iiif_image_base_url,
      id: artItem.systemNumber,
      author: artItem._primaryMaker.name,
      date: artItem._primaryDate,
      location: artItem._primaryPlace,
      imageId: artItem._primaryImageId,
      };
  });
  };


  export const SearchPage = () => {

  const [search, setSearch] = useState<ArtListItem[]>([]);
  const [params, setParams] = useSearchParams();
  console.log(params.get('search'));

  

  useEffect(() => {
    const fetchArt = async () => {
        const apiURL = `https://api.vam.ac.uk/v2/objects/search?q=${'search'}&images_exist=true`;
            const response = await axios.get<ArtListItemFromApi>(apiURL);
            const mappedSearch = mapSearchToArtView(response.data);
            setSearch(mappedSearch);
            console.log((mappedSearch));
    };

    fetchArt();
  }, []);

  return (

      <div>
        
    </div>
  );
};