import { AppProps } from "next/app";
import "styles/custom-theme.css";
import AppLayout from "components/Layout";
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "@emotion/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import theme from "styles/Theme";
import axios from "axios";
import { useRef } from "react";

if (typeof window !== "undefined") {
  const access_token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  document.cookie = `access_token=${access_token}`;
}
axios.defaults.withCredentials = true;

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<null | QueryClient>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <AppLayout>
            <GlobalStyle />
            <Component {...pageProps} />
          </AppLayout>
          <ReactQueryDevtools />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
