import PropTypes from 'prop-types';
import { Logo } from '../Logo';
import styles from './Header.module.css';

export function Header({ className}) {
  const props = {
    className,
  };
  return (
    <header className={styles.head}>
      <Logo/>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
}
