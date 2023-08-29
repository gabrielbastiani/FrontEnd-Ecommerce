import { ReactNode, createContext, useEffect, useState } from 'react';
import { CartDataContextType } from '../../@types/cart';
import router from 'next/router';
import { setupAPIClient } from '../services/api';
import generateUniqueId from 'generate-unique-id';


type MyContextProps = {
  cartProducts: Array<CartDataContextType>;
  productsCart: Array<CartDataContextType>;
  saveProductCart: (id: AddLocalItemStorage) => Promise<void>;
  addMoreItemCart: (id: AddItemsProps) => Promise<void>;
  removeItemCart: (id: AddItemsProps) => Promise<void>;
  removeProductCart: (id: AddItemsProps) => Promise<void>;
};

type AddItemsProps = {
  id: string;
  prod: any;
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

  const idCart = generateUniqueId({
    includeSymbols: ['@', '#', ')', '$', '('],
    useLetters: true,
    useNumbers: true,
    length: 30
  });

  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [productsCart, setProductsCart] = useState<any[]>([]);
  const [totalCart, setTotalCart] = useState(Number);

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
        console.log(data)
        setProductsCart(data);
      }
      loadCart();
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
        total: prod?.product?.promotion * count
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
      total: prod?.product?.promotion * count
    });

    setTimeout(() => {
      router.reload();
    }, 1500);

    return;

  }

  async function addMoreItemCart(id: string, prod: any) {

    const apiClient = setupAPIClient();
    const findProduct = cartProducts.filter(item => item?.product_id === id);
    const mapFilter = findProduct.map(pro => pro?.product_id);

    if (mapFilter[0] === id) {

      const storageId = String(cartProducts[0]?.store_cart_id);
      const { data } = await apiClient.get(`/findCart?store_cart_id=${storageId}&product_id=${id}`);

      let more_amountadd = data?.amount + 1;
      let total_more = more_amountadd * prod?.product?.promotion;

      await apiClient.put(`/updateCart?store_cart_id=${storageId}&product_id=${id}`, {
        amount: more_amountadd,
        total: total_more
      });

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;
    }

  }

  /* function removeItemCart(id: string) {
    const indexItem = cartProducts.findIndex(item => item.id === id);

    if (cartProducts[indexItem]?.amount > 1) {
      let cartListDelete = cartProducts;

      cartListDelete[indexItem].amount = cartListDelete[indexItem].amount - 1;

      cartListDelete[indexItem].total = cartListDelete[indexItem].total - cartListDelete[indexItem].price;

      localStorage.setItem('@cartProducts', JSON.stringify(cartListDelete));
      totalResultCart(cartListDelete);

      return;
    }

    const removeItem = cartProducts.filter(item => item.id !== id);
    localStorage.setItem('@cartProducts', JSON.stringify(removeItem));
    totalResultCart(removeItem);

  }

  function removeProductCart(product: any) {
    const indexItem = cartProducts.findIndex(item => item.id === product.id);

    let deleteProductCart = cartProducts;

    deleteProductCart[indexItem].amount = deleteProductCart[indexItem].amount - product?.amount;

    deleteProductCart[indexItem].total = deleteProductCart[indexItem].total - deleteProductCart[indexItem].price;

    localStorage.setItem('@cartProducts', JSON.stringify(deleteProductCart));
    totalResultCart(deleteProductCart);

    const removeItem = cartProducts.filter(item => item.id !== product.id);
    localStorage.setItem('@cartProducts', JSON.stringify(removeItem));
    totalResultCart(removeItem);

  }

  function totalResultCart(items: any) {
    let myCart = items;
    let result = myCart.reduce((acc: any, obj: any) => { return acc + obj.total }, 0);

    localStorage.setItem("@totalCart", result.toFixed(2));
  } */

  return (/* @ts-ignore */
    <CartContext.Provider value={{ productsCart, /* cartProducts, totalCart,  */saveProductCart, addMoreItemCart, /*removeItemCart, removeProductCart */ }}>
      {children}
    </CartContext.Provider>
  )
}