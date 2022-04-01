import { SWRConfig } from "swr";
import { GlobalStyles } from "../components/GlobalStyles";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
