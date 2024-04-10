import classNames from 'classnames';
import '../../styles/index.scss';
import { ButtonProps } from '../../models/buttons';
import { MouseEvent, useState } from "react";
import "../../styles/index.scss";

const sizes: any = {
    small: "btn--small",
    medium: "btn--medium",
    large: "btn--large"
};

export default function Button (props: any) {
    const { label, size = "medium"} = props

    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const btnClass = `btn ${sizes[size]} ${isHovered? "btn--hover" : ""} ${isPressed? "btn--press" : ""} ${isFocused? "btn--focus" : ""} `;
    

    //Hovered functionality
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    //Pressed functionality
    const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Avoid focus state appearing on the first click
        setIsPressed(true);
        setIsFocused(false);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

export const Button: React.FC<ButtonProps> = ({ label, size, disabled, type }) => {
  // Set default props
Button.defaultProps = {
  size: 'medium',
  type: 'primary',
};
  
  const btnClass = classNames(
    'btn',
    `btn--${size}`,
    `btn--${type}`

  );

  return (
    <button className={btnClass} disabled={disabled}>
      {label}
    </button>
  );
};