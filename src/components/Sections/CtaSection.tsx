import { NavLink } from 'react-router-dom';
import { Button } from '../Buttons/Buttons';

export const CtaSection = () => {
  return (
    <div className="cta-section">
      <h2 className="cta__title">Find your art pieces and save them</h2>
      <h3 className="cta__subtitle">Create collections, save your most liked pieces and find more art.</h3>
      <div className="cta__buttons">
        <Button component={NavLink} to={'/signup'} color="sub_primary">
          Get Started Now
        </Button>
        <Button component={NavLink} to={'/landing'} color="primary">
          Learn about collections
        </Button>
      </div>
    </div>
  );
};
