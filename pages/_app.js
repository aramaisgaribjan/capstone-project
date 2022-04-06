import { SWRConfig } from "swr";
import { GlobalStyles } from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
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
          <TitleBar />
          <Component {...pageProps} />
          <Navbar />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

export default MyApp;
