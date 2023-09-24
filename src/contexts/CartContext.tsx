import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { CartDataContextType } from '../../@types/cart';
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
  refresh(): void;
  handleCartAbandoned(): void;
  updateCartAbandoned(): void;
  totalFinishCart: number;
  totalCart: number;
  fretePayment: number;
  fretePaymentCoupon: number;
  cupomPayment: string;
  newDataProducts: any;
  newSubTotalCart: number;
  prazoEntrega: string;
  getCartExist: any;
  dataCart: any;
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
  const apiClient = setupAPIClient();

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

  const [cartCep, setCartCep] = useState<any>("");
  const [getCartExist, setGetCartExist] = useState<any[]>([]);

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

  let storageId = String(cartProducts[0]?.store_cart_id);
  let dataCart: any = newDataProducts?.length < 1 ? productsCart : newDataProducts;

  useEffect(() => {
    try {
      async function loadCart() {
        const { data } = await apiClient.get(`/findProductsCart?store_cart_id=${storageId}`);
        setProductsCart(data || []);
      }
      loadCart();
    } catch (error) {
      console.log(error);
    }
  }, [storageId]);

  useEffect(() => {
    try {
      async function loadCartTotal() {
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
  }, [storageId]);

  useEffect(() => {
    try {
      async function loadFinishCart() {
        const { data } = await apiClient.get(`/findCartTotalFinish?store_cart_id=${storageId}`);
        setTotalFinishCart(data?.totalCartFinish || 0);
      }
      loadFinishCart();
    } catch (error) {
      console.log(error);
    }
  }, [storageId]);

  async function refresh() {
    const responseCart = await apiClient.get(`/findProductsCart?store_cart_id=${storageId}`);
    setProductsCart(responseCart.data || []);
    const { data } = await apiClient.get(`/findTotalCart?store_cart_id=${storageId}`);
    setTotalCart(data?.total || 0);
    setFretePayment(data?.frete || 0);
    setFretePaymentCoupon(data?.frete_coupon || 0);
    setCupomPayment(data?.coupon || "");
    setNewDataProducts(data?.new_value_products || []);
    setNewSubTotalCart(data?.new_subTotal || 0);
    setPrazoEntrega(data?.days_delivery || '');
    const responseDataFinish = await apiClient.get(`/findCartTotalFinish?store_cart_id=${storageId}`);
    setTotalFinishCart(responseDataFinish?.data?.totalCartFinish || 0);
    let dadosCart = localStorage.getItem("@cartProducts");
    let arrayCart = JSON.parse(dadosCart);
    setCartProducts(arrayCart || []);
  }

  useEffect(() => {
    async function existAbandonedCart() {
      try {
        const { data } = await apiClient.get(`/getExistCartAbandoned?customer_id=${customer?.id}`);
        setGetCartExist(data || []);
      } catch (error) {
        console.log(error);
      }
    }
    existAbandonedCart();
  },[customer]);

  async function handleCartAbandoned() {
    try {
      await apiClient.post(`/createAbandonedCart`, {
        customer_id: customer?.id,
        store_cart_id: storageId,
        cart_abandoned: dataCart
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartAbandoned() {
    try {
      await apiClient.put(`/updateCartAbandoned?customer_id=${customer?.id}`, {
        cart_abandoned: dataCart
      });
    } catch (error) {
      console.log(error);
    }
  }




  /*Gravar o produto*/

  async function saveProductCart(id: string, count: any, prod: any) {

    const findProduct = cartProducts.filter(item => item?.product_id === id);
    const mapFilter = findProduct.map(pro => pro?.product_id);

    if (mapFilter[0] === id) {

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

      refresh();

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

      refresh();

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

    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      total: cart_total,
      amount_products: sumadd
    });

    refresh();

    return;

  }



  /*Gravar MAIS quantidade(s) do produto*/

  async function addMoreItemCart(product_id: string) {

    const findProduct = cartProducts.filter(item => item?.product_id === product_id);
    const mapFilter = findProduct.map(pro => pro?.product_id);

    if (mapFilter[0] === product_id) {

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

      refresh();

      return;

    }

  }



  /*Remover MENOS quantidade(s) do produto*/

  async function removeItemCart(product_id: string, prod: any) {

    if (prod?.amount > 1) {

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

      refresh();

      return;
    }

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

    refresh();

  }



  /*Remover o produto*/

  async function removeProductCart(product_id: string) {

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

    refresh();

  }



  /*Limpar todo carrinho*/

  async function clearAllCart() {

    await apiClient.delete(`/clearCart?store_cart_id=${storageId}`);

    localStorage.removeItem('@cartProducts');

    refresh();

  }



  /*Dados gerais do carrinho*/

  async function dataTotalCart(cepfrete: string, frete: number, code: string, frete_coupon: number, subTot: number, newvalue: any, prazoEntrega: string) {

    setCartCep(cepfrete);

    await apiClient.put(`/updateTotalCart?store_cart_id=${storageId}`, {
      cep: cepfrete,
      frete: frete,
      coupon: code,
      frete_coupon: frete_coupon,
      new_subTotal: subTot,
      new_value_products: newvalue,
      days_delivery: prazoEntrega
    });

    refresh();

  }

  return (
    <CartContext.Provider value={{
      dataCart,
      getCartExist,
      handleCartAbandoned,
      updateCartAbandoned,
      refresh,
      prazoEntrega,
      newSubTotalCart,
      newDataProducts,
      cartCep,/* @ts-ignore */
      dataTotalCart,
      fretePayment,
      fretePaymentCoupon,
      cupomPayment,
      productsCart,
      cartProducts,
      totalCart,
      totalFinishCart,/* @ts-ignore */
      saveProductCart,/* @ts-ignore */
      addMoreItemCart,/* @ts-ignore */
      removeItemCart,/* @ts-ignore */
      removeProductCart,
      clearAllCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}