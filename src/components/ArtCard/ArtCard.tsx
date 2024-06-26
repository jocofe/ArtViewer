import { ArtCardDetails } from '../../models/art-card';
import { Socials } from '../Socials/Socials';
import { useImageUrl } from '../../hooks/useImageUrl'; // Importar el custom hook

export const ArtCard = (props: ArtCardDetails) => {
  const { imageId, title, author, date, id } = props;
  const imageUrl = useImageUrl(imageId); // Usar el custom hook

  const handleImageSize = (event: React.ChangeEvent<HTMLImageElement>) => {
    if (event.target.height > event.target.width) {
      event.target.style.maxHeight = 'auto';
      event.target.style.width = '500px';
    } else {
      event.target.style.width = '500px';
      event.target.style.height = 'auto';
    }
  };

  return (
    <div className="art-card">
      <img src={imageUrl} onLoad={handleImageSize} alt={title} className="art-card__image" />
      <section className="art-card__info">
        <h2 className="art-card__title">{title !== '' ? title : 'Unknown Title'}</h2>
        <p className="art-card__author">{author}</p>
        <p className="art-card__date">{date}</p>
      </section>

      <section className="art-card__buttons">
        <Socials
          artPieceId={id}
          artPieceImageId={imageId}
          artPieceAuthor={author}
          artPieceDate={date}
          artPieceTitle={title}
          artPieceImageUrl={imageUrl}
        />
      </section>
    </div>
  );
};
