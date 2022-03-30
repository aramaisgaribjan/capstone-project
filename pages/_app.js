import { GlobalStyles } from "../components/GlobalStyles";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
      <Navbar />
    </>
  );
}

export default MyApp;
