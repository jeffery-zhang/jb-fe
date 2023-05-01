import { AppProps } from 'next/app'
import { SwrGlobalConfig } from '@/config/swr.config'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SwrGlobalConfig>
      <Component {...pageProps} />
    </SwrGlobalConfig>
  )
}
