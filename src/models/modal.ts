import { ReactNode } from 'react';

export interface ModalProps {
  show?: boolean;
  children: ReactNode;
  size?: 'sm' | 'md';
  onClose?: () => void;
  title?: string;
}
