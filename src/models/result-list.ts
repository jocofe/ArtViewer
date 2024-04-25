export interface SearchItem {
    title: string;
    id: string;
    author: string;
    date: string;
    location: string;
}

export interface SearchItemFromApi {
    records: Search[];
    info: object;
    clusters: object;
}

export interface Search {
    _images: {
        _iiif_image_base_url: string;
        _iiif_presentation_url: string; 
        _primary_thumbnail: string;
        imageResolution: string;
    };
    _primaryDate: string;
    _primaryImageId: string;
    _primaryMaker: {
        association: string;
        name: string;
    };
    _primaryTitle: string;
    accessionNumber: string;
    systemNumber: string;
}