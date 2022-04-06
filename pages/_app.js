import { SWRConfig } from "swr";
import { GlobalStyles } from "../components/GlobalStyles";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <SWRConfig
          value={{
            fetcher: (...args) => fetch(...args).then((res) => res.json()),
          }}
        >
          <GlobalStyles />
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

export default MyApp;
