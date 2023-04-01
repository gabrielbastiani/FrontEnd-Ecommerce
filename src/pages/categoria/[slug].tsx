import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { setupAPIClient } from "../../services/api";
import { HeaderStore } from "../../components/HeaderStore";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";


export default function Categoria() {

    const router = useRouter();
    let slug = router.query.slug;

    const [products, setProducts] = useState([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function loadCateroysProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/exactCategoryProducts?slug=${currentPage}&limit=${limit}&slug=${slug}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setProducts(data.categorys || []);

            } catch (error) {
                console.error(error);
            }
        }
        loadCateroysProducts();
    }, [slug, currentPage, limit, total]);

    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    

    return (
        <>
            <HeaderStore />



            <FooterStore />
            <FooterAccount />
        </>
    )
}