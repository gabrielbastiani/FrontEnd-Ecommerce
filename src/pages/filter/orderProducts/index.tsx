"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { AuthContextProducts } from "../../../contexts/AuthContextProducts";


export default function OrderProducts() {
    /* @ts-ignore */
    const { productsData } = useContext(AuthContextProducts);

    const searchParams = useSearchParams();
    const params = searchParams.get("sortBy");

    const [orderProducts, setOrderProducts] = useState([]);

    const arrOrder = productsData.map((ids: any) => ids.product_id);
    let paramOrderProducts = '';
    arrOrder && arrOrder.map((item: any) => {
        paramOrderProducts = paramOrderProducts + 'product_id=' + item + '&'
    });
    const productsOrders = '?' + paramOrderProducts;

    useEffect(() => {
        async function loadordersProducts() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/orderProducts?product_id=${productsOrders}&sortBy=${params}`);
                setOrderProducts(data || []);
                
            } catch (error) {
                console.log(error);
            }
        }
        loadordersProducts();
    }, [productsData, productsOrders, params]);


    console.log(orderProducts)



    return (
        <>
            <h1>Order Products Page</h1>
        </>
    )
}