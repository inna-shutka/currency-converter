import { getCurrencyRate } from '../api/getCurrencyRate';
import { Loader } from '../components/Loader';
import { Converter } from '../components/Converter';
import styles from './page.module.css';

export default async function Home() {
  const price = await getCurrencyRate();

  return (
    <div className={styles.container}>
      <Converter price={price} />
    </div>
  )
}
