import { AppProps } from "next/app";
import "antd/dist/antd.css";
import AppLayout from "components/Layout";
import GlobalStyle from "components/GlobalStyle";
import { ThemeProvider } from "@emotion/react";
import theme from "configs/Theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppLayout>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppLayout>
  );
};

export default App;
