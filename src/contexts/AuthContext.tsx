import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { api } from '../services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../services/api';


type AuthContextData = {
  customer: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signInPay: (credentials: SignInProps) => Promise<void>;
  signInAvalie: (credentials: SignInProps) => Promise<void>;
  signOut(): void;
  signOutPayment(): void;
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
  cartProducts: any;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@storevirtual.token');
    console.log('deslogado')
    Router.push('/');
  } catch {
    toast.error('Erro ao deslogar!');
    console.log('erro ao deslogar');
  };
};

export function signOutPayment() {
  try {
    destroyCookie(undefined, '@storevirtual.token');
    console.log('deslogado')
    Router.push('/loginClientPayment');
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

  async function signIn({ email, password, cartProducts }: SignInProps) {
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

      if (cartProducts.length >= 1) {

        const storageId = String(cartProducts[0]?.store_cart_id);
        api.put(`/updateCartCustomer?store_cart_id=${storageId}`, {
          customer_id: String(id)
        });

      }

      //Redirecionar o customer para /myAccount
      Router.push('/myAccount/meusdados');

    } catch (error) {
      console.log(error.response.data);
      toast.error("Usuario ou senha errado!!!")
    }
  }
  /* @ts-ignore */
  async function signInPay({ email, password, cartProducts, cartCep, dataCart }: SignInProps) {
    const apiClient = setupAPIClient();
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

      if (cartProducts.length >= 1) {

        const storageId = String(cartProducts[0]?.store_cart_id);

        await apiClient.post(`/createAbandonedCart`, {
          customer_id: id,
          store_cart_id: storageId,
          cart_abandoned: dataCart
        });

        api.put(`/updateCartPaymentCustomer?store_cart_id=${storageId}`, {
          customer_id: String(id),
          cep: cartCep
        });

        const { data } = await apiClient.get(`/findCepCart?customer_id=${id}&cep=${cartCep}`);

        if (data?.cep === cartCep) {
          await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${id}&cep=${cartCep}`);
        } else {
          Router.push('/registerNewDelivey');
          return;
        }

      }

      Router.push('/payment');

    } catch (error) {
      console.log(error);
      toast.error("Usuario ou senha errado!!!")
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

    } catch (error) {
      console.log(error.response.data);
      toast.error("Usuario ou senha errado!!!")
    }
  }

  return (
    <AuthContext.Provider value={{ customer, isAuthenticated, signIn, signInPay, signInAvalie, signOut, signOutPayment }}>
      {children}
    </AuthContext.Provider>
  )
}