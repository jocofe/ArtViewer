import { useState } from "react";
import { ArtCardDetails } from "../../models/art-card";
import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from "../Icons/icons";
import "../../styles/index.scss"


export const ArtCard = (props: ArtCardDetails) => {
  const [ isOnFav, setIsOnFav ] = useState(false);
  const [ isOnSaved, setIsOnSaved ] = useState(false);

  const { imageURL, title, author, date } = props;

  const handleSaved = () => {
    setIsOnSaved(!isOnSaved);
  };

  const handleFav = () => {
    setIsOnFav(!isOnFav);
  };

  return (
    <div className="art-card">
      <img src={imageURL} alt={title} className="art-card__image" />
        <section className="art-card__info">
          <h2 className="art-card__title">{title}</h2>
          <p className="art-card__author">{author}</p>
          <p className="art-card__date">{date}</p>
        </section>

        <section className="art-card__buttons">
          <i className="btn-icon">
            {<CopyLink />}
          </i>
          <i onClick={handleSaved} className="btn-icon">
            {isOnSaved? <FullBookmark/> : <Bookmark/> }
          </i>
          <i onClick={handleFav} className="btn-icon">
            {isOnFav? <FullHeart/> : <Heart/>}
          </i>
        </section>
    </div>
  );
};

export default ArtCard;
