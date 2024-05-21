import { SearchBar } from '../../Form/SearchBar';
import { Close } from '../../Icons/icons';

export const AddCollectionModal = () => {
  return (
    <div className="collection-modal-wrapper">
      <div className="collection-modal__title">
        <h3>Add this Piece to a collection</h3>
        <Close className="icon-absolute" />
      </div>
      <div className="collection-modal__content">
        <SearchBar size={'normal'} placeholder={'Filter collections'} />
        <div className="collection-modal__collections">
          <p>There's not any collection created. Create one collection to add the Piece.</p>
        </div>
      </div>
    </div>
  );
};
