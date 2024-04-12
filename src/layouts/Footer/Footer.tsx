import { Logotype, ArrowUp } from "../../components/Icons/icons";

export const Footer = () => {
  return (
    <div>
      <div className="footer">

        <Logotype className="footer--logotype"/>

        <div className="footer--links">
          <ul className="footer--links_list">
            <li><a href="#">Index</a></li>
            <li><a href="#">Explore</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About</a></li>
          </ul>

          <ul className="footer--links_list">
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Linkdin</a></li>
          </ul>
        </div>
      </div>

      <hr className="footer--div"/>
    
      <div className="footer">
        <div className="footer--copy">
          <p>ArtView © 2024</p>
          <ul>
            <li><a href="">Terms & policies</a></li>
            <li><a href="">Privacy policy</a></li>
            <li><a href="">Brand guidelines</a></li>
          </ul>
        </div>

        <div className="footer-top">
          <a href="">Back to top <ArrowUp/></a> 
        </div>
      </div>
        
  </div>
  );
};

