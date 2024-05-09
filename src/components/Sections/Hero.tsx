import { Link } from 'react-router-dom';
import { Button } from '../Buttons/Buttons';

export const Hero = () => {
  return (
    <div className="hero-section">
      <h1>The platform research for art</h1>
      <h2 className="sub-title">Get all the information about art around the world.</h2>
      <Link to={'/signup'}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};
