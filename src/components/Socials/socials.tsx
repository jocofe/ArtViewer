import React from "react";
import { Heart, FullHeart, CopyLink, Bookmark, FullBookmark } from "../Icons/icons";
import { useState } from "react";

export const Socials = () => {

    const [ isOnFav, setIsOnFav ] = useState(false);
    const [ isOnSaved, setIsOnSaved ] = useState(false);


const handleSaved = () => {
    setIsOnSaved(!isOnSaved);
};

const handleFav = () => {
    setIsOnFav(!isOnFav);
};

return (
    <>
    <div className='socials-wrapper'>
        <i>
            <CopyLink className='icon' />
        </i>
        <i onClick={handleSaved}>
            {isOnSaved? <FullBookmark  className="icon" /> : <Bookmark className="icon"/>}
        </i>
        <i onClick={handleFav}>
            {isOnFav? <FullHeart  className="icon" /> : <Heart className="icon"/>}
        </i>
    </div>
    </>
);
};