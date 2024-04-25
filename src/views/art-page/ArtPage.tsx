import { useEffect, useState } from "react";
import { ArtObject, ArtObjectDetails, ArtObjectFromApi } from "../../models/art-list";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Socials } from "../../components/Socials/socials";
import { Button } from "../../components/Buttons/Buttons";

export const mapArtObjectApitoArtObject = (art: ArtObjectFromApi): ArtObjectDetails[] => {
return art.map((artItem: ArtObject) => {
    return {
    title: artItem.fields.title,
    date: artItem.fields.date_text,
    artist: artItem.fields.artist,
    id: artItem.fields.object_number,
    imageId: artItem.fields.primary_image_id,
    location: artItem.fields.place,
    type: artItem.fields.object,
    dimensions: artItem.fields.dimensions,
    image: artItem.fields.primary_image_id
    };
});
};

export const ArtPage = () => {

    const [artDetails, setArtDetails] = useState<ArtObjectDetails[]>([]);
    const { artId } = useParams();
    

    useEffect(() => {
        const fetchArtDetails = async () => {
                const apiURL = `https://api.vam.ac.uk/v1/museumobject/${artId}`;
                const response = await axios.get<ArtObjectFromApi>(apiURL);
                const mappedArtObject = mapArtObjectApitoArtObject(response.data)
                console.log(mappedArtObject)
                setArtDetails(mappedArtObject);
        };

        fetchArtDetails();
    }, [artId]);


    const linkToOfficialInfo = () => {
        const officialPageURL = `https://collections.vam.ac.uk/item/${artDetails[0]?.id}`;
        window.open(officialPageURL, "_blank");
    };


    return (
        <div className='artpiece-section'>
            <div className='artpiece__img'>
                {artDetails.length > 0 && (
                    <img src={`https://framemark.vam.ac.uk/collections/${artDetails[0]?.imageId}/full/!1000,1000/0/default.jpg`} alt={artDetails?.[0]?.title} className="art-card__image" />
                )}
            </div>
            <div className='artpiece-info-wrapper'>
                <h1 className ='art__title'>{artDetails?.[0]?.title}</h1>
                <div className='artpiece__properties'>
                    <h3>{artDetails?.[0]?.artist}</h3>
                    <p>{artDetails?.[0]?.date}</p>
                    <p>{artDetails?.[0]?.type}</p>
                    <p>{artDetails?.[0]?.dimensions}</p>
                    <p>{artDetails?.[0]?.location}</p>
                </div>
                <div className='artpiece__socials'>
                    <Socials />
                </div>
                <div className="artpiece__btn">
                    <Button onClick={linkToOfficialInfo}>View more information</Button>
                </div>
            </div>
        </div>
    );
}