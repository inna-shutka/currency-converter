import clsx from 'clsx';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { LogoIcon } from '../Icon';
import styles from './Logo.module.css';

export function Logo( {className} ) {
  return (
      <Link className={clsx(styles.logo, className)} href='/' >
        <LogoIcon className={styles.logoIcon}/>
      </Link>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};
