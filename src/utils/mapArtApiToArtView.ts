import { ArtArtistDetails, ArtArtistFromApi, ArtArtistItem } from '../models/art-list';

export const mapArtApiToArtView = (art: ArtArtistFromApi): ArtArtistItem[] => {
  return art.records.map((artArtist: ArtArtistDetails) => {
    return {
      title: artArtist._primaryTitle,
      id: artArtist.systemNumber,
      artist: artArtist._primaryMaker.name,
      date: artArtist._primaryDate,
      location: artArtist._primaryPlace,
      imageId: artArtist._primaryImageId,
    };
  });
};
