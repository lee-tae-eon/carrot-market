import "@styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useUser(Boolean(router.pathname === "/enter"));
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          axios.get(url).then((response) => response.data),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
