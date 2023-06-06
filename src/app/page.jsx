import { Converter } from '../components/Converter';
import styles from './page.module.css';

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Converter />
    </div>
  )
}
