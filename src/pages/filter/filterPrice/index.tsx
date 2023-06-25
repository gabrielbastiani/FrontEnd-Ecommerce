"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";

export default function FilterPricePage() {

    const searchParams = useSearchParams();
    const arrPriceMin = searchParams.get("priceMin");
    const arrPriceMax = searchParams.get("priceMax");

    var prices = []
    prices.push({
        "priceMin": arrPriceMin,
        "priceMax": arrPriceMax
    })

    const WEB_URL = 'http://localhost:3001';
    let paramPrice = '';
    prices && prices.map((ele) => {
            paramPrice = paramPrice + 'priceMin=' + ele.priceMin + '&' + 'priceMax=' + ele.priceMax
        });
    const NEW_URL = WEB_URL + '?' + paramPrice;
    let url = new URL(NEW_URL);

    const [filtersProducts, setFiltersProducts] = useState([]);


    useEffect(() => {
        async function loadFilters() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/filterPrice${url.search}`);

                setFiltersProducts(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadFilters();
    }, [url.search]);


    console.log(filtersProducts)



    return (
        <>
            <h1>Filter Price Page</h1>
        </>
    )
}