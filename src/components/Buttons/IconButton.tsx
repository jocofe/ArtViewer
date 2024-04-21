import classNames from "classnames";
import "../../styles/index.scss";
import { IconBtnProps } from "../../models/icon-button";
import {} from "../Icons/icons";



export const IconButton = ({
    className = "",
    icon,
    size = 'medium',
    position = 'default',
    onClick,
    ...rest
}: IconBtnProps) => {
    const iconBtnClass = classNames({
        'btn-icon': true,
        [className]: className,
        [`btn-icon--${size}`]: size,
        [`btn-icon--${position}`]: position,
        });

    return (
        <button {...onClick} className={iconBtnClass} {...rest}>
            <i className='icon'>{icon}</i>
        </button>
    );
};