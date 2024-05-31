import { ArtObject, ArtObjectDetails, ArtObjectFromApi } from '../../models/art-list';

export const mapArtObjectApiToArtObject = (art: ArtObjectFromApi): ArtObjectDetails[] => {
  return art.map((artItem: ArtObject) => {
    return {
      title: artItem.fields.title,
      date: artItem.fields.date_text,
      artist: artItem.fields.artist,
      id: artItem.fields.object_number,
      imageId: artItem.fields.primary_image_id,
      location: artItem.fields.place,
      type: artItem.fields.object,
      dimensions: artItem.fields.dimensions,
      image: artItem.fields.primary_image_id,
    };
  });
};
