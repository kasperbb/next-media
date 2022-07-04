import '@styles/globals.css'

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '@components/Layout/Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastProvider } from '@components/toast'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Homepage – Next Media</title>
        </Head>
        <Layout>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}
