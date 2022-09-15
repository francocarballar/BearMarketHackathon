import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { Header } from '../components/Header'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <NextUIProvider>
        <Header />
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  )
}

export default MyApp
