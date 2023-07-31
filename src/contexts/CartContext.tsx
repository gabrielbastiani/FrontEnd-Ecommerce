import { ReactNode, createContext, useState } from 'react';
import { CartDataContextType } from '../../@types/cart';

type MyContextProps = {
  cart: Array<CartDataContextType>;
  setCart: (cart: Array<CartDataContextType>) => void;
  addItemCart: (newItem: AddItemsProps) => Promise<void>;
};

type AddItemsProps = {
    newItem: any;
  }

type Props = {
  children: ReactNode;
};

export const CartContext = createContext({} as MyContextProps);

export function CartProviderProducts({ children }: Props) {

  const [cart, setCart] = useState<any[]>([]);

    /* function addItemCart({ newItem }: AddItemsProps) {
        const indexItem = cart.findIndex(item => item?.id === newItem?.id);

        if (indexItem !== -1) {

        }

        let data = {
            ...newItem,
            amount: 1,
            total: newItem?.price
        }

        setCart(products => [...products, data]);
        console.log([...cart, data]);

    } */

  return (/* @ts-ignore */
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}