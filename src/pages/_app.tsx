import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { SwrGlobalConfig } from '@/config/swr.config'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = window.localStorage.getItem('theme')
      window.document
        .querySelector('html')
        ?.setAttribute('data-theme', theme || 'winter')
    }
  }, [])

  return (
    <SwrGlobalConfig>
      <Component {...pageProps} />
    </SwrGlobalConfig>
  )
}
