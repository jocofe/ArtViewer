import { ArtistCardDetails } from '../../models/artist-card';

export const ArtistCard = (props: ArtistCardDetails) => {
  const { imageId, author } = props;
  const iiiUrl = `https://framemark.vam.ac.uk/collections/${imageId}/full/!500,500/0/default.jpg`;

  return (
    <div className="carousel-item">
      <img src={iiiUrl} className="carousel-item__img" />
      <h4 className="carousel-item__author">{author}</h4>
    </div>
  );
};
