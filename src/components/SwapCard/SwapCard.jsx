import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { CurrencyType } from '../CurrencyType';
import { Input } from '../Input';
import { Loader } from '../Loader';
import styles from './SwapCard.module.css';

export function SwapCard({
  className,
  isBuy,
  variant,
  value,
  base,
  convertTo,
  loader,
  onChange,
}) {
  const inputRef = useRef(null);
  const setFocused = useState(false);

  const handleCardClick = () => {
    inputRef.current.focus();
    setFocused(true);
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  return (
    <div
      className={clsx(styles.swapCard, className)}
      onClick={handleCardClick}
    >
      <div className={styles.heading}>
        <span className={styles.text}>{isBuy ? 'You buy' : 'You sell'}</span>
      </div>
      <div className={styles.body}>
        <CurrencyType 
          variant={variant}
          icon={variant === 'btc' ? 'bitcoin' : 'ukrFlag'}
          content={variant === 'btc' ? 'BTC' : 'UAH'}
        >
          {base ?? convertTo}
        </CurrencyType>
        {loader ? (
          <Loader />
        ) : (
          <Input
            ref={inputRef}
            className={styles.input}
            value={value}
            onChange={onChange}
            onBlur={handleInputBlur}
          />
        )}
      </div>
    </div>
  );
};

SwapCard.propTypes = {
  ...CurrencyType.propTypes,
  className: PropTypes.string,
  isBuy: PropTypes.bool,
  variant: PropTypes.oneOf(['btc', 'uah']),
  value: PropTypes.string,
  base: PropTypes.string,
  convertTo: PropTypes.string,
  loader: PropTypes.bool,
  onChange: PropTypes.func,
};
