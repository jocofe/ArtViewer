import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

interface ModalProps {
  show?: boolean;
  children: ReactNode;
  size: 'sm' | 'md';
}

export const ModalDefault = ({ show, children, size = 'md' }: ModalProps) => {
  if (!show) {
    return null;
  }

  const modalClasses = classNames({
    modal__content: true,
    [`modal__content--${size}`]: size,
  });

  return createPortal(
    <>
      <div className="modal-overlay" />
      <div className="modal">
        <div className={modalClasses}>{children}</div>
      </div>
    </>,
    document.body,
  );
};
