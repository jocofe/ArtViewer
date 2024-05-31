import { NewCollection } from '../../../models/collection';
import { Button } from '../../Buttons/Buttons';

export const CreateCollection = ({ name, description }: NewCollection) => {
  return (
    <div className="collection-modal-wrapper">
      <div className="collection-modal__content">
        <div className="collection-modal__form">
          <div className="collection-modal__name">
            <p>{name}</p> <p>64</p>
            <input type="text" />
          </div>
          <div className="collection-modal__description">
            <p>{description}</p> <p>160</p>
            <input type="text" />
          </div>
        </div>
        <div className="collection-modal__buttons">
          <Button color="sub_primary">Create collection</Button>
          <Button type="submit">Cancel</Button>
        </div>
      </div>
    </div>
  );
};
