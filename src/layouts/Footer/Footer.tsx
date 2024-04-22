import { Logotype, ArrowUp } from "../../components/Icons/icons";
import "../../styles/index.scss";
import "../../styles/layouts/_footer.scss"


export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer--container">

        <Logotype className="icon-logotype"/>

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
    
      <div className="footer--container">
        <div className="footer--copy">
          <p>ArtView © 2024</p>
          <ul>
            <li><a href="">Terms & policies</a></li>
            <li><a href="">Privacy policy</a></li>
            <li><a href="">Brand guidelines</a></li>
          </ul>
        </div>

        <a  className="footer--top" href="">Back to top <ArrowUp className="icon"/></a> 
      </div>
        
  </div>
  );
};

