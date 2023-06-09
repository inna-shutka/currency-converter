import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Loader } from '../Loader';
import styles from './RateCard.module.css';

export const RateCard = ({
  className,
  isLoaded,
  amount,
  base,
  convertTo,
  rate,
  onClick,
}) => {

  return (
    <div className={clsx(styles.rateCard, className)}>
      {isLoaded ? (
        <Loader className={styles.loader} />
      ) : (
        <>
          <span className={styles.text}>
            {amount} {base}
          </span>
          <span className={styles.equals}>=</span>
          <span className={clsx(styles.text, styles.rate)}>{rate}</span>
          <span className={clsx(styles.text, styles.convert)}>{convertTo}</span>
        </>
      )}
      <Button
        className={styles.button}
        variant='subtle'
        icon='refresh'
        onClick={onClick}
        disabled={isLoaded}
      />
    </div>
  );
};

RateCard.propTypes = {
  className: PropTypes.string,
  isLoaded: PropTypes.bool,
  amount: PropTypes.number,
  base: PropTypes.string,
  convertTo: PropTypes.string,
  rate: PropTypes.string,
  onClick: PropTypes.func,
};
