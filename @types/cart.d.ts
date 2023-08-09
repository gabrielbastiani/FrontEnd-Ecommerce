// @types.cart.ts

export type CartDataContextType = {
    count: number;
    width: number;
    height: number;
    depth: number;
    weight: number;
    price: number;
    amount: number;
    id: string;
    price: ReactNode;
    amount: ReactNode;
    relationattributeproducts: any;
    image: any;
    name: ReactNode;
    globalDataModel: Cart[];
};