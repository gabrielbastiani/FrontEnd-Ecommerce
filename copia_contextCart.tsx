import { ReactNode, createContext, useEffect, useState } from 'react';
import { CartDataContextType } from '../../@types/cart';
import router from 'next/router';

type MyContextProps = {
  cartProducts: Array<CartDataContextType>;
  saveProductCart: (id: AddLocalItemStorage) => Promise<void>;
  addMoreItemCart: (id: AddItemsProps) => Promise<void>;
  removeItemCart: (id: AddItemsProps) => Promise<void>;
  removeProductCart: (id: AddItemsProps) => Promise<void>;
  totalCart: number;
};

type AddItemsProps = {
  id: string;
}

type AddLocalItemStorage = {
  id: any;
  image: any;
  name: any;
  count: any;
  promotion: any;
  relationattributeproducts: any;
  stock: number;
  weight: number;
  width: number;
  height: number;
  depth: number;
}

type Props = {
  children: ReactNode;
};

export const CartContext = createContext({} as MyContextProps);

export function CartProviderProducts({ children }: Props) {

  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [totalCart, setTotalCart] = useState(Number);

  useEffect(() => {
    let dadosCart = localStorage.getItem("@cartProducts");
    let arrayCart = JSON.parse(dadosCart);
    setCartProducts(arrayCart || []);
    let priceTotal = localStorage.getItem("@totalCart");
    setTotalCart(Number(priceTotal));
  }, []);

  function saveProductCart(
    id: any,
    image: any,
    name: any,
    count: any,
    promotion: any,
    relationattributeproducts: any,
    stock: number,
    weight: number,
    width: number,
    height: number,
    depth: number
  ) {

    const indexItem = cartProducts.findIndex(item => item.id === id);

    if (indexItem !== -1) {

      let cartListCookie = cartProducts;

      cartListCookie[indexItem].amount = cartListCookie[indexItem].amount + count;

      cartListCookie[indexItem].total = cartListCookie[indexItem].amount * cartListCookie[indexItem].price;

      localStorage.setItem('@cartProducts', JSON.stringify(cartListCookie));
      totalResultCart(cartListCookie);

      return;
    }

    const cartItems = localStorage['@cartProducts'] ? JSON.parse(localStorage['@cartProducts']) : [];

    cartItems.push({
      id: id,
      image: image,
      name: name,
      amount: count,
      price: promotion,
      relationattributeproducts: relationattributeproducts,
      stock: Number(stock),
      weight: Number(weight),
      width: Number(width),
      height: Number(height),
      depth: Number(depth),
      total: promotion * count
    });

    localStorage.setItem('@cartProducts', JSON.stringify(cartItems));
    totalResultCart(cartItems);

    setTimeout(() => {
      router.reload();
    }, 1500);

  }

  function addMoreItemCart(id: string) {
    const indexItem = cartProducts.findIndex(item => item.id === id);

    if (indexItem !== -1) {

      let cartListCookieMore = cartProducts;

      cartListCookieMore[indexItem].amount = cartListCookieMore[indexItem].amount + 1;

      cartListCookieMore[indexItem].total = cartListCookieMore[indexItem].amount * cartListCookieMore[indexItem].price;

      localStorage.setItem('@cartProducts', JSON.stringify(cartListCookieMore));
      totalResultCart(cartListCookieMore);

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;
    }

  }

  function removeItemCart(id: string) {
    const indexItem = cartProducts.findIndex(item => item.id === id);

    if (cartProducts[indexItem]?.amount > 1) {
      let cartListDelete = cartProducts;

      cartListDelete[indexItem].amount = cartListDelete[indexItem].amount - 1;

      cartListDelete[indexItem].total = cartListDelete[indexItem].total - cartListDelete[indexItem].price;

      localStorage.setItem('@cartProducts', JSON.stringify(cartListDelete));
      totalResultCart(cartListDelete);

      setTimeout(() => {
        router.reload();
      }, 1500);

      return;
    }

    const removeItem = cartProducts.filter(item => item.id !== id);
    localStorage.setItem('@cartProducts', JSON.stringify(removeItem));
    totalResultCart(removeItem);

    setTimeout(() => {
      router.reload();
    }, 1500);

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

    setTimeout(() => {
      router.reload();
    }, 1500);

  }

  function totalResultCart(items: any) {
    let myCart = items;
    let result = myCart.reduce((acc: any, obj: any) => { return acc + obj.total }, 0);

    localStorage.setItem("@totalCart", result.toFixed(2));
  }

  return (/* @ts-ignore */
    <CartContext.Provider value={{ cartProducts, totalCart, saveProductCart, addMoreItemCart, removeItemCart, removeProductCart }}>
      {children}
    </CartContext.Provider>
  )
}