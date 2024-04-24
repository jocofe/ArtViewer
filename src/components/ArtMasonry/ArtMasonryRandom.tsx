import { useEffect, useState } from "react";
import { ArtItem, ArtListItem, ArtListItemFromApi } from "../../models/art-list";
import axios from "axios";
import { ArtCard } from "../../components/ArtCard/ArtCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

export const mapArtApitoArtView = (art: ArtListItemFromApi): ArtListItem[] => {
return art.records.map((artItem: ArtItem, index: number) => {
    return {
    title: artItem._primaryTitle,
    imageUrlThumbnail: artItem._images._primary_thumbnail,
    imageUrlBase: artItem._images._iiif_image_base_url,
    id: index + 1,
    author: artItem._primaryMaker.name,
    date: artItem._primaryDate,
    location: artItem._primaryPlace,
    imageId: artItem._primaryImageId,
    height: artItem.height
    };
});
};

    export const ArtMasonryRandom = () => {

        
const [artList, setArtList] = useState<ArtListItem[]>([]);

    useEffect(() => {
        const fetchArt = async () => {
            const apiURL = `https://api.vam.ac.uk/v2/objects/search?q_object_type=drawing&order_sort=asc&page=1&page_size=15&images_exist=true`;
            console.log('Llamada a la API');
            try {
                const response = await axios.get<ArtListItemFromApi>(apiURL);
                const mappedArtList = mapArtApitoArtView(response.data);
                setArtList(mappedArtList);
                console.log(mappedArtList);
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };

        fetchArt();
    }, []);

        return (
        <div className='masonry-section'>
            <h2 className='masonry__title'>Explore some art</h2>
            <div className="masonry-wrapper">
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 768: 2, 1200: 3, 1920: 4,}}>
                <Masonry className='masonry__columns' gutter='32px'>
                        {artList.map((artItem: ArtListItem) => (
                        <ArtCard
                        key={artItem.id}
                        title={artItem.title}
                        imageId={artItem.imageId}
                        author={artItem.author}
                        date={artItem.date}
                        />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
            
    </div>
    );
}