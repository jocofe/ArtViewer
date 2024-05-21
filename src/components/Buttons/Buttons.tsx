import classNames from 'classnames';
import '../../styles/index.scss';
import { ButtonProps } from '../../models/buttons';
import { Link } from 'react-router-dom';

export const Button = ({
  className = '',
  size = 'medium',
  disabled,
  color = 'primary',
  children,
  onClick,
  linkTo,
  ...rest
}: ButtonProps) => {
  const btnClass = classNames({
    'btn': true,
    [className]: className,
    [`btn--${size}`]: size,
    [`btn--${color}`]: color,
    'btn--disabled': disabled,
  });

  if (linkTo) {
    return (
      <Link to={linkTo} {...rest}>
        <button className={btnClass} disabled={disabled} onClick={onClick}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button className={btnClass} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
