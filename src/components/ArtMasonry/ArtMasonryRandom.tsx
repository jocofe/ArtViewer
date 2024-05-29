import { useContext, useEffect, useState } from 'react';
import { ArtItem, ArtListItem, ArtListItemFromApi } from '../../models/art-list';
import axios from 'axios';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../Buttons/Buttons';
import { UserContext } from '../../context/UserContextProvider';

export const mapArtApitoArtView = (art: ArtListItemFromApi): ArtListItem[] => {
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

export const ArtMasonryRandom = () => {
  const [artList, setArtList] = useState<ArtListItem[]>([]);
  const [page, setPage] = useState(1);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const fetchArt = async () => {
      const apiURL = `https://api.vam.ac.uk/v2/objects/search?q_object_type=drawing&order_sort=asc&page=${page}&page_size=15&images_exist=true`;
      const response = await axios.get<ArtListItemFromApi>(apiURL);
      const mappedArtList = mapArtApitoArtView(response.data);
      setArtList([...artList, ...mappedArtList]);
    };

    fetchArt();
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (artList.length > 0) {
      const lastArtItem = document.getElementById(`art-item-${artList.length - 1}.id`);
      if (lastArtItem) {
        lastArtItem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [artList]);

  return (
    <div className="masonry-section">
      <h2 className="masonry__title">Explore some art</h2>
      <div className="masonry-wrapper">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
          <Masonry className="masonry__columns" gutter="32px">
            {artList.map((artItem: ArtListItem) => (
              <div className="relative" key={artItem.id}>
                <ArtCard
                  key={`art-item-${artItem.id}.id`}
                  title={artItem.title}
                  imageId={artItem.imageId}
                  author={artItem.author}
                  date={artItem.date}
                  id={artItem.id}
                />
                <Link className="expanded-anchor" to={`/art-piece/${artItem.id}`} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <div className="masonry__button">
          {isLoggedIn && (
            <Button color="sub_primary" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
          {!isLoggedIn && (
            <Button color="sub_primary" component={NavLink} to="/signup" className="btn-link--black">
              Sign Up to continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
