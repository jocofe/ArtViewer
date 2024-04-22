import classNames from 'classnames';
import '../../styles/index.scss';
import { ButtonProps } from '../../models/buttons';


export const Button: React.FC<ButtonProps> = ({ onClick, label, size, disabled, type }) => {
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
    <button onClick={onClick} className={btnClass} disabled={disabled}>
      {label}
    </button>
  );
};