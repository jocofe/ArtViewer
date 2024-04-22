export interface ArtListItem {
    title: string;
    imageUrlThumbnail: string;
    imageUrlBase: string;
    id: number;
    author: string;
    date: string;
    location: string;
}

export interface ArtListItemFromApi {
    records: ArtItem[];
    info: object;
    clusters: object;
}

export interface ArtItem {
    _currentLocation: object;
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
    _primaryPlace: string;
    _primaryTitle: string;
    _warningTypes: object;
    accessionNumber: string;
    objectType: string;
    systemNumber: string;
}
