import type { AppProps } from "next/app";

import { ThemeProvider2 } from "../src/theme";
import { CacheProvider } from "@emotion/react";

import createEmotionCache from "../src/theme/createEmotionCache";

const cache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider2>
        <Component {...pageProps} />
      </ThemeProvider2>
    </CacheProvider>
  );
}
