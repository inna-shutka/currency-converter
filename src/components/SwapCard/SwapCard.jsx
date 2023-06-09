import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import { Loader } from '../Loader/Loader';
import styles from './SwapCard.module.css';

export const SwapCard = forwardRef(({
  className,
  label,
  icon,
  base,
  convertTo,
  isLoaded,
  value,
  onChange,
  }, ref) => {

    const [isActive, setIsActive] = useState(false);

    const handleClickContainer = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
        setIsActive(true);
    };

    const handleContainerFocus = () => {
      setIsActive(true);
    };
    
    const handleContainerBlur = () => {
      setIsActive(false);
    };
    
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    }, [value]);

    // const formattedValue = value ? numeral(value).format(value < 0.0001 ? '0.000000' : '0.00') : '';


  return (
    <div
      className={clsx(styles.swapCard, className, { [styles.active]: isActive })}
      onClick={handleClickContainer}
      onFocus={handleContainerFocus}
      onBlur={handleContainerBlur}
      ref={ref}
    >
      <div className={styles.heading}>
        <span className={styles.text}>{label}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyName}>
          <Icon name={icon} className={styles.icon} />
          <span className={styles.value}>{base ?? convertTo}</span>
        </div>
        {isLoaded ? (
          <Loader className={styles.loader} />
        ) : (
          <Input
            className={styles.input}
            placeholder='0.00'
            value={value}
            onChange={onChange}
            ref={inputRef}
          />
        )}
      </div>
    </div>
  );
  }
)

SwapCard.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  base: PropTypes.string,
  convertTo: PropTypes.string,
  isLoaded: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
};
