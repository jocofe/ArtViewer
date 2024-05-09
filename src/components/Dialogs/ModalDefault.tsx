import '../../styles/index.scss';
import { Button } from '../Buttons/Buttons';
import { Close } from '../Icons/icons';

interface ModalProps {
  isClose: boolean;
  onClose?: () => void;
}

export const ModalDefault: React.FC<ModalProps> = ({ isClose, onClose }) => {
  if (isClose) {
    return null;
  }
  return (
    <div className="modal">
      <section className="modal--title">
        <h4>Are you sure?</h4>
        <button className="modal--close" onClick={onClose}>
          <Close className="modal--icon" />
        </button>
      </section>
      <div className="modal--content">
        <p>You're about to delete this collection.</p>
      </div>
      <section className="modal--btn">
        <Button onClick={() => {}}>Delete</Button>
        <Button onClick={() => {}} type="sub_primary">
          Cancel
        </Button>
      </section>
    </div>
  );
};

//TODO MODAL DEFAUL LOGIC:
// const [isModalClose, SetIsModalClose] = useState(false);
// const handleCloseModal = () => {
//   SetIsModalClose(true);
// };
