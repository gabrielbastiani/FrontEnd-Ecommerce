import { createContext, useState } from 'react';

export const AuthContextProducts = createContext({});

function AuthProviderProducts({children}) {
  
  const [productsData, setProductsData] = useState([]);

  return (/* @ts-ignore */
    <AuthContextProducts.Provider value={{ productsData, setProductsData }}>
      {children}
    </AuthContextProducts.Provider>
  )
}

export default AuthProviderProducts;