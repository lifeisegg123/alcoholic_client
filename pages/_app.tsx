import { AppProps } from "next/app";
import "antd/dist/antd.css";
import AppLayout from "components/Layout";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "@emotion/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "styles/Theme";
import axios from "axios";

const queryClient = new QueryClient();
axios.defaults.withCredentials = true;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppLayout>
          <GlobalStyle />
          <Component {...pageProps} />
        </AppLayout>
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
