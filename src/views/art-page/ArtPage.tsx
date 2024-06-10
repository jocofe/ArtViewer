import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Socials } from '../../components/Socials/Socials';
import { Button } from '../../components/Buttons/Buttons';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArtCard } from '../../components/ArtCard/ArtCard';
import Viewer from 'react-viewer';
import { UserContext } from '../../context/UserContextProvider';
import { useGetArtPageInfo } from '../../hooks/useGetArtPageInfo';
import useGenerateDescription from '../../hooks/useGenerateDescription'; // Importar el hook
import useOfficialPageLink from '../../hooks/useLinkToOfficialInfo';

export const ArtPage = () => {
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const { isLoggedIn } = useContext(UserContext);
  const { artDetails, relatedArt } = useGetArtPageInfo();
  const artDetailsInfo = artDetails?.[0];
  const description: string = useGenerateDescription();
  const linkToOfficialInfo = useOfficialPageLink(artDetailsInfo?.id);

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
          <h1 className="art__title">{artDetailsInfo.title !== '' ? artDetailsInfo.title : 'Unknown title'}</h1>
          <div className="artpiece__properties">
            <h3 className="artpiece__artist">{artDetailsInfo.artist}</h3>
            <p className="artpiece__date">{artDetailsInfo.date}</p>
            <p className="artpiece__type">{artDetailsInfo.type}</p>
            <p className="artpiece__dimensions">{artDetailsInfo.dimensions}</p>
            <p className="artpiece__location">{artDetailsInfo.location}</p>
          </div>
          <div className="artpiece__socials">
            <Socials
              artPieceId={artDetailsInfo.id}
              artPieceImageId={artDetailsInfo.imageId}
              artPieceAuthor={artDetailsInfo.artist}
              artPieceDate={artDetailsInfo.date}
              artPieceTitle={artDetailsInfo.title}
              artPieceImageUrl={artDetailsInfo.imageUrl}
            />
          </div>
          <div className="artpiece__description">
            <h3 className="description__title">Description</h3>
            <p className="description__text">{description}</p>
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
          {!isLoggedIn && (
            <div className="masonry__button">
              <Button component={NavLink} to={'/signup'} color="sub_primary">
                Sign Up to continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
