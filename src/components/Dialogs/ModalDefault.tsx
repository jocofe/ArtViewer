import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

interface ModalProps {
  show?: boolean;
  children: ReactNode;
  size?: 'sm' | 'md';
  onClose?: () => void;
}

export const ModalDefault = ({ show = false, children, size = 'md', onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    if (show) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling behind the modal
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.body.style.overflow = ''; // Re-enable scrolling
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
      <div className="modal">
        <div className={modalClasses}>{children}</div>
      </div>
    </>,
    document.body,
  );
};
