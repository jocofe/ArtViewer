import { ArtistCardDetails } from '../../models/artist-card';

export const ArtistCard = (props: ArtistCardDetails) => {
  const { imageId, author } = props;
  const iiiUrl = `https://framemark.vam.ac.uk/collections/${imageId}/full/!500,500/0/default.jpg`;

  return (
    <div className="slider-track">
      <div className="slide">
        <img src={iiiUrl} className="slide__img" />
        <h4 className="slide__author">{author}</h4>
      </div>
    </div>
  );
};
