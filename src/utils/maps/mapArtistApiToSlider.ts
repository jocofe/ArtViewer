import { ArtistItem, ArtistSliderItem, ArtistSliderItemFromApi } from '../../models/artist-slider';
import { formatAuthorName } from '../format-author-name';

export const mapArtistApiToSlider = (artist: ArtistSliderItemFromApi): ArtistSliderItem[] => {
  const arrayMapping: Record<string, boolean> = {};
  const uniqueArtists: ArtistSliderItem[] = [];

  // Avoid duplicated artist
  artist.records.forEach((artistItem: ArtistItem) => {
    // Fixing author format from 'Lastname, Name' => 'Name Lastname'
    const author = formatAuthorName(artistItem._primaryMaker.name);

    if (!arrayMapping[author]) {
      arrayMapping[author] = true;
      uniqueArtists.push({
        slider_id: uniqueArtists.length + 1,
        author: author,
        imageId: artistItem._primaryImageId,
        id: artistItem.systemNumber,
      });
    }
  });

  return uniqueArtists;
};
