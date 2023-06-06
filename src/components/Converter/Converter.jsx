import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { SwapCard } from '../SwapCard';
import { Button } from '../Button';
import { RateCard } from '../RateCard';
import styles from './Converter.module.css';
import useSWR from 'swr';

const API = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah';

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

export const Converter = () => {
  const [loading, startLoading, stopLoading] = useLoading(false);
  const [base, setBase] = useState('BTC');
  const [baseAmount, setBaseAmount] = useState('');
  const [convertTo, setConvertTo] = useState('UAH');
  const [convertToAmount, setConvertToAmount] = useState('');
  const swapCalledRef = useRef(false);
  const [rate, setRate] = useState(1);
  const [isBuy, setIsBuy] = useState(true);

  const { data: price, error } = useSWR('currencyRate', fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });

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
  }, [convertTo, rate, baseAmount]);

  const calculate = () => {
    const convertedAmount = parseFloat(baseAmount);
    if (isNaN(convertedAmount)) {
      setConvertToAmount('');
      return;
    }
    if (base === 'BTC' && convertTo === 'UAH') {
      setConvertToAmount((convertedAmount * parseFloat(rate)).toFixed(2));
    } else if (base === 'UAH' && convertTo === 'BTC') {
      setConvertToAmount((convertedAmount / parseFloat(rate)).toFixed(8));
    }
  };

  const calculateReverse = () => {
    const convertedAmount = parseFloat(convertToAmount);
    if (isNaN(convertedAmount)) {
      setBaseAmount('');
      return;
    }
    if (convertTo === 'BTC' && base === 'UAH') {
      setBaseAmount((convertedAmount / parseFloat(rate)).toFixed(8));
    } else if (convertTo === 'UAH' && base === 'BTC') {
      setBaseAmount((convertedAmount * parseFloat(rate)).toFixed(2));
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
  
    if (tempBaseAmount) {
      if (tempBase === 'BTC' && tempConvertTo === 'UAH') {
        const convertedAmount = parseFloat(tempBaseAmount) * parseFloat(rate); // Swap calculation
        setConvertToAmount(convertedAmount.toFixed(2));
      } else if (tempBase === 'UAH' && tempConvertTo === 'BTC') {
        const convertedAmount = parseFloat(tempBaseAmount) / parseFloat(rate); // Swap calculation
        setConvertToAmount(convertedAmount.toFixed(8));
      }
    }
  
    if (tempConvertToAmount) {
      if (tempBase === 'UAH' && tempConvertTo === 'BTC') {
        const convertedAmount = parseFloat(tempConvertToAmount) / parseFloat(rate); // Swap calculation
        setBaseAmount(convertedAmount.toFixed(8));
      } else if (tempBase === 'BTC' && tempConvertTo === 'UAH') {
        const convertedAmount = parseFloat(tempConvertToAmount) * parseFloat(rate); // Swap calculation
        setBaseAmount(convertedAmount.toFixed(2));
      }
    }
  
    startLoading();
  
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
  
        setTimeout(async () => {
          stopLoading();
          setIsBuy(!isBuy);
  
          if (tempBase === 'BTC' && tempConvertTo === 'UAH') {
            await handleRefresh();
          } else if (tempBase === 'UAH' && tempConvertTo === 'BTC') {
            await calculateReverse();
          }
        }, 1000);
      } catch (error) {
        console.error('Something went wrong', error);
      } finally {
        stopLoading();
      }
    };
  
    await updateRate();

    calculate();
  };  

  const handleBaseInput = (value) => {
    setBaseAmount(value);
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 1000);
  };

  const handleConvertToInput = (value) => {
    setConvertToAmount(value);
    startLoading();
    setTimeout(() => {
      stopLoading(false);
    }, 1000);
  };

  const handleRefresh = useCallback(async () => {
    startLoading();
    try {
      const newPrice = await fetcher();
      let newRate;

      if (base === 'BTC' && convertTo === 'UAH') {
        newRate = newPrice;
      } else if (base === 'UAH' && convertTo === 'BTC') {
        newRate = 1 / newPrice;
      }

      setRate(newRate);
      calculate();
    } catch (error) {
      console.error('Something went wrong', error);
    } finally {
      stopLoading();
    }
  }, [startLoading, base, convertTo]);

  return (
    <div className={styles.container}>
      <SwapCard
        icon={base}
        className={clsx(styles.swapCard, styles.animation)}
        value={baseAmount}
        onChange={handleBaseInput}
        base={base}
        loader={loading}
        isBuy={isBuy}
      />
      <SwapCard
        icon={convertTo}
        convertTo={convertTo}
        className={clsx(styles.swapCard, styles.animation)}
        value={convertToAmount}
        onChange={handleConvertToInput}
        loader={loading}
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
        rate={parseFloat(rate)}
        amount={1}
        base={base}
        convertTo={convertTo}
        loader={loading}
        onClick={handleRefresh}
      />
    </div>
  );
};
