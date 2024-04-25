import { useState, useEffect } from "react";
import classNames from "classnames";
import "../../styles/index.scss";
import { Button } from "../../components/Buttons/Buttons";
import {
  Logotype,
  Menu,
  IconLogotype,
  SearchGlass,
} from "../../components/Icons/icons";
import { IconButton } from "../../components/Buttons/IconButton";
import { TopBarProps } from "../../models/topbar";
import { SearchBar } from "../../components/Form/SearchBar";
import { Link } from "react-router-dom";

export const TopBar = (props: TopBarProps) => {
  const { size, type } = props;

  const topBarClass = classNames(
    "topbar",
    `topbar--${size}`,
    `topbar--${type}`
  );

  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsCollapse(window.matchMedia("(max-width: 1100px)").matches);
    };

    checkWindowSize();

    const resizeListener = () => {
      checkWindowSize();
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);



  return (
    <div className={topBarClass}>
      <div className="topbar__logo">
        <IconButton
          size="medium"
          position="default"
          icon={<Menu className="icon" />}
          onClick={() => console.log("clicked")}/>
        {isCollapse ? (
          <IconLogotype className="icon" />
        ) : (
          <Logotype className="logotype" />
        )}
      </div>
      {!isCollapse && <SearchBar size="large" placeholder="Search..." />}
      {isCollapse && (
        <div className="signup-wrapper">
          <SearchGlass className="icon" />
          <Link to={"/signup"}>
            <Button onClick={() => {}}> Sing Up</Button>
          </Link>
        </div>
      )}
      {!isCollapse && (
        <div className="signup-wrapper">
          <Link to={"/signin"}>
            <Button type="sub_primary" onClick={() => {}}>
              Log In
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button onClick={() => {}}>Sing Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
