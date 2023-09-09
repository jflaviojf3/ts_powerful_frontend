import ThemeProvider from "../theme/index.js";

export default function App(props) {

  const { Component, pageProps } = props;
  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
