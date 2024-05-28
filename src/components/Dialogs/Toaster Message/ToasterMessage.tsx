import { useEffect, useState } from 'react';
import { Close } from '../../Icons/icons';

interface ToasterProps {
  message: string;
  onClose: () => void;
  time?: number;
}

export const Toaster = ({ message, time = 3000, onClose }: ToasterProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    const timer = setTimeout(() => {
      setIsActive(false);
      setTimeout(onClose, 500);
    }, time);

    return () => clearTimeout(timer);
  }, [time, onClose]);

  return (
    <div className={`toast ${isActive ? 'active' : ''}`}>
      <div className="toast-content">
        <span className="message">{message}</span>
      </div>
      <i className="toast-close" onClick={() => setIsActive(false)}>
        {<Close />}
      </i>
      <div className={`progress ${isActive ? 'active' : ''}`}></div>
    </div>
  );
};
