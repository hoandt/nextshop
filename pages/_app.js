import global from "@/styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "next/head";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header>
        <link rel="icon" href="/img/favicon.ico" type="image/x-icon" />
      </Header>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
