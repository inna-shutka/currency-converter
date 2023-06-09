import { useState, useEffect, useCallback, } from 'react';
import clsx from 'clsx';
import { SwapCard } from '../SwapCard';
import { Button } from '../Button';
import { RateCard } from '../RateCard';
import axios from 'axios';
import numeral from 'numeral';
import styles from './Converter.module.css';

const API = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah';

export const fetchRate = async () => {
  try {
    const { data } = await axios.get(API);
    const rate = data.bitcoin.uah;
    return rate;
  } catch (error) {
    throw new Error("Error" + error.message);
  }
};
export const fetchSymbols = async () => {};

export const Converter = () => {
  const [rate, setRate] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [base, setBase] = useState('BTC');
  const [baseAmount, setBaseAmount] = useState('');
  const [convertTo, setConvertTo] = useState('UAH');
  const [convertToAmount, setConvertToAmount] = useState('');
  const [swapClicked, setSwapClicked] = useState(false);

  const randomWait = () =>
    new Promise((res) => setTimeout(res, Math.random() * 1000));
    
    const loadData = useCallback(async () => {
      setIsLoaded(true);
      try {
        await randomWait();
        const fetchedRate = await fetchRate();
        setRate(fetchedRate);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setIsLoaded(false);
      }
    }, []);
  
    useEffect(() => {
      loadData();
    }, [loadData]);

  const handleRefresh = useCallback(async (event) => {
    event.preventDefault();
    await loadData();
  }, [loadData]);

  const handleSwap = useCallback((event) => {
    event.preventDefault();
    setBase(convertTo);
    setConvertTo(base);
    setBaseAmount(convertToAmount);
    setConvertToAmount(baseAmount);
    setSwapClicked(!swapClicked);
    },
    [
      base,
      convertTo,
      baseAmount,
      convertToAmount,
      swapClicked,
    ]
  );

  const [baseLoading, setBaseLoading] = useState(false);
  const [convertToLoading, setConvertToLoading] = useState(false);

  const handleBaseInput = useCallback(async (value) => {
    setBaseAmount(value);
    setConvertToLoading(true);
    await randomWait();
    setConvertToLoading(false);
  }, []);

  const handleConvertToInput = useCallback(async (value) => {
    setConvertToAmount(value);
    setBaseLoading(true);
    await randomWait();
    setBaseLoading(false);
  }, []);

  const calculateConvertedAmount = (
    basicAmount,
    base,
    convertTo,
    rate
  ) => {
    const convertedAmount = parseFloat(basicAmount);
      if (isNaN(convertedAmount)) {
        return '';
      }
      if (base === 'BTC' && convertTo === 'UAH') {
        return convertedAmount * rate;
      } else if (base === 'UAH' && convertTo === 'BTC') {
        return convertedAmount / rate;
      }
      return '';
};

  const calculateBasicAmount = (
  convertedAmount,
  base,
  convertTo,
  rate
  ) => {
  const basicAmount = parseFloat(convertedAmount);
    if (isNaN(basicAmount)) {
      return '';
    }
    if (base === 'BTC' && convertTo === 'UAH') {
      return basicAmount / rate;
    } else if (base === 'UAH' && convertTo === 'BTC') {
      return basicAmount * rate;
    }
    return '';
};

  useEffect(() => {
    const convertedAmount = calculateConvertedAmount(
      baseAmount,
      base,
      convertTo,
      rate
    );
    setConvertToAmount(convertedAmount);
  }, [baseAmount, base, convertTo, rate]);

  useEffect(() => {
    const basicAmount = calculateBasicAmount(
      convertToAmount,
      base,
      convertTo,
      rate
    );
    setBaseAmount(basicAmount);
  }, [convertToAmount, base, convertTo, rate]);

  const reverseRate = (1 / rate).toFixed(8);

  return (
    <div className={styles.container}>
      <SwapCard
        className={clsx(styles.swapCard, styles.animation)}
        label='You Sell'
        icon={base}
        base={base}
        value={baseAmount}
        onChange={handleBaseInput}
        isLoaded={baseLoading}
      />
      <SwapCard
        className={clsx(styles.swapCard, styles.animation)}
        label='You Buy'
        icon={convertTo}
        convertTo={convertTo}
        value={convertToAmount}
        onChange={handleConvertToInput}
        isLoaded={convertToLoading}
      />
      <Button
        className={clsx(styles.button, styles.animation)}
        variant='primary'
        icon='swap'
        onClick={handleSwap}
      />
      <RateCard
        className={clsx(styles.rateCard, styles.animation)}
        amount={1}
        base={base}
        convertTo={convertTo}
        isLoaded={isLoaded}
        rate={
          swapClicked
              ? numeral(reverseRate).format('0,0.00000000')
              : numeral(rate).format('0,0.00')
        }
        onClick={handleRefresh}
      />
    </div>
  );
};
