import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { CartDataContextType } from '../../@types/cart';
import router from 'next/router';
import { setupAPIClient } from '../services/api';
import generateUniqueId from 'generate-unique-id';
import { AuthContext } from './AuthContext';


type MyContextProps = {
  cartProducts: Array<CartDataContextType>;
  productsCart: Array<CartDataContextType>;
  saveProductCart: (id: AddLocalItemStorage) => Promise<void>;
  addMoreItemCart: (id: AddItemsProps) => Promise<void>;
  removeItemCart: (id: AddItemsProps) => Promise<void>;
  removeProductCart: (id: AddItemsProps) => Promise<void>;
  clearAllCart(): void;
  cepCustomer: (cepfrete: AddCepProps) => Promise<void>;
  totalFinishCart: number;
  totalCart: number;
};

type AddCepProps = {
  cepfrete: string;
  frete: number;
  code: string;
}

type AddItemsProps = {
  product_id: string;
}

type AddLocalItemStorage = {
  id: string;
  count: any;
  prod: any;
}

type Props = {
  children: ReactNode;
};

export const CartContext = createContext({} as MyContextProps);

export function CartProviderProducts({ children }: Props) {

  const { customer } = useContext(AuthContext);

  const idCart = generateUniqueId({
    useLetters: true,
    useNumbers: true,
    length: 17
  });

  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [productsCart, setProductsCart] = useState<any[]>([]);
  const [totalCart, setTotalCart] = useState(0);
  const [totalFinishCart, setTotalFinishCart] = useState(0);

  const [cartCep, setCartCep] = useState<any>("");

  useEffect(() => {
    let dadosCart = localStorage.getItem("@cartProducts");
    let arrayCart = JSON.parse(dadosCart);
    setCartProducts(arrayCart || []);
  }, []);

  useEffect(() => {
    try {
      const apiClient = setupAPIClient();
      async function loadCart() {
        const storageId = String(cartProducts[0]?.store_cart_id);
        const { data } = await apiClient.get(`/findProductsCart?store_cart_id=${storageId}`);
        setProductsCart(data || []);
      }
      loadCart();
    } catch (error) {
      console.log(error);
    }
  }, [cartProducts]);

  useEffect(() => {
    try {
      const apiClient = setupAPIClient();
      async function loadCartTotal() {
        const storageId = String(cartProducts[0]?.store_cart_id);
        const { data } = await apiClient.get(`/findTotalCart?store_cart_id=${storageId}`);
        setTotalCart(data?.total || 0);
      }
      loadCartTotal();
    } catch (error) {
      console.log(error);
    }
  }, [cartProducts]);

  useEffect(() => {
    try {
      const apiClient = setupAPIClient();
      async function loadFinishCart() {
        const storageId = String(cartProducts[0]?.store_cart_id);
        const { data } = await apiClient.get(`/findCartTotalFinish?store_cart_id=${storageId}`);
        setTotalFinishCart(data?.totalCartFinish || 0);
      }
      loadFinishCart();
    } catch (error) {
      console.log(error);
    }
  }, [cartProducts]);

  async function saveProductCart(id: string, count: any, prod: any) {

    const apiClient = setupAPIClient();
    const findProduct = cartProducts.filter(item => item?.product_id === id);
    const mapFilter = findProduct.map(pro => pro?.product_id);

    if (mapFilter[0] === id) {

      const storageId = String(cartProducts[0]?.store_cart_id);
      const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${id}`);

      let more_amount = data?.amount + count;
      let total_more = more_amount * prod?.product?.promotion;

      await apiClient.put(`/updateCart?store_cart_id=${storageId}&product_id=${id}`, {
        amount: more_amount,
        total: total_more
      });

      await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
        total: total_more
      });

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;
    }

    const cartItems = localStorage['@cartProducts'] ? JSON.parse(localStorage['@cartProducts']) : [];

    if (cartItems?.length === 0) {

      cartItems.push({
        store_cart_id: idCart,
        product_id: id
      });

      localStorage.setItem('@cartProducts', JSON.stringify(cartItems));

      await apiClient.post(`/createCart`, {
        store_cart_id: cartItems[0].store_cart_id,
        product_id: id,
        amount: count,
        total: prod?.product?.promotion * count,
        customer_id: customer ? customer?.id : null
      });

      await apiClient.post(`/createTotalCart`, {
        store_cart_id: cartItems[0].store_cart_id,
        total: prod?.product?.promotion * count,
        customer_id: customer ? customer?.id : null
      });

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;

    }

    cartItems.push({
      store_cart_id: cartItems[0].store_cart_id,
      product_id: id
    });

    localStorage.setItem('@cartProducts', JSON.stringify(cartItems));

    await apiClient.post(`/createCart`, {
      store_cart_id: cartItems[0].store_cart_id,
      product_id: id,
      amount: count,
      total: prod?.product?.promotion * count,
      customer_id: customer ? customer?.id : null
    });

    const cart_total = prod?.product?.promotion * count + totalCart;

    const storageId = String(cartProducts[0]?.store_cart_id);
    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      total: cart_total
    });

    setTimeout(() => {
      router.reload();
    }, 1500);

    return;

  }

  async function addMoreItemCart(product_id: string) {

    const apiClient = setupAPIClient();
    const findProduct = cartProducts.filter(item => item?.product_id === product_id);
    const mapFilter = findProduct.map(pro => pro?.product_id);

    if (mapFilter[0] === product_id) {

      const storageId = String(cartProducts[0]?.store_cart_id);
      const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${product_id}`);

      let more_amountadd = data?.amount + 1;
      let total_more = more_amountadd * data?.product?.promotion;

      await apiClient.put(`/updateCart?store_cart_id=${storageId}&product_id=${product_id}`, {
        amount: more_amountadd,
        total: total_more
      });

      const cart_total = totalCart + data?.product?.promotion;

      await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
        total: cart_total
      });

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;

    }

  }

  async function removeItemCart(product_id: string, prod: any) {

    const apiClient = setupAPIClient();

    if (prod?.amount > 1) {

      const storageId = String(cartProducts[0]?.store_cart_id);
      const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${product_id}`);

      let sub_amount = Number(data?.amount) - 1;
      let total_sub = Number(data?.total) - Number(data?.product?.promotion);

      await apiClient.put(`/updateCart?store_cart_id=${storageId}&product_id=${product_id}`, {
        amount: sub_amount,
        total: total_sub
      });

      const cart_total = totalCart - data?.product?.promotion;

      await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
        total: cart_total
      });

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;
    }

    const storageId = String(cartProducts[0]?.store_cart_id);
    const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${product_id}`);
    const cart_total = totalCart - data?.product?.promotion;

    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      total: cart_total
    });

    await apiClient.delete(`/deleteCart?store_cart_id=${storageId}&product_id=${product_id}`);

    const removeItem = cartProducts.filter(item => item?.product_id !== product_id);
    localStorage.setItem('@cartProducts', JSON.stringify(removeItem));

    setTimeout(() => {
      router.reload();
    }, 1500);

  }

  async function removeProductCart(product_id: string) {

    const apiClient = setupAPIClient();
    const storageId = String(cartProducts[0]?.store_cart_id);

    const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${product_id}`);
    const cart_total = totalCart - data?.total;

    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      total: cart_total
    });

    const response = await apiClient.get(`/findTotalCart?store_cart_id=${storageId}`);

    if (response?.data?.total === 0) {
      await apiClient.delete(`/deleteTotalCart?store_cart_id=${storageId}`);
    }

    await apiClient.delete(`/deleteCart?store_cart_id=${storageId}&product_id=${product_id}`);

    const removeItem = cartProducts.filter(item => item.product_id !== product_id);
    localStorage.setItem('@cartProducts', JSON.stringify(removeItem));

    setTimeout(() => {
      router.reload();
    }, 1500);

  }

  async function clearAllCart() {

    const apiClient = setupAPIClient();
    const storageId = String(cartProducts[0]?.store_cart_id);

    await apiClient.delete(`/clearCart?store_cart_id=${storageId}`);

    localStorage.removeItem('@cartProducts');

    setTimeout(() => {
      router.reload();
    }, 1500);

  }

  async function cepCustomer(cepfrete: string, frete: number, code: string) {

    setCartCep(cepfrete);

    const apiClient = setupAPIClient();
    const storageId = String(cartProducts[0]?.store_cart_id);

    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      cep: cepfrete,
      frete: frete,
      coupon: code
    });

  }

  return (/* @ts-ignore */
    <CartContext.Provider value={{ cartCep, cepCustomer, productsCart, cartProducts, totalCart, totalFinishCart, saveProductCart, addMoreItemCart, removeItemCart, removeProductCart, clearAllCart }}>
      {children}
    </CartContext.Provider>
  )
}