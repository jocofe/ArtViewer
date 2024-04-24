import { useEffect, useState } from "react";
import { ArtItem, ArtListItem } from "../../models/art-list";
import axios from "axios";
import { useParams } from "react-router-dom";

const mapArtListItemFromApiToArtDetails = (artItem: ArtItem): ArtListItem => {
    const { _images, _primaryTitle, _primaryMaker, _primaryDate, _primaryImageId, systemNumber, _currentLocation} = artItem;

    return {
        title: _primaryTitle,
        id: systemNumber,
        location: _currentLocation.displayName,
        date: _primaryDate,
        author: _primaryMaker.name,
        imageUrlBase: _images._iiif_image_base_url,
        imageId: _primaryImageId,
        imageUrlThumbnail: _images._primary_thumbnail
    }
}

export const ArtPage = () => {

    const [artDetails, setArtDetails] = useState<ArtListItem>();
    const { artId } = useParams();

    useEffect(() => {
        const fetchArtDetails = async () => {
                const apiURL = `https://api.vam.ac.uk/v2/objects/${artId}`;
                const response = await axios.get<ArtItem>(apiURL);
                const artItem = response.data;
                const artDetails = mapArtListItemFromApiToArtDetails(artItem);
                setArtDetails(artDetails);
        };

        fetchArtDetails();
    }, []);

    const { title, location, date, author, imageUrlBase } = artDetails  ?? {};

    return (
        <div className='artpiece-section'>
            <div className='artpiece__img'>
                <img src={imageUrlBase} alt={title} className="art-card__image" />
            </div>
            <div className='artpiece-info-wrapper'>
                <div className='artpiece__properties'>
                    <h1>{title}</h1>
                    <p>{author}</p>
                    <p>{date}</p>
                    <p>{location}</p>
                </div>
                <div className='artpiece__socials'>

                </div>
            </div>
        </div>
    );
}