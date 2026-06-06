import Head from 'next/head'
import Meta from '@hackclub/meta'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../lib/theme'
import { ThemeUIProvider } from 'theme-ui'
import { Provider as BalancerProvider } from 'react-wrap-balancer'

const App = ({ Component, pageProps }) => (
  <ThemeUIProvider theme={theme}>
    <Meta as={Head}>
      <meta
        name="google-site-verification"
        content="7zE7h5foPaxIcnv5Frq6BkcUb9-3UzVc8q3P_cexf9I"
      />
    </Meta>
    <BalancerProvider>
      <Component {...pageProps} />
    </BalancerProvider>
  </ThemeUIProvider>
)

export default App
