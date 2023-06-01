import PropTypes from 'prop-types';
import { ICON_TYPES, Icon } from '../Icon';
import styles from './CurrencyType.module.css';

export function CurrencyType({
  variant,
  icon,
  content,
}) {
  return (
    <div
      className={styles.currency}
      variant={variant}
    >
      <Icon 
        name={icon} 
        className={styles.icon} />
      <span className={styles.text}>{content}</span>
    </div>
  );
};

CurrencyType.propTypes = {
  variant: PropTypes.oneOf(['btc', 'uah']),
  icon: PropTypes.oneOf(Object.values(ICON_TYPES)),
  content: PropTypes.string,
};
