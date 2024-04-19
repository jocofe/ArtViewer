import classNames from "classnames";
import "../../styles/index.scss";
import { IconBtnProps } from "../../models/icon-button";
import {} from "../Icons/icons";



export const IconButton = ({
    className = '',
    icon,
    size = 'medium',
    position,
    children,
    ...rest
}: IconBtnProps) => {

    const iconBtnClass = classNames ({
        btn-icon: true,
        [className]: className,
        `btn-icon--${size}`,
        `btn-icon--${position}`
        })

return (
    <button {...onClick} className={iconBtnClass}><i className='icon'>{icon}</i>{children}</button>
);
};