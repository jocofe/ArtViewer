import { useEffect, useState } from "react";
import axios from "axios";
import { ArtistItem, ArtistSliderItem, ArtistSliderItemFromApi } from "../../models/artist-slider";
import { ArtistCard } from "./ArtistCard";

export const mapArtistApitoSlider = (artist: ArtistSliderItemFromApi): ArtistSliderItem[] => {
return artist.records.map((artistItem: ArtistItem, index: number) => {
    return {
    id: index + 1,
    author: artistItem._primaryMaker.name,
    imageId: artistItem._primaryImageId
    };
});
};

export const ArtistSlider = () => {
    
    const [artist, setArtist] = useState<ArtistSliderItem[]>([]);

    useEffect(() => {
        const fetchArtist = async () => {
            const apiURL = `https://api.vam.ac.uk/v2/objects/search?q_object_type=drawing&order_sort=asc&page=1&page_size=7&images_exist=true`;
            console.log('Llamada a la API');
            try {
                const response = await axios.get<ArtistSliderItemFromApi>(apiURL);
                const mappedArtist = mapArtistApitoSlider(response.data);
                setArtist(mappedArtist);
                console.log(mappedArtist);
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };

        fetchArtist();
    }, []);

    
    return (
            <div className='slider'>
                {artist.map((artistItem: ArtistSliderItem) => (
                    <ArtistCard
                        author={artistItem.author}
                        imageId={artistItem.imageId}
                    />
                ))}
            </div>
    );
}
