import classNames from 'classnames';
import '../../styles/index.scss';
import { ButtonProps } from '../../models/buttons';

export const Button = ({
  className = '',
  component = 'button',
  size = 'medium',
  disabled,
  color = 'primary',
  type = 'button',
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  const btnClass = classNames({
    'btn': true,
    [className]: className,
    [`btn--${size}`]: size,
    [`btn--${color}`]: color,
    'btn--disabled': disabled,
  });

  const Component = component;
  return (
    <Component className={btnClass} type={type} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </Component>
  );
};
