import { useEffect, useState } from 'react';
import {
  ArtArtistDetails,
  ArtArtistFromApi,
  ArtArtistItem,
  ArtObject,
  ArtObjectDetails,
  ArtObjectFromApi,
} from '../../models/art-list';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Socials } from '../../components/Socials/socials';
import { Button } from '../../components/Buttons/Buttons';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import Viewer from 'react-viewer';

export const mapArtObjectApitoArtObject = (art: ArtObjectFromApi): ArtObjectDetails[] => {
  return art.map((artItem: ArtObject) => {
    return {
      title: artItem.fields.title,
      date: artItem.fields.date_text,
      artist: artItem.fields.artist,
      id: artItem.fields.object_number,
      imageId: artItem.fields.primary_image_id,
      location: artItem.fields.place,
      type: artItem.fields.object,
      dimensions: artItem.fields.dimensions,
      image: artItem.fields.primary_image_id,
    };
  });
};

export const mapArtApitoArtView = (art: ArtArtistFromApi): ArtArtistItem[] => {
  return art.records.map((artArtist: ArtArtistDetails) => {
    return {
      title: artArtist._primaryTitle,
      id: artArtist.systemNumber,
      artist: artArtist._primaryMaker.name,
      date: artArtist._primaryDate,
      location: artArtist._primaryPlace,
      imageId: artArtist._primaryImageId,
    };
  });
};

export const ArtPage = () => {
  const [artDetails, setArtDetails] = useState<ArtObjectDetails[]>([]);
  const [relatedArt, setRelatedArt] = useState<ArtArtistItem[]>([]);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const { artId } = useParams();

  useEffect(() => {
    const getInforforArtPage = async () => {
      try {
        const apiURL = `https://api.vam.ac.uk/v1/museumobject/${artId}`;
        const response = await axios.get(apiURL);
        console.log(response);
        const mappedArtObject = mapArtObjectApitoArtObject(response.data);
        setArtDetails(mappedArtObject);
        const artistName = mappedArtObject[0]?.artist;
        const cleanedArtistName = artistName.replace(/[^\w\d]+/g, ',');
        console.log(cleanedArtistName);

        if (artistName) {
          const artistApiUrl = `https://api.vam.ac.uk/v2/objects/search?q_actor=${cleanedArtistName}&images_exist=true`;
          console.log('Artist API URL:', artistApiUrl);
          const mapArtist = await axios.get(artistApiUrl);
          console.log(mapArtist.data);
          const relatedArtObjects = mapArtApitoArtView(mapArtist.data);
          setRelatedArt(relatedArtObjects);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (artId) {
      getInforforArtPage();
    }
  }, [artId]);

  const artDetailsInfo = artDetails?.[0];

  const linkToOfficialInfo = () => {
    const officialPageURL = `https://collections.vam.ac.uk/item/${artDetailsInfo.id}`;
    window.open(officialPageURL, '_blank');
  };

  if (!artDetailsInfo) {
    return <h3>No details found for this art.</h3>;
  }

  const openViewer = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsViewerVisible(true);
  };

  const closeViewer = () => {
    setIsViewerVisible(false);
  };

  return (
    <>
      <div className="artpiece-section">
        <div className="artpiece__img">
          {artDetails.length > 0 && (
            <img
              src={`https://framemark.vam.ac.uk/collections/${artDetailsInfo.imageId}/full/!1000,1000/0/default.jpg`}
              alt={artDetailsInfo.title}
              className="art-card__image"
              onClick={() =>
                openViewer(
                  `https://framemark.vam.ac.uk/collections/${artDetailsInfo.imageId}/full/!5000,5000/0/default.jpg`,
                )
              }
            />
          )}
        </div>
        <Viewer
          rotatable={false}
          changeable={false}
          attribute={false}
          scalable={false}
          noImgDetails={true}
          noNavbar={true}
          visible={isViewerVisible}
          onClose={closeViewer}
          images={[{ src: selectedImageUrl, alt: 'Image' }]}
          className="art-visualizer"
        />
        <div className="artpiece-info-wrapper">
          <h1 className="art__title">{artDetailsInfo.title}</h1>
          <div className="artpiece__properties">
            <h3>{artDetailsInfo.artist}</h3>
            <p>{artDetailsInfo.date}</p>
            <p>{artDetailsInfo.type}</p>
            <p>{artDetailsInfo.dimensions}</p>
            <p>{artDetailsInfo.location}</p>
          </div>
          <div className="artpiece__socials">
            <Socials artPieceId={artDetailsInfo.id}/>
          </div>
          <div className="artpiece__btn">
            <Button onClick={linkToOfficialInfo}>View more information</Button>
          </div>
        </div>
      </div>
      <div className="masonry-section">
        <h2 className="masonry__title">Explore more by {artDetailsInfo.artist}</h2>
        <div className="masonry-wrapper">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1200: 3, 1920: 4 }}>
            <Masonry className="masonry__columns" gutter="32px">
              {relatedArt.map(artArtist => (
                <Link key={artArtist.id} to={`/art-piece/${artArtist.id}`}>
                  <ArtCard
                    key={artArtist.id}
                    title={artArtist.title}
                    imageId={artArtist.imageId}
                    author={artArtist.artist}
                    date={artArtist.date}
                    id={artArtist.id}
                  />
                </Link>
              ))}
            </Masonry>
          </ResponsiveMasonry>
          <Link to={'/signup'}>
            <div className="masonry__button">
              <Button type="sub_primary">Sign Up to continue</Button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
