import { ReactNode, createContext, useState } from 'react';
import { ProductDataContextType } from '../../@types/dataproducts';

type MyContextProps = {
  productsData: Array<ProductDataContextType>;
  setProductsData: (productsData: Array<ProductDataContextType>) => void;
};

type Props = {
  children: ReactNode;
};

export const AuthContextProducts = createContext({} as MyContextProps);

function AuthProviderProducts({ children }: Props) {

  const [productsData, setProductsData] = useState<any[]>([]);

  return (
    <AuthContextProducts.Provider value={{ productsData, setProductsData }}>
      {children}
    </AuthContextProducts.Provider>
  )
}

export default AuthProviderProducts;