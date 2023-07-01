import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from 'react-modal';
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
import { BsFillFilterSquareFill, BsFilterSquare } from 'react-icons/bs';
import {
    Filtros,
    TextFilter,
    ButtonFilter,
    ButtonFilterMobile
} from "./styles";
import CategoriasFilter from "../../components/CategoriasFilter";
import AtributosFilter from "../../components/AtributosFilter";
import Breadcrumbs from "../../components/Breadcrumbs";
import FiltroPreco from "../../components/FiltroPreco";
import ProdutosNaCategoria from "../../components/ProdutosNaCategoria";
import BannersCategoria from "../../components/BannersCategoria";
import OrdenarProdutos from "../../components/OrdenarProdutos";
import { AuthContextProducts } from "../../contexts/AuthContextProducts";
import { ModalFilter } from "../../components/popups/ModalFilter";


export type FiltersItens = {
    slug: string;
}

export default function Categoria() {

    const router = useRouter();
    let slug = router.query.slug as string;

    const [groupName, setGroupName] = useState("");
    const [nameItens, setNameItens] = useState("");
    const [idCateg, setIdCatg] = useState("");
    const [idParent, setIdParent] = useState("");
    const [allProductsCategory, setAllProductsCategory] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit] = useState(2);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [modalVisible, setModalVisible] = useState(false);


    function filterAll() {
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
        async function loadAllProductsCategory() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/getAllProductsCategory?slug=${slug}`);

                setAllProductsCategory(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadAllProductsCategory();
    }, [slug]);

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/productsPageCategories?page=${currentPage}&limit=${limit}&slug=${slug}`);

                setTotal(data?.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setProducts(data?.productsCategories || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadProducts();
    }, [currentPage, limit, total, slug]);

    const { setProductsData } = useContext(AuthContextProducts);
    let data = allProductsCategory;
    setProductsData(data);

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete() {
        setModalVisible(true);
    }

    Modal.setAppElement('#__next');



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
                            products={allProductsCategory}
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
                            products={allProductsCategory}
                        />
                        <br />
                        <br />
                    </AsideConteiner>

                    <ContentPage>

                        <BannersCategoria
                            slug={slug}
                        />

                        <OrdenarProdutos
                            total={total}
                        />

                        <ProdutosNaCategoria
                            products={products}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pages={pages}
                        />

                    </ContentPage>
                </ContainerContent>
            </PageSection>
            <FooterStore />
            <FooterAccount />
            {modalVisible ? (
                <ModalFilter
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    filters={slug}
                />
            ) :
                <ButtonFilterMobile
                    onClick={handleOpenModalDelete}
                >
                    <BsFilterSquare size={25} />&nbsp;&nbsp;
                    <TextFilter>FILTRAR</TextFilter>
                </ButtonFilterMobile>
            }
        </>
    )
}