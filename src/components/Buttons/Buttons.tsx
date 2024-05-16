import classNames from 'classnames';
import '../../styles/index.scss';
import { ButtonProps } from '../../models/buttons';
import { Link } from 'react-router-dom';

export const Button = ({
  className = '',
  size = 'medium',
  disabled,
  type = 'primary',
  children,
  onClick,
  linkTo,
  ...rest
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevenir la acción predeterminada del evento de clic
    if (onClick) {
      onClick(); // Llamar al manejador de clic si está definido
    }
  };
  const btnClass = classNames({
    'btn': true,
    [className]: className,
    [`btn--${size}`]: size,
    [`btn--${type}`]: type,
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
    <button className={btnClass} disabled={disabled} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};
