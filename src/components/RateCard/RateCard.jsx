import clsx from'clsx';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Loader } from '../Loader';
import styles from './RateCard.module.css';

export const RateCard = ({
  className,
  loader,
  amount,
  base,
  rate,
  convertTo,
  onClick,
}) => {
  return (
    <div className={clsx(styles.rateCard, className)}>
      {!loader ? (
        <>
          <span className={styles.text}>
            {amount} {base}
          </span>
          <span className={styles.equals}>=</span>
          <span className={clsx(styles.text, styles.rate)}>{rate}</span>
          <span className={clsx(styles.text, styles.convert)}>{convertTo}</span>
        </>
      ) : (
        <Loader className={styles.loader} />
      )}
      <Button
        className={styles.button}
        variant='subtle'
        icon='refresh'
        onClick={onClick}
      />
    </div>
  );
};

RateCard.propTypes = {
  className: PropTypes.string,
  loader: PropTypes.bool,
  amount: PropTypes.number,
  base: PropTypes.string,
  rate: PropTypes.string,
  convertTo: PropTypes.string,
  onClick: PropTypes.func,
};
