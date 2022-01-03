import styles from "./Layout.module.css";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>MokeDex in NextJs</title>
        <meta name="MokeDex" content="MokeDex in NextJs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.HeaderComponent}>
          <div className={styles.TitleComponent}>MokeDex</div>
        </div>

        <div className={styles.Container}>{children}</div>
      </main>
    </>
  );
}
