import { FC, useEffect, useState } from "react";

interface Record {
    _primaryImageId: string;
}

interface State {
    imageIds: string[];
    loading: boolean;
}

export const RandomMosaicImages: FC = () => {
    const [state, setState] = useState<State>({ imageIds: [], loading: true });
    const apiUrl = 'https://api.vam.ac.uk/v2/objects/search?q=oil%20canvas&min_length=2&max_length=16&images_exist=true&order_sort=asc&page=1&page_size=15&cluster_size=20&images=false&random=false';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const images = data.records.map((record: Record) => record._primaryImageId);
            const randomImageIds: string[] = [];
            while (randomImageIds.length < 6) {
                const randomIndex = Math.floor(Math.random() * images.length);
                if (!randomImageIds.includes(images[randomIndex])) {
                    randomImageIds.push(images[randomIndex]);
                }
            }
            setState({ imageIds: randomImageIds, loading: false });
        }
        fetchData().catch(error => console.error(error));

        const intervalId = setInterval(() => {
            fetchData().catch(error => console.error(error));
        }, 3000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return (
        <div className="mosaic-images">
            <div className="mosaic-column">
                <div className={`image-container ${state.loading ? '' : 'loaded '}`} key={state.imageIds[0]} style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${state.imageIds[0]}/full/full/0/default.jpg)` }}>
                    {state.loading ? (
                        <div>Loading...</div>
                    ) : null}
                </div>
                <div className={`image-container ${state.loading ? '' : 'loaded '}`} key={state.imageIds[1]} style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${state.imageIds[1]}/full/full/0/default.jpg)` }}>
                    {state.loading ? (
                        <div>Loading...</div>
                    ) : null}
                </div>
            </div>
            <div className="mosaic-column column-center">
                <div className={`image-container ${state.loading ? '' : 'loaded '}`} key={state.imageIds[2]} style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${state.imageIds[2]}/full/full/0/default.jpg)` }}>
                    {state.loading ? (
                        <div>Loading...</div>
                    ) : null}
                </div>
                <div className={`image-container ${state.loading ? '' : 'loaded '}`} key={state.imageIds[3]} style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${state.imageIds[3]}/full/full/0/default.jpg)` }}>
                    {state.loading ? (
                        <div>Loading...</div>
                    ) : null}
                </div>
            </div>
            <div className="mosaic-column">
                <div className={`image-container ${state.loading ? '' : 'loaded '}`} key={state.imageIds[4]} style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${state.imageIds[4]}/full/full/0/default.jpg)` }}>
                    {state.loading ? (
                        <div>Loading...</div>
                    ) : null}
                </div>
                <div className={`image-container ${state.loading ? '' : 'loaded '}`} key={state.imageIds[5]} style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${state.imageIds[5]}/full/full/0/default.jpg)` }}>
                    {state.loading ? (
                        <div>Loading...</div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}