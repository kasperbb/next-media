import '@styles/globals.css'

import App from 'next/app'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@context/AuthContext'
import { Config } from '@interfaces/config'
import { ConfigContext } from '@context/ConfigContext'
import Head from 'next/head'
import { Layout } from '@components/Layout/Layout'
import { LocationProvider } from '@context/LocationContext'
import { axios } from '@lib/axios'

interface MyAppProps extends AppProps {
	config: Config.Data
}

//TODO: Type appContext
MyApp.getInitialProps = async (appContext: any) => {
	const appProps = await App.getInitialProps(appContext)
	const { data }: { data: Config.Data } = await axios.get('/configuration')

	return { ...appProps, config: data }
}

export default function MyApp({ Component, pageProps, config }: MyAppProps) {
	if (!config) return null

	return (
		<ConfigContext.Provider value={config}>
			<AuthProvider>
				<LocationProvider>
					<Head>
						<title>Homepage – Next Media</title>
					</Head>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</LocationProvider>
			</AuthProvider>
		</ConfigContext.Provider>
	)
}
