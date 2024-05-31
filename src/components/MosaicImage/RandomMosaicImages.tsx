import { useRandomImagesApi } from '../../hooks/useRandomImagesApi';

export const RandomMosaicImages = () => {
  const apiUrl =
    'https://api.vam.ac.uk/v2/objects/search?q=oil%20canvas&min_length=2&max_length=16&images_exist=true&order_sort=asc&page=1&page_size=15&cluster_size=20&images=false&random=false';

  const { imageIds, loading } = useRandomImagesApi(apiUrl);

  return (
    <div className="mosaic-images">
      <div className="mosaic-column">
        {imageIds.slice(0, 2).map((imageId, index) => (
          <div
            className={`image-container ${loading ? '' : 'loaded'}`}
            key={index}
            style={{
              backgroundImage: `url(https://framemark.vam.ac.uk/collections/${imageId}/full/full/0/default.jpg)`,
            }}
          >
            {loading ? <div>Loading...</div> : null}
          </div>
        ))}
      </div>
      <div className="mosaic-column column-center">
        {imageIds.slice(2, 4).map((imageId, index) => (
          <div
            className={`image-container ${loading ? '' : 'loaded'}`}
            key={index}
            style={{
              backgroundImage: `url(https://framemark.vam.ac.uk/collections/${imageId}/full/full/0/default.jpg)`,
            }}
          >
            {loading ? <div>Loading...</div> : null}
          </div>
        ))}
      </div>
      <div className="mosaic-column">
        {imageIds.slice(4, 6).map((imageId, index) => (
          <div
            className={`image-container ${loading ? '' : 'loaded'}`}
            key={index}
            style={{
              backgroundImage: `url(https://framemark.vam.ac.uk/collections/${imageId}/full/full/0/default.jpg)`,
            }}
          >
            {loading ? <div>Loading...</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
};
