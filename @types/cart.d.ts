// @types.cart.ts

export type CartDataContextType = {
    store_cart_id: string;
    count: number;
    amount: number;
    product_id: string;
    product: Cart[
        'promotion'
    ];
    photoproducts: Cart[];
    relationattributeproducts: Cart[];
    valueAttribute: Cart[];
    globalDataModel: Cart[];
};