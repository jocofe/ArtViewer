import { Link } from "react-router-dom";
import { Button } from "../Buttons/Buttons";

export const CtaSection = () => {
    
    return (
        <div className="cta-section">
            <h2 className='title'>Find your art pieces and save them</h2>
            <h3>Create collections, save your most liked pieces and find more art.</h3>
            <div className="button-wrapper">
                <Link to={"/signup"}><Button>Get Started Now</Button></Link>
                <Button type="sub_primary">Learn about collections</Button>
            </div>
        </div>
    );
}