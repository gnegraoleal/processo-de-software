import Image from "next/image";
import styles from "./page.module.css";
import NavBar from './components/NavBar';

export default function Home() {
  return (
    <><NavBar />
    <div className={styles.page}>
      <h1>Bem vindo ao sistema de upload de vídeo</h1>
    </div></>
  );
}
