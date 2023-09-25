import ThemeProvider from "../src/theme/";

import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { AppProvider } from "@/hooks/AppContext";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <AppProvider>
      <ThemeProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
