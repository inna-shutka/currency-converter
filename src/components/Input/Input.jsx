import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Input.module.css';
import { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      className,
      value,
      onChange,
      disabled,
      placeholder,
      type,
      inputMode,
      onBlur,
      onEnterPress,
    },
    ref
  ) => {
    const onKeyUp = (e) => {
      if (e.keyCode === 13 && onEnterPress) {
        onEnterPress();
      }
    };
    return (
      <input
        className={clsx(className, styles.input)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        ref={ref}
      />
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputMode: PropTypes.string,
  onBlur: PropTypes.func,
  onEnterPress: PropTypes.func,
};

Input.displayName = 'Input'

Input.defaultProps = {
  placeholder: '0.00',
  type: 'number',
  inputMode: 'decimal',
};
