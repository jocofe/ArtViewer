import { ArtistCardDetails } from '../../models/artist-card';

export const ArtistCard = (props: ArtistCardDetails) => {
  const { imageId, author } = props;
  const iiiUrl = `https://framemark.vam.ac.uk/collections/${imageId}/full/!500,500/0/default.jpg`;
  const cleanedAuthor = author ? author.replace(/undefined/gi, '').trim() : '';

  return (
    <div className="carousel-item">
      <img src={iiiUrl} className="carousel-item__img" alt={cleanedAuthor || 'Artist Image'} />
      {cleanedAuthor && <h4 className="carousel-item__author">{cleanedAuthor}</h4>}
    </div>
  );
};
