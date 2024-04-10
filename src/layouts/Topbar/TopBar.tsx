import "../../styles/index.scss";
import { Button } from "../../components/Buttons/Buttons";
import { Logotype, Menu } from "../../components/Icons/icons";
import { IconButton } from "../../components/Buttons/IconButton";

export const TopBar = () => {
  return (
    <div className="topbar">
        <div className="topbar__logo">
          <IconButton icon= {<Menu />} onClick={() => (console.log('clicked'))} />
            <Logotype />
        </div>
        <Button label='Log In' size='small' />
        <Button label='Sign Up' size='small' />
    </div>
  );
};
