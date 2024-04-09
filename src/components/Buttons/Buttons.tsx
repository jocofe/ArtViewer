import React from 'react';
import '../../styles/index.scss';

interface BtnProps {
  label: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const Button: React.FC<BtnProps> = ({ label, size = 'medium', disabled = false }) => {
  const btnClass = `btn btn--${size} `;

  return (
    <button className={btnClass} disabled={disabled}>
      {label}
    </button>
  );
};
