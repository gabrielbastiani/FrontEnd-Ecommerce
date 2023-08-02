import { ReactNode, createContext, useEffect, useState } from 'react';
import { CartDataContextType } from '../../@types/cart';

type MyContextProps = {
  cart: Array<CartDataContextType>;
  setCart: (cart: Array<CartDataContextType>) => void;
  addItemCart: (id: AddItemsProps) => Promise<void>;
  removeItemCart: (id: AddItemsProps) => Promise<void>;
  removeProductCart: (id: AddItemsProps) => Promise<void>;
  totalResultCart: () => void;
};

type AddItemsProps = {
  id: any;
}

type Props = {
  children: ReactNode;
};

export const CartContext = createContext({} as MyContextProps);

export function CartProviderProducts({ children }: Props) {

  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  function addItemCart(newItem: any, count: number) {
    const indexItem = cart.findIndex(item => item.id === newItem.id);

    if (indexItem !== -1) {

      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;

      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].promotion;

      setCart(cartList);
      totalResultCart(cartList);

      return;
    }

    let data = {
      ...newItem,
      amount: count,
      total: newItem.promotion * count
    }

    setCart(products => [...products, data]);
    totalResultCart([...cart, data]);

  }

  function removeItemCart(product: any) {
    const indexItem = cart.findIndex(item => item.id === product.id);

    if (cart[indexItem]?.amount > 1) {
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount - 1;

      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].promotion;

      setCart(cartList);
      totalResultCart(cartList);

      return;
    }

    const removeItem = cart.filter(item => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);

  }

  function removeProductCart(product: any) {
    const indexItem = cart.findIndex(item => item.id === product.id);

    let cartList = cart;

    cartList[indexItem].amount = cartList[indexItem].amount - product?.amount;

    cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].promotion;

    setCart(cartList);
    totalResultCart(cartList)

    const removeItem = cart.filter(item => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);

  }

  function totalResultCart(items: any) {
    let myCart = items;
    let result = myCart.reduce((acc: any, obj: any) => { return acc + obj.total }, 0);

    setTotal(result.toFixed(2));

  }

  return (/* @ts-ignore */
    <CartContext.Provider value={{ cart, addItemCart, removeItemCart, removeProductCart, totalResultCart, total }}>
      {children}
    </CartContext.Provider>
  )
}