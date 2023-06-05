import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import numeral from 'numeral';
import { SwapCard } from '../SwapCard';
import { Button } from '../Button';
import { RateCard } from '../RateCard';
import styles from './Converter.module.css';
import useSWR from 'swr';

const API = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah';

export const Converter = () => {
  const fetcher = async () => {
    const response = await fetch(API);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const bitcoinPrice = data.bitcoin?.uah;

    if (bitcoinPrice === undefined) {
      throw new Error('Failed to parse response data');
    }

    return bitcoinPrice;
  };

  const { data: price, error } = useSWR('currencyRate', fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });

  const [base, setBase] = useState('BTC');
  const [baseAmount, setBaseAmount] = useState('');
  const [convertTo, setConvertTo] = useState('UAH');
  const [convertToAmount, setConvertToAmount] = useState('');
  const swapCalledRef = useRef(false);
  const [rate, setRate] = useState(null);
  const [isBuy, setIsBuy] = useState(true);

  const useLoading = (initialState = false) => {
    const [loading, setLoading] = useState(initialState);
  
    const startLoading = () => {
      setLoading(true);
    };
  
    const stopLoading = () => {
      setLoading(false);
    };
  
    return [loading, startLoading, stopLoading];
  };

  const [baseLoading, startBaseLoading, stopBaseLoading] = useLoading(false);
  const [convertToLoading, startConvertToLoading, stopConvertToLoading] = useLoading(false);
  const [rateLoading, startRateLoading, stopRateLoading] = useLoading(false);

  useEffect(() => {
    if (price) {
      setRate(price);
    }
    handleRefresh();
  }, [price]);

  useEffect(() => {
    if (!swapCalledRef.current && rate !== null) {
      calculate();
    }
    swapCalledRef.current = false;
  }, [baseAmount, convertTo, rate]);

  useEffect(() => {
    if (!swapCalledRef.current && rate !== null) {
      calculateReverse();
    }
    swapCalledRef.current = false;
  }, [convertToAmount, convertTo, rate]);

  const calculate = () => {
    const convertedAmount = parseFloat(baseAmount);
    if (isNaN(convertedAmount)) {
      setConvertToAmount('');
      return;
    }
    if (base === 'BTC' && convertTo === 'UAH') {
      setConvertToAmount(convertedAmount * parseFloat(rate));
    } else if (base === 'UAH' && convertTo === 'BTC') {
      setConvertToAmount(convertedAmount / parseFloat(rate));
    }
  };
  
  const calculateReverse = () => {
    const convertedAmount = parseFloat(convertToAmount);
    if (isNaN(convertedAmount)) {
      setBaseAmount('');
      return;
    }
  
    if (base === 'BTC' && convertTo === 'UAH') {
      setBaseAmount(convertedAmount / parseFloat(rate));
    } else if (base === 'UAH' && convertTo === 'BTC') {
      setBaseAmount(convertedAmount * parseFloat(rate));
    }
  };
  
  const handleSwap = async () => {
    swapCalledRef.current = true;
  
    const tempBase = base;
    const tempConvertTo = convertTo;
    setBase(tempConvertTo);
    setConvertTo(tempBase);
  
    const tempBaseAmount = baseAmount;
    const tempConvertToAmount = convertToAmount;
  
    setBaseAmount(tempConvertToAmount);
    setConvertToAmount(tempBaseAmount);
  
    startRateLoading();
  
    const fetchNewRate = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }
  
        const data = await response.json();
        const newRate = data.bitcoin?.uah;
  
        if (newRate === undefined) {
          throw new Error('Failed to parse response data');
        }
  
        return newRate;
      } catch (error) {
        console.error('Something went wrong', error);
        throw error;
      }
    };
  
    const updateRate = async () => {
      try {
        const newRate = await fetchNewRate();
  
        if (tempBase === 'BTC' && tempConvertTo === 'UAH') {
          setRate(newRate);
        } else if (tempBase === 'UAH' && tempConvertTo === 'BTC') {
          setRate(1 / newRate);
        }
  
        setTimeout(() => {
          stopRateLoading();
          setIsBuy(!isBuy);
  
          if (tempBase === 'BTC' && tempConvertTo === 'UAH') {
            calculate();
          } else if (tempBase === 'UAH' && tempConvertTo === 'BTC') {
            calculateReverse();
          }
        }, 1000);
      } catch (error) {
        console.error('Something went wrong', error);
      } finally {
        stopRateLoading();
      }
    };
  
    await updateRate();
  };

  const handleBaseInput = (value) => {
    setBaseAmount(value);
    startConvertToLoading();
    setTimeout(() => {
      stopConvertToLoading();
    }, 1000);
  };

  const handleConvertToInput = (value) => {
    setConvertToAmount(value);
    startBaseLoading();
    setTimeout(() => {
      stopBaseLoading(false);
    }, 1000);
  };

  const handleRefresh = useCallback(async () => {
    startRateLoading();
    try {
      const newPrice = await fetcher();
      let newRate;
  
      if (base === 'BTC' && convertTo === 'UAH') {
        newRate = newPrice;
      } else if (base === 'UAH' && convertTo === 'BTC') {
        newRate = 1 / newPrice;
      }
  
      setRate(newRate);
    } catch (error) {
      console.error('Something went wrong', error);
    } finally {
      stopRateLoading();
    }
  }, [base, convertTo, fetcher]);

  const rateFormat = rate >= 1 ? '0,0.00' : '0,0.00000000';

  return (
    <div className={styles.container}>
      <SwapCard
        icon={base}
        className={clsx(styles.swapCard, styles.animation)}
        value={baseAmount}
        onChange={handleBaseInput}
        base={base}
        loader={baseLoading}
        isBuy={isBuy}
      />
      <SwapCard
        icon={convertTo}
        convertTo={convertTo}
        className={clsx(styles.swapCard, styles.animation)}
        value={convertToAmount}
        onChange={handleConvertToInput}
        loader={convertToLoading}
        isBuy={!isBuy}
      />
      <Button
        className={clsx(styles.button, styles.animation)}
        variant='primary'
        icon='swap'
        onClick={handleSwap}
      />
      <RateCard
        className={clsx(styles.rateCard, styles.animation)}
        rate={numeral(rate).format(rateFormat)}
        amount={1}
        base={base}
        convertTo={convertTo}
        loader={rateLoading}
        onClick={handleRefresh}
      />
    </div>
  );
};
