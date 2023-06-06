import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Logo } from '../Logo';
import styles from './Header.module.css';

export function Header({ className }) {
  return (
    <header className={clsx(styles.head, className)}>
      <Logo/>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};
