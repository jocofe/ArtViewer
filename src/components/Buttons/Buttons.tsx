import classNames from "classnames";
import "../../styles/index.scss";
import { ButtonProps } from "../../models/buttons";

export const Button: React.FC<ButtonProps> = ({
  children,
  size,
  disabled,
  type,
}) => {
  // Set default props
  Button.defaultProps = {
    size: "medium",
    type: "primary",
  };

  const btnClass = classNames("btn", `btn--${size}`, `btn--${type}`);

  return (
    <button className={btnClass} disabled={disabled}>
      {children}
    </button>
  );
};
