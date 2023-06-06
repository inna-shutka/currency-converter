import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import { Loader } from '../Loader/Loader';
import styles from './SwapCard.module.css';

export function SwapCard({
  className,
  isBuy,
  icon,
  base,
  convertTo,
  loader,
  value,
  onChange,
}) {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleCardClick = () => {
    inputRef.current.focus();
    setFocused(true);
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  return (
    <div
      className={clsx(styles.swapCard, className, { [styles.focused]: focused })}
      onClick={handleCardClick}
    >
      <div className={styles.heading}>
        <span className={styles.text}>{isBuy ? 'You buy' : 'You sell'}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyName}>
          <Icon name={icon} className={styles.icon} />
          <span className={styles.value}>{base ?? convertTo}</span>
        </div>
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
}

SwapCard.propTypes = {
  className: PropTypes.string,
  isBuy: PropTypes.bool,
  icon: PropTypes.string,
  base: PropTypes.string,
  convertTo: PropTypes.string,
  loader: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
};
