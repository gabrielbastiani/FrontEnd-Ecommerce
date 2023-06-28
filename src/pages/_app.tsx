import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../styles/global';
import theme from '../../styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../contexts/AuthContext';
import { Router } from 'next/dist/client/router';
import NProgress, { trickle } from "nprogress";
import 'nprogress/nprogress.css';

NProgress.configure({ easing: 'ease', speed: 500 });

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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

export default MyApp;