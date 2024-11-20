import styles from "./page.module.css";
import NavBar from './components/NavBar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className={styles.page}>
        <h1 className={styles.title}>Bem-vindo à página inicial do sistema de upload de vídeo!</h1>
        <h2 className={styles.subtitle}>Clique aqui para saber como está funcionando o progresso</h2>
        <Link href="/interacao">
          <button className={styles.button}>
            Vamos lá! &rarr;
          </button>
        </Link>
      </div>
    </>
  );
}