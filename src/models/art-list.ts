export interface ArtListItem {
    title: string;
    imageUrlThumbnail: string;
    imageUrlBase: string;
    id: string;
    imageId: string;
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
    _currentLocation: {
        id: string,
        displayName: string,
        type: string,
        site: string,
        onDisplay: true,
        detail: {
        free: string,
        case: string,
        shelf: string,
        box: string
        }
    }
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

export interface ArtObjectDetails {
    title: string;
    date: string;
    artist: string;
    id: string;
    image: string;
    imageId: string;
    location: string;
    type: string;
    dimensions: string;
}

export interface ArtObjectFromApi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map: any;
    artObjects: ArtObject[];
}
export interface ArtObject {
    fields: {
        artist: string;
        categories: [];
        date_text: string;
        descriptive_line: string;
        dimensions: string;
        image_set: [];
        materials: [];
        materials_techniques: string;
        museum_number: string;
        museum_number_token: string;
        object: string;
        object_number: string;
        physical_description: string;
        place: string;
        primary_image_id: string;
        slug: string;
        techniques: [];
        title: string;
        year_end: string;
        year_start: string;
    }
}

export interface ArtArtistItem {
    title: string;
    date: string;
    artist: string;
    id: string;
    imageId: string;
}

export interface ArtArtistFromApi {
    records: ArtArtistDetails[];
}

export interface ArtArtistDetails {
        _currentLocation: {
        id: string,
        displayName: string,
        type: string,
        site: string,
        onDisplay: true,
        detail: {
        free: string,
        case: string,
        shelf: string,
        box: string
        }
    }
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
    objectType: string;
    systemNumber: string;
}