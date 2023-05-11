import type { AppProps } from "next/app";

import { CacheProvider } from "@emotion/react";

import TopBar from "../src/components/TopBar";
import { ProvideCurrentFilter } from "../src/context/SetFilter";

import { TssCacheProvider } from "tss-react";
import createCache from "@emotion/cache";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const tssCache = createCache({
  key: "tss",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={muiCache}>
      <TssCacheProvider value={tssCache}>
        <ProvideCurrentFilter>
          <div style={{ margin: "0px 90px" }}>
            <TopBar></TopBar>
            <Component {...pageProps} />
          </div>
        </ProvideCurrentFilter>
      </TssCacheProvider>
    </CacheProvider>
  );
}
