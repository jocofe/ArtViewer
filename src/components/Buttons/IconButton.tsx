import classNames from "classnames";
import "../../styles/index.scss";
import { IconBtnProps } from "../../models/icon-button";
import {} from "../Icons/icons";

export const IconButton = (props: IconBtnProps) => {

    const {onClick, icon, size, position} = props;

    const iconBtnClass = classNames (
        'btn-icon',
        `btn-icon--${size}`,
        `btn-icon--${position}`
    )

return (
    <button {...onClick} className={iconBtnClass}><i className='icon'>{icon}</i></button>
);
};