import PropTypes from 'prop-types';
import Link from 'next/link';
import { LogoIcon } from '../Icon';
import styles from './Logo.module.css';

export function Logo({ className }) {
  const props = {
    className,
  };
  return (
      <Link className={styles.logo} href='/' >
        <LogoIcon className={styles.logoIcon}/>
      </Link>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
}
