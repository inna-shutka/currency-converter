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
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        ref={ref}
      />
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onEnterPress: PropTypes.func,
};

Input.defaultProps = {
  placeholder: '0.00',
  type: 'text',
};
