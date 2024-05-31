import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Close } from '../Icons/icons';
import { ModalProps } from '../../models/modal';

export const ModalDefault = ({ show = false, children, size = 'md', onClose, title }: ModalProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    if (show) {
      document.body.style.overflow = 'hidden'; // No deja hacer scroll con el modal abierto
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.body.style.overflow = ''; // Se reinicia el scroll
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [show, onClose]);

  const modalClasses = classNames({
    modal__content: true,
    [`modal__content--${size}`]: size,
  });

  if (!show) {
    return null;
  }

  return createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className={modalClasses}>
        <div className="modal">
          <div className="modal-wrapper">
            <div className="modal__title">
              <h4>{title}</h4>
              <Close className="modal__icon" onClick={onClose} />
            </div>
            <div className="modal__content">{children}</div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};
