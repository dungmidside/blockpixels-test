import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-xl m-auto my-10">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
