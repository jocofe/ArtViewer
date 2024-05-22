import { ButtonHTMLAttributes, ComponentType, MouseEventHandler, ReactHTML, ReactNode } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  color?: 'primary' | 'sub_primary' | 'secondary' | 'default' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  component?: ComponentType<any> | keyof ReactHTML;
  loading?: boolean;
  to?: string;
  href?: string;
}
