import { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-toast-notifications'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import { lightTheme } from '@alirok.com/rok-ui'

import ContextProvider from '../context'

import GlobalStyles from 'styles/global'

import { useLocale } from '../hooks/useLocale'
import Loader from '../components/Loader'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import * as ga from '../lib/ga'

import { useProduction } from '../hooks/useProduction'
import BoundaryError from '../components/BoundaryError'

// Application
function App({ Component, pageProps }: AppProps) {
  const { loading } = useLocale()

  const isProduction = useProduction()

  const getLayout =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Component as any).getLayout || ((page: React.ReactNode) => page)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    if (window && typeof window !== 'undefined') {
      import('react-hotjar').then(({ hotjar }) => {
        hotjar.initialize(2681826, 6)
      })
    }
  }, [])

  useEffect(() => {
    if (isProduction) {
      Sentry.init({
        dsn: 'https://3539897c0d7543888f997fa3d39836db@o862798.ingest.sentry.io/6054786',
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0
      })
    }
  }, [isProduction])

  return (
    <Sentry.ErrorBoundary fallback={<BoundaryError />}>
      <Head>
        <title>Alirok</title>

        <link rel="shortcut icon" href="/img/favicon-gradient.png" />
        <link rel="apple-touch-icon" href="/img/favicon-gradient.png" />
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta name="theme-color" content="#06092B" />
        <meta
          name="description"
          content="Quote, Book, Ship, That's simple! Quote real-time rates, 24 hours a day, from multiple carriers and ship to over 220 countries saving up to 65%"
        />
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={lightTheme}>
        <ToastProvider>
          <ContextProvider>
            {loading ? (
              <Loader />
            ) : (
              <div className="tooltipBoundary">
                {getLayout(<Component {...pageProps} />)}
              </div>
            )}
          </ContextProvider>
        </ToastProvider>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  )
}

export default App
