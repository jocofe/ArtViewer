import "../../styles/index.scss";
import { Button } from "../Buttons/Buttons";
import { Close } from "../Icons/icons";

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
          <Close className="modal--icon"/>
        </button>
      </section>
      <section className="modal--content">
        <p>You're about to delete this collection.</p>
      </section>
      <section className="modal--btn">
        <Button onClick={() => {}} label="Delete" type="primary" />
        <Button onClick={() => {}} label="Cancel" type="sub_primary" />
      </section>
    </div>
      );

    //   <div className="modal">
    //     <section className="modal--title">
    //       <h4>Are you sure?</h4>
    //       <ModalButtonHider onClose={onClose} />
    //     </section>
  
    //     <section className="modal--content">
    //       <p>You're about to delete this collection.</p>
    //     </section>
  
    //     <section className="modal--btn">
    //       <Button onClick={() => {}} label="Delete" type="primary" />
    //     </section>
    //   </div>
    // );
  };