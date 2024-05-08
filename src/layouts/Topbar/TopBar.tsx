import { useState, useEffect } from "react";
import classNames from "classnames";
import "../../styles/index.scss";
import { Button } from "../../components/Buttons/Buttons";
import {
  Logotype,
  IconLogotype,
  SearchGlass,
} from "../../components/Icons/icons";
import { TopBarProps } from "../../models/topbar";
import { SearchBar } from "../../components/Form/SearchBar";
import { Link } from "react-router-dom";
import React from "react";

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
        {isCollapse ? (
          <Link to={"/"}>
          <IconLogotype className="icon" />
          </Link>
        ) : (
          <Link to={"/"}>
          <Logotype className="logotype" />
          </Link>
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
