import { useEffect, useState } from "react";
import axios from "axios";
import { ArtistItem, ArtistSliderItem, ArtistSliderItemFromApi } from "../../models/artist-slider";
import { ArtistCard } from "./ArtistCard";

export const mapArtistApitoSlider = (artist: ArtistSliderItemFromApi): ArtistSliderItem[] => {
    const arrayMapping: Record<string, boolean> = {};
    const uniqueArtists: ArtistSliderItem[] = [];
  
    // Avoid duplicated artist
    artist.records.forEach((artistItem: ArtistItem) => {
      if (!arrayMapping[artistItem._primaryMaker.name]) {
        arrayMapping[artistItem._primaryMaker.name] = true;
        uniqueArtists.push({
          id: uniqueArtists.length + 1,
          author: artistItem._primaryMaker.name,
          imageId: artistItem._primaryImageId
        });
      }
    });
  
    return uniqueArtists;
  };

export const ArtistSlider = () => {
    
    const [artist, setArtist] = useState<ArtistSliderItem[]>([]);

    useEffect(() => {
        const fetchArtist = async () => {
            const apiURL = `https://api.vam.ac.uk/v2/objects/search?order_sort=asc&page=1&page_size=15&images_exist=true`;
           

            
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
                {artist.map((artistItem: ArtistSliderItem) => (
                    <ArtistCard
                        author={artistItem.author}
                        imageId={artistItem.imageId}
                    />
                ))}
            </div>
    );
}
