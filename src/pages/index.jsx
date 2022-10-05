import Head from 'next/head'
import Image from 'next/image'
import Tarefa from '../components/Tarefa'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TS Powerfull</title>
        <meta name="description" content="Aplicativo para registro e controle das atividades" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem vindo ao <a>TS Powerfull</a>
        </h1>

        <p className={styles.description}>
          Faça a inclusão de uma nova Tarefa!
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Incluir Nova Tarefa &rarr;</h2>
            <Tarefa></Tarefa>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/jflaviojf3"
          target="_blank"
        >
          JFlaviojf3
        </a>
      </footer>
    </div>
  )
}
