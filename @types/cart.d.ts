// @types.cart.ts

export type CartDataContextType = {
    count: number;
    amount: number;
    product_id: string;
    product: Cart[];
    photoproducts: Cart[];
    relationattributeproducts: Cart[];
    valueAttribute: Cart[];
    globalDataModel: Cart[];
};