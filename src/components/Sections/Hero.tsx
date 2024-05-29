import { NavLink } from 'react-router-dom';
import { Button } from '../Buttons/Buttons';

export const Hero = () => {
  return (
    <div className="hero-section">
      <h1 className="hero__title">The platform research for art</h1>
      <h2 className="hero__subtitle h3">Get all the information about art around the world.</h2>
      <Button component={NavLink} to={'/signup'} color="primary">
        Get Started
      </Button>
    </div>
  );
};
