import clsx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styles from './Input.module.css';

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
      maxLength,
    },
    ref
  ) => {
    
    const handleChange = (event) => {
      const rawValue = event.target.value;
      const cleanedValue = rawValue.replace(/[^0-9.,]/g, '');

      const dotCount = cleanedValue.split('.').length - 1;
      const commaCount = cleanedValue.split(',').length - 1;

      let formattedValue = cleanedValue.replace(/\.+/g, dotCount > 1 ? '' : '.');
      formattedValue = formattedValue.replace(/,+/g, commaCount > 0 ? '' : '.');

      onChange(formattedValue);
  };

    return (
      <input
        className={clsx(className, styles.input)}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
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
  maxLength: PropTypes.string,
};

Input.displayName = 'Input'

Input.defaultProps = {
  placeholder: '0.00',
  type: 'number',
  inputMode: 'decimal',
  maxLength: '12',
};
