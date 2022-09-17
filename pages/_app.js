import '../styles/globals.css'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import { Provider } from '../context'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider()
])

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true
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
