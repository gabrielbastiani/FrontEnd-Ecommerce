import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';


type AuthContextData = {
  customer: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signInPay: (credentials: SignInProps) => Promise<void>;
  signInAvalie: (credentials: SignInProps) => Promise<void>;
  signOut(): void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  store_id: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@storevirtual.token')
    Router.push('/');
  } catch {
    toast.error('Erro ao deslogar!');
    console.log('erro ao deslogar');
  };
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [customer, setCustomer] = useState<UserProps>();
  const isAuthenticated = !!customer;

  useEffect(() => {

    // tentar pegar algo no cookie
    const { '@storevirtual.token': token } = parseCookies();

    if (token) {
      api.get('/customer/me').then(response => {
        const { id, name, email, store_id } = response.data;

        setCustomer({
          id,
          name,
          email,
          store_id
        });

      });

    };

  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/customer/session', {
        email,
        password
      });

      const { id, name, store_id, token } = response.data;

      setCookie(undefined, '@storevirtual.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      });

      setCustomer({
        id,
        name,
        email,
        store_id
      });

      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Logado com sucesso!');

      //Redirecionar o customer para /myAccount
      Router.push('/myAccount/meusdados');

    } catch (err) {
      toast.error("Erro ao acessar, confirmou seu cadastro em seu email?");
      console.log("Erro ao acessar, confirmou seu cadastro em seu email? ", err);
    }
  }

  async function signInPay({ email, password }: SignInProps) {
    try {
      const response = await api.post('/customer/session', {
        email,
        password
      });

      const { id, name, store_id, token } = response.data;

      setCookie(undefined, '@storevirtual.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      });

      setCustomer({
        id,
        name,
        email,
        store_id
      });

      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Logado com sucesso!');

      //Redirecionar o customer para /myAccount
      Router.push('/payment');

    } catch (err) {
      toast.error("Erro ao acessar, confirmou seu cadastro em seu email?");
      console.log("Erro ao acessar, confirmou seu cadastro em seu email? ", err);
    }
  }

  async function signInAvalie({ email, password }: SignInProps) {
    try {
      const response = await api.post('/customer/session', {
        email,
        password
      });

      const { id, name, store_id, token } = response.data;

      setCookie(undefined, '@storevirtual.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      });

      setCustomer({
        id,
        name,
        email,
        store_id
      });

      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Logado com sucesso!');

    } catch (err) {
      toast.error("Erro ao acessar, confirmou seu cadastro em seu email?");
      console.log("Erro ao acessar, confirmou seu cadastro em seu email? ", err);
    }
  }

  return (
    <AuthContext.Provider value={{ customer, isAuthenticated, signIn, signInPay, signInAvalie, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}