import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../styles/global';
import theme from '../../styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../contexts/AuthContext';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer autoClose={4000} />
        <GlobalStyle />
      </ThemeProvider>
    </AuthProvider>
  )
}