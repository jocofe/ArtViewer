import classNames from 'classnames';
import '../../styles/index.scss';
import { ButtonProps } from '../../models/buttons';

export const Button = ({
  className = '',
  size = 'medium',
  disabled,
  type = 'primary',
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault(); // Prevenir la acción predeterminada del evento de clic
  //   if (onClick) {
  //     onClick(); // Llamar al manejador de clic si está definido
  //   }
  // };
  const btnClass = classNames({
    'btn': true,
    [className]: className,
    [`btn--${size}`]: size,
    [`btn--${type}`]: type,
    'btn--disabled': disabled,
  });

  return (
    <button className={btnClass} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
