import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ICON_TYPES, Icon } from '../Icon';
import styles from './Button.module.css';

export function Button({
  className,
  variant,
  icon,
  onClick,
  isDisabled,
}) {
  return (
    <button
      className={clsx(styles.button, className, styles[`variant-${variant}`])}
      variant={variant}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon 
        name={icon} 
        className={clsx(styles.icon, styles[`icon-${icon}`])} />
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'subtle']),
  icon: PropTypes.oneOf(ICON_TYPES),
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};
