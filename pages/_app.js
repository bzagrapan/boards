import Head from "next/head";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Alma-zadanie</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <main className="page-wrapper">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
