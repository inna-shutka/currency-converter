import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Loader } from '../Loader';
import numeral from 'numeral';
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
  const rateFormat = rate >= 1 ? '0,0.00' : '0,0.00000000';
  const formattedRate = numeral(rate).format(rateFormat);

  return (
    <div className={clsx(styles.rateCard, className)}>
      {!loader ? (
        <>
          <span className={styles.text}>
            {amount} {base}
          </span>
          <span className={styles.equals}>=</span>
          <span className={clsx(styles.text, styles.rate)}>{formattedRate}</span>
          <span className={clsx(styles.text, styles.convert)}>{convertTo}</span>
        </>
      ) : (
        <Loader className={styles.loader} />
      )}
      <Button
        className={styles.button}
        variant="subtle"
        icon="refresh"
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
  rate: PropTypes.number,
  convertTo: PropTypes.string,
  onClick: PropTypes.func,
};
