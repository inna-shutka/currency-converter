import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Loader.module.css';

export function Loader( {className} ) {
  return (
    <div className={clsx(styles.loader, className)}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};
