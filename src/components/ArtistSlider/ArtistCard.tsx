import { ArtistCardDetails } from "../../models/artist-card";

export const ArtistCard = (props: ArtistCardDetails) => {
    const { imageId, author } = props;
    const iiiUrl = `https://framemark.vam.ac.uk/collections/${imageId}/full/!500,500/0/default.jpg`;

    return(
        <div className="artist-card">
            <img src={iiiUrl} className="artist-card__img"/>
            <h4 className="artist-card__author">{author}</h4>
        </div>
    );
}