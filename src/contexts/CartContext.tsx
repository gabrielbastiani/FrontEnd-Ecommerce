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
  dataTotalCart: (cepfrete: AddCepProps) => Promise<void>;
  totalFinishCart: number;
  totalCart: number;
  fretePayment: number;
  fretePaymentCoupon: number;
  cupomPayment: string;
  newDataProducts: any;
  newSubTotalCart: number;
  prazoEntrega: string;
  loadingCart: boolean;
};

type AddCepProps = {
  cepfrete: string;
  frete: number;
  code: string;
  frete_coupon: number;
  subTot: number;
  newvalue: any;
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

  const [fretePayment, setFretePayment] = useState(0);
  const [fretePaymentCoupon, setFretePaymentCoupon] = useState(0);
  const [cupomPayment, setCupomPayment] = useState("");
  const [newDataProducts, setNewDataProducts] = useState<any[]>([]);
  const [newSubTotalCart, setNewSubTotalCart] = useState(0);
  const [prazoEntrega, setPrazoEntrega] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);

  const [cartCep, setCartCep] = useState<any>("");

  const totalAmountProducts = productsCart.map(amo => amo?.amount);
  var somaProducts: number = 0;
  for (var i = 0; i < totalAmountProducts.length; i++) {
    somaProducts += totalAmountProducts[i];
  }

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
        setFretePayment(data?.frete || 0);
        setFretePaymentCoupon(data?.frete_coupon || 0);
        setCupomPayment(data?.coupon || "");
        setNewDataProducts(data?.new_value_products || []);
        setNewSubTotalCart(data?.new_subTotal || 0);
        setPrazoEntrega(data?.days_delivery || '');
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



  /*Gravar o produto*/

  async function saveProductCart(id: string, count: any, prod: any) {

    const apiClient = setupAPIClient();
    const findProduct = cartProducts.filter(item => item?.product_id === id);
    const mapFilter = findProduct.map(pro => pro?.product_id);

    if (mapFilter[0] === id) {

      const storageId = String(cartProducts[0]?.store_cart_id);
      const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${id}`);

      let more_amount = data?.amount + count;
      let total_more = prod?.product?.promotion ? more_amount * prod?.product?.promotion : more_amount * prod?.promotion;

      await apiClient.put(`/updateCart?store_cart_id=${storageId}&product_id=${id}`, {
        amount: more_amount,
        total: total_more
      });

      let somaMore: number = somaProducts + count;
      let total_cart: number = prod?.product?.promotion ? prod?.product?.promotion * count + totalCart : prod?.promotion * count + totalCart;

      await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
        total: total_cart,
        amount_products: somaMore
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

      let cart_total_more: number = prod?.product?.promotion ? prod?.product?.promotion * count : prod?.promotion * count;

      await apiClient.post(`/createCart`, {
        store_cart_id: cartItems[0].store_cart_id,
        product_id: id,
        amount: count,
        total: cart_total_more,
        customer_id: customer ? customer?.id : null
      });

      let firstAmount: number = somaProducts >= 1 ? somaProducts + count : count;

      await apiClient.post(`/createTotalCart`, {
        store_cart_id: cartItems[0].store_cart_id,
        total: cart_total_more,
        customer_id: customer ? customer?.id : null,
        amount_products: firstAmount
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

    let create_total_cart: number = prod?.product?.promotion ? prod?.product?.promotion * count : prod?.promotion * count;

    await apiClient.post(`/createCart`, {
      store_cart_id: cartItems[0].store_cart_id,
      product_id: id,
      amount: count,
      total: create_total_cart,
      customer_id: customer ? customer?.id : null
    });

    const cart_total: number = prod?.product?.promotion ? prod?.product?.promotion * count + totalCart : prod?.promotion * count + totalCart
    let sumadd: number = productsCart[0]?.amount + count;

    const storageId = String(cartProducts[0]?.store_cart_id);
    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      total: cart_total,
      amount_products: sumadd
    });

    setTimeout(() => {
      router.reload();
    }, 1500);

    return;

  }



  /*Gravar MAIS quantidade(s) do produto*/

  async function addMoreItemCart(product_id: string) {

    const apiClient = setupAPIClient();
    const findProduct = cartProducts.filter(item => item?.product_id === product_id);
    const mapFilter = findProduct.map(pro => pro?.product_id);

    if (mapFilter[0] === product_id) {

      const storageId = String(cartProducts[0]?.store_cart_id);
      const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${product_id}`);

      let more_amountadd = data?.amount + 1;
      let total_more = more_amountadd * data?.product?.promotion;
      let sum: number = somaProducts + 1

      await apiClient.put(`/updateCart?store_cart_id=${storageId}&product_id=${product_id}`, {
        amount: more_amountadd,
        total: total_more
      });

      const cart_total = totalCart + data?.product?.promotion;

      await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
        total: cart_total,
        amount_products: sum
      });

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;

    }

  }



  /*Remover MENOS quantidade(s) do produto*/

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
      let removAmount: number = somaProducts - 1

      await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
        total: cart_total,
        amount_products: removAmount
      });

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;
    }

    const storageId = String(cartProducts[0]?.store_cart_id);
    const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${product_id}`);
    const cart_total = totalCart - data?.product?.promotion;

    let amountRemove: number = somaProducts - 1;

    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      total: cart_total,
      amount_products: amountRemove
    });

    await apiClient.delete(`/deleteCart?store_cart_id=${storageId}&product_id=${product_id}`);

    if (somaProducts === 1) {
      await apiClient.delete(`/deleteTotalCart?store_cart_id=${storageId}`);
      await apiClient.delete(`/deleteCartTotalFinish?store_cart_id=${storageId}`);
    }

    const removeItem = cartProducts.filter(item => item?.product_id !== product_id);
    localStorage.setItem('@cartProducts', JSON.stringify(removeItem));

    setTimeout(() => {
      router.reload();
    }, 1500);

  }



  /*Remover o produto*/

  async function removeProductCart(product_id: string) {

    const apiClient = setupAPIClient();
    const storageId = String(cartProducts[0]?.store_cart_id);

    const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${product_id}`);
    const cart_total = totalCart - data?.total;
    let removeTotalAmount: number = data?.amount;

    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      total: cart_total,
      amount_products: somaProducts - removeTotalAmount
    });

    const response = await apiClient.get(`/findTotalCart?store_cart_id=${storageId}`);

    if (response?.data?.total === 0) {
      await apiClient.delete(`/deleteTotalCart?store_cart_id=${storageId}`);
      await apiClient.delete(`/deleteCartTotalFinish?store_cart_id=${storageId}`);
    }

    await apiClient.delete(`/deleteCart?store_cart_id=${storageId}&product_id=${product_id}`);

    const removeItem = cartProducts.filter(item => item.product_id !== product_id);
    localStorage.setItem('@cartProducts', JSON.stringify(removeItem));

    setTimeout(() => {
      router.reload();
    }, 1500);

  }



  /*Limpar todo carrinho*/

  async function clearAllCart() {

    const apiClient = setupAPIClient();
    const storageId = String(cartProducts[0]?.store_cart_id);

    await apiClient.delete(`/clearCart?store_cart_id=${storageId}`);

    localStorage.removeItem('@cartProducts');

    setTimeout(() => {
      router.reload();
    }, 1500);

  }



  /*Dados gerais do carrinho*/

  async function dataTotalCart(cepfrete: string, frete: number, code: string, frete_coupon: number, subTot: number, newvalue: any, prazoEntrega: string) {

    setCartCep(cepfrete);

    const apiClient = setupAPIClient();
    const storageId = String(cartProducts[0]?.store_cart_id);

    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      cep: cepfrete,
      frete: frete,
      coupon: code,
      frete_coupon: frete_coupon,
      new_subTotal: subTot,
      new_value_products: newvalue,
      days_delivery: prazoEntrega
    });

  }

  return (/* @ts-ignore */
    <CartContext.Provider value={{ loadingCart, prazoEntrega, newSubTotalCart, newDataProducts, cartCep, dataTotalCart, fretePayment, fretePaymentCoupon, cupomPayment, productsCart, cartProducts, totalCart, totalFinishCart, saveProductCart, addMoreItemCart, removeItemCart, removeProductCart, clearAllCart }}>
      {children}
    </CartContext.Provider>
  )
}