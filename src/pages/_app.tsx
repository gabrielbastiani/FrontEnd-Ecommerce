import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../styles/global';
import theme from '../../styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../contexts/AuthContext';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={4000} />
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider >
    </>
  )
}

export default MyApp