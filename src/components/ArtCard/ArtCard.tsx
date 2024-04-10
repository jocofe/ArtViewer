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
          <i className="icon">
            {<CopyLink className="icon"/>}
          </i>
          <i onClick={handleSaved} >
            {isOnSaved? <FullBookmark className="icon" /> : <Bookmark className="icon"/> }
          </i>
          <i onClick={handleFav} className="icon">
            {isOnFav? <FullHeart className="icon"/> : <Heart className="icon"/>}
          </i>
        </section>
    </div>
  );
};

