import { useState } from "react";
import "./_buttons-style.scss";

const sizes: any = {
    small: "btn--small",
    medium: "btn--medium",
    large: "btn--large"
};

export default function Button (props: any) {
    const { label, size = "medium"} = props

    const [isHovered, setIsHovered] = useState(false);

    const btnClass = `btn ${sizes[size]} ${isHovered? "btn--hover" : ""}`;


    const handleMouseEnter = () => {
        setIsHovered(true);
    };
     
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            className={btnClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {label}
        </button>
    )
};

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
