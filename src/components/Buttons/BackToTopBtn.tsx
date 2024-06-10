import { useState, useEffect } from 'react';
import { Button } from './Buttons';
import { ArrowUp } from '../Icons/icons';

export const BackToTopBtn = () => {
    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      color="primary"
      className="to-top-btn"
      onClick={handleBackToTop}
      hidden={!showButton}
    >
      <ArrowUp className="icon-white" />
    </Button>
  );
}