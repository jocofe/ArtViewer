import { ButtonHTMLAttributes, ReactNode } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  color?: 'primary' | 'sub_primary' | 'secondary' | 'default' | 'submit';
  onClick?: () => void;
}
