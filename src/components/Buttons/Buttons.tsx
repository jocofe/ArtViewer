import { useState } from "react";
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


    //Focused functionality
    const handleMouseDown = (event: any) => {
        event.preventDefault(); // Avoid focus state appearing on the first click
        setIsPressed(true);
        setIsFocused(false);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };


    //Focused functionality
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <button
            className={btnClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {label}
        </button>
    )
}

// type ButtonSize = 'small' | 'medium' | 'huge';
// type ButtonVariant = 'primary' | 'secondary' | 'default' | 'disabled';
// type ButtonState = 'default' | 'hover' | 'pressed' | 'focus';


// interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     size?: ButtonSize;
//     variant?: ButtonVariant;
//     state?: ButtonState;
// }

// export const ButtonDefault: React.FC<ButtonProps> = ({ children, size = 'medium', variant = 'primary', state = 'default'}) => {
//     const buttonClassName = `button button--${size} button--${variant} button--${state}`
    
//     return (
//         <button className={buttonClassName}>
//             { children }
//         </button>
//     )
// };

// export default ButtonDefault;
