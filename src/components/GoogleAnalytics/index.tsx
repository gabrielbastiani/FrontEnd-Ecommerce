import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-XXXXXXXXX-X'); // Substitua pelo seu ID de rastreamento
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};