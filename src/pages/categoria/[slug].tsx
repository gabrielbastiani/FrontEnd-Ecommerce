import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from 'next/router';
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import {
    AsideConteiner,
    ContainerContent,
    ContentPage,
    PageSection
} from "../../components/dateStoreUx/styles";
import { HeaderStore } from "../../components/HeaderStore";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";
import { BsFillFilterSquareFill } from 'react-icons/bs';
import {
    Filtros,
    TextFilter,
    ButtonFilter
} from "./styles";
import CategoriasFilter from "../../components/CategoriasFilter";
import AtributosFilter from "../../components/AtributosFilter";
import Breadcrumbs from "../../components/Breadcrumbs";
import FiltroPreco from "../../components/FiltroPreco";
import ProdutosNaCategoria from "../../components/ProdutosNaCategoria";
import BannersCategoria from "../../components/BannersCategoria";
import OrdenarProdutos from "../../components/OrdenarProdutos";
import { AuthContextProducts } from "../../contexts/AuthContextProducts";



export default function Categoria() {

    const router = useRouter();
    let slug = router.query.slug as string;

    const [groupName, setGroupName] = useState("");
    const [nameItens, setNameItens] = useState("");
    const [idCateg, setIdCatg] = useState("");
    const [idParent, setIdParent] = useState("");
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);


    const filterAll = () => {
        const WEB_URL = 'http://localhost:3001';
        let param = '';
        filter && filter.map((ele) => {
            param = param + 'q=' + ele + '&'
        });
        const NEW_URL = WEB_URL + '?' + param;
        let url = new URL(NEW_URL);
        let params = new URLSearchParams(url.search);

        Router.push(`/filter?${params}`);
    }

    function getValueCateg() {
        var arr = [];
        var inputElements = document.getElementsByName("filter");
        for (var i = 0; inputElements[i]; ++i) {
            /* @ts-ignore */
            if (inputElements[i].checked)
                /* @ts-ignore */
                arr.push(/* @ts-ignore */
                    inputElements[i].value
                );
        }
        setFilter(arr);
        return arr;
    }

    function getValueAttr() {
        var arr = [];
        var inputElements = document.getElementsByName("filter");
        for (var i = 0; inputElements[i]; ++i) {
            /* @ts-ignore */
            if (inputElements[i].checked)
                /* @ts-ignore */
                arr.push(/* @ts-ignore */
                    inputElements[i].value
                );
        }
        setFilter(arr);
        return arr;
    }

    useEffect(() => {
        async function loadSlugDate() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findDateSlugCategory?slug=${slug}`);

                setNameItens(data?.name);
                setIdCatg(data?.id);
                setIdParent(data?.parentId);
                setGroupName(data?.menucategories[0]?.nameGroup);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadSlugDate();
    }, [slug]);

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/productsPageCategories?slug=${slug}`);

                setProducts(response.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadProducts();
    }, [slug]);

    /* @ts-ignore */
    const { setProductsData } = useContext(AuthContextProducts);
    
    let data = products;

    setProductsData(data);


    return (
        <>
            <Head>
                <title>{nameItens}</title>
            </Head>

            <HeaderStore />

            <PageSection>

                <Breadcrumbs
                    idParent={idParent}
                    idCateg={idCateg}
                    groupName={groupName}
                    nameItens={nameItens}
                />

                <ContainerContent>
                    <AsideConteiner>
                        <Filtros>
                            <BsFillFilterSquareFill size={22} />&nbsp;&nbsp;
                            <TextFilter>Filtrar por:</TextFilter>
                        </Filtros>

                        <CategoriasFilter
                            idCateg={idCateg}
                            onClick={getValueCateg}
                        />
                        <br />
                        <AtributosFilter
                            products={products}
                            onClick={getValueAttr}
                        />
                        <br />
                        <ButtonFilter
                            onClick={filterAll}
                        >
                            Buscar
                        </ButtonFilter>
                        <br />
                        <br />
                        <FiltroPreco
                            products={products}
                        />
                        <br />
                        <br />
                    </AsideConteiner>

                    <ContentPage>

                        <BannersCategoria
                            slug={slug}
                        />

                        <OrdenarProdutos />

                        <ProdutosNaCategoria
                            products={products}
                        />

                    </ContentPage>
                </ContainerContent>
            </PageSection>
            <FooterStore />
            <FooterAccount />
        </>
    )
}