import '@/styles/globals.css'
import { WebSocketProvider } from '@/contexts/WebSocketContext'

export default function App({ Component, pageProps }) {
  return (
    <WebSocketProvider>
      <Component {...pageProps} />
    </WebSocketProvider>
  )
}
