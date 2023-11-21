import ReactGA from 'react-ga';
import { api } from '../../services/apiClient';

export const initGA = async () => {
  const { data } = await api.get(`/reloadDatasConfigsStore`);
  ReactGA.initialize(data[0]?.code_google_analytics);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};