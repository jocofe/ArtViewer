import "../../styles/index.scss";
import { IconBtnProps } from "../../models/icon-button";
import {} from "../Icons/icons";

export const IconButton = ({icon}: IconBtnProps, {onClick}: IconBtnProps) => {

return (
    <button {...onClick}><i className="btn-icon">{icon}</i></button>
);
};