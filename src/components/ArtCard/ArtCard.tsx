import { useState } from "react";
import { ArtCardDetails } from "../../models/art-card";
import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from "../Icons/icons";
import React from "react";


export const ArtCard = (props: ArtCardDetails) => {
  const [ isOnFav, setIsOnFav ] = useState(false);
  const [ isOnSaved, setIsOnSaved ] = useState(false);

  const { imageId, title, author, date } = props;
  const iiiUrl = `https://framemark.vam.ac.uk/collections/${imageId}/full/!500,500/0/default.jpg`;

  const handleSaved = () => {
    setIsOnSaved(!isOnSaved);
  };

  const handleFav = () => {
    setIsOnFav(!isOnFav);
  };

  const handleImageSize = (event: React.ChangeEvent<HTMLImageElement>) => {
    if (event.target.height > event.target.width) {
      event.target.style.maxHeight = 'auto';
      event.target.style.width = '500px';
    } else {
      event.target.style.width = '500px';
      event.target.style.height = 'auto';
    }
  }

  return (
    <div className="art-card">
      <img src={iiiUrl} onLoad={handleImageSize} alt={title} className="art-card__image" />
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

