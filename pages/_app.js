import '../styles/globals.css'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { SessionProvider } from 'next-auth/react'
import { Provider } from '../context'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import Head from 'next/head'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: 'z84TH7GWRfljYHkhTe6JzKryS3KImf-T' }),
  publicProvider()
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi'
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true
      }
    })
  ],
  provider,
  webSocketProvider
})

const theme = createTheme({
  type: 'dark', // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primary: '#06C0B5'
    },
    space: {},
    fonts: {}
  }
})

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <NextUIProvider theme={theme}>
            <Provider>
              <Head>
                <link
                  rel='icon'
                  href='/icon/logo_icon.ico'
                  onload="this.rel='stylesheet'"
                />
                <meta charset='UTF-8' />
                <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                <meta
                  name='viewport'
                  content='width=device-width, initial-scale=1.0'
                />
                <meta name='robots' content='index, follow' />
                <meta name='theme-color' content='#000' />
              </Head>
              <Header />
              <NavBar />
              <Component {...pageProps} />
            </Provider>
          </NextUIProvider>
        </SessionProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
