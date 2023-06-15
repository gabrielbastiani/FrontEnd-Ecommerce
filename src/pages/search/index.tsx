"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";

export default function SearchPage() {

    const searchParams = useSearchParams();
    const params = searchParams.getAll("q");

    const WEB_URL = 'http://localhost:3001';
    let param = '';
    params && params.map((ele) => {
        param = param + 'q=' + ele + '&'
    });
    const NEW_URL = WEB_URL + '?' + param;
    let url = new URL(NEW_URL);

    const [filtersProducts, setFiltersProducts] = useState([]);


    useEffect(() => {
        async function loadFilters() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/search${url.search}`);

                setFiltersProducts(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadFilters();
    }, [url.search]);


    console.log(filtersProducts.map((item) => {
        return(
            item.product.productcategories.map((pro) => {
                return (
                    pro
                )
            })
        )
    }))



    return (
        <>
            <h1>Search Page</h1>
        </>
    )
}