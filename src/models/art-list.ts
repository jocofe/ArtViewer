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

export interface ArtObjectFromApi {
    0: ArtObject;
}
export interface ArtObject {
    fields: {
        artist: string;
        attributions_note: string;
        bibliography: string;
        categories: [];
        collection_code: string;
        collections: object;
        credit: string;
        date_end: string;
        date_start: string;
        date_text: string;
        descriptive_line: string;
        dimensions: string;
        edition_number: string;
        event_text: string;
        events: [];
        exhibition_history: string;
        exhibitions: [];
        galleries: [];
        historical_context_note: string;
        historical_significance: string;
        history_note: string;
        image_set: [];
        inventory_set: [];
        label: string;
        labels: [];
        last_checked: string;
        last_processed: string;
        latitude: string;
        location: string;
        longitude: string;
        marks: string;
        materials: [];
        materials_techniques: string;
        museum_number: string;
        museum_number_token: string;
        namecontext_set: [];
        names: [];
        object: string;
        object_number: string;
        original_currency: string;
        original_price: string;
        physical_description: string;
        place: string;
        placecontext_set: [];
        places: [];
        primary_image_id: string;
        production_note: string;
        production_type: string;
        public_access_description: string;
        related_museum_numbers: string;
        rights: number;
        shape: string;
        slug: string;
        styles: [];
        subjects: [];
        sys_updated: string;
        techniques: [];
        title: string;
        updated: null;
        vanda_exhibition_history: string;
        year_end: string;
        year_start: string;
    }
}