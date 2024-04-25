export interface ResultsItem {
    title: string;
    imageUrl: string;
    author: string;
    id: string;

}

export interface ResultsItemFromApi {
    records: Result[];
    info: object;
    clusters: object;
}

export interface Result {
    _images: {
        _iiif_image_base_url: string;
    };
    _primaryMaker: {
        association: string;
        name: string;
    };
    _primaryTitle: string;
    _primaryImageId: string;
}