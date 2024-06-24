import { ArtistCardDetails } from '../../models/artist-card';
import { useNavigate } from 'react-router-dom';

export const ArtistCard = (props: ArtistCardDetails) => {
  const { imageId, author } = props;
  const imageUrl = `https://framemark.vam.ac.uk/collections/${imageId}/full/!500,500/0/default.jpg`;
  const cleanedAuthor = author ? author.replace(/undefined/gi, '').trim() : '';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search?search=${cleanedAuthor}`);
  };

  return (
    <div className="carousel-item" onClick={handleClick}>
      <img src={imageUrl} className="carousel-item__img" alt={cleanedAuthor || 'Artist Image'} />
      {cleanedAuthor && <h4 className="carousel-item__author">{cleanedAuthor}</h4>}
    </div>
  );
};
