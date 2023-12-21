import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { Container } from '@/styles/pages/app'
import { Header } from '@/components/Header'
import { ShoppingCartContextProvider } from '@/contexts/ShoppingCart'
import { ToastContainer } from 'react-toastify'
import { globalStyles } from '@/styles/global'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
        <ToastContainer />
      </Container>
    </ShoppingCartContextProvider>
  )
}
