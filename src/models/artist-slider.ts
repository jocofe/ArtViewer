export interface ArtistSliderItem {
    id: string
    slider_id: number;
    author: string;
    imageId: string;
}

export interface ArtistSliderItemFromApi {
    records: ArtistItem[];
    info: object;
    clusters: object;
}

export interface ArtistItem {
    _primaryImageId: string;
    _primaryMaker: {
        association: string;
        name: string;
    };
    systemNumber: string;
}