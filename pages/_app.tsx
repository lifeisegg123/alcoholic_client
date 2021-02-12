import { AppProps } from "next/app";
import "antd/dist/antd.css";
import AppLayout from "components/Layout";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "@emotion/react";
import theme from "styles/Theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <GlobalStyle />
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
