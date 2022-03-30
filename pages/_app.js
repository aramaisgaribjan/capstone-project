import { SWRConfig } from "swr";
import { GlobalStyles } from "../components/GlobalStyles";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <GlobalStyles />
        <Component {...pageProps} />
        <Navbar />
      </SWRConfig>
    </>
  );
}

export default MyApp;
