"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import Modal from 'react-modal';
import { ButtonFilter, ButtonFilterMobile, Filtros, TextFilter } from "../categoria/styles";
import { BsFillFilterSquareFill, BsFilterSquare } from "react-icons/bs";
import FooterAccount from "../../components/FooterAccount";
import { FooterStore } from "../../components/FooterStore";
import { AsideConteiner, ContainerContent, ContentPage, PageSection } from "../../components/dateStoreUx/styles";
import OrdenarProdutos from "../../components/OrdenarProdutos";
import BannersCategoria from "../../components/BannersCategoria";
import AtributosFilter from "../../components/AtributosFilter";
import CategoriasFilter from "../../components/CategoriasFilter";
import { HeaderStore } from "../../components/HeaderStore";
import Router from "next/router";
import { ModalFilter } from "../../components/popups/ModalFilter";
import { AuthContextProducts } from "../../contexts/AuthContextProducts";
import ProdutosNoFiltro from "../../components/ProdutosNoFiltro";
import FiltroPagePreco from "../../components/FiltroPagePreco";


export default function FilterPage() {

    const searchParams = useSearchParams();
    const params = searchParams.getAll("q");

    const [total, setTotal] = useState(0);
    const [limit] = useState(2);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter] = useState<any[]>([]);

    const WEB_URL = 'http://localhost:3001';
    let param = '';
    params && params.map((ele) => {
        param = param + 'q=' + ele + '&'
    });
    const NEW_URL = WEB_URL + '?' + param;
    let url = new URL(NEW_URL);

    const [filtersProducts, setFiltersProducts] = useState<any[]>([]);


    useEffect(() => {
        async function loadFilters() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/filter${url.search}page=${currentPage}&limit=${limit}`);

                setTotal(data?.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setFiltersProducts(data?.dadosProducts || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadFilters();
    }, [url.search]);

    console.log(filtersProducts)

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

    const { setProductsData } = useContext(AuthContextProducts);
    let data = filtersProducts;
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
            <HeaderStore />

            <PageSection>
                <ContainerContent>
                    <AsideConteiner>
                        <Filtros>
                            <BsFillFilterSquareFill size={22} />&nbsp;&nbsp;
                            <TextFilter>Filtrar por:</TextFilter>
                        </Filtros>

                        {/* <CategoriasFilter
                            idCateg={idCateg}
                            onClick={getValueCateg}
                        /> */}
                        <br />
                        <AtributosFilter
                            products={filtersProducts}
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
                        <FiltroPagePreco
                            products={filtersProducts}
                        />
                        <br />
                        <br />
                    </AsideConteiner>

                    <ContentPage>

                        <BannersCategoria
                            slug={"banner-paginas-categorias"}
                        />

                        <OrdenarProdutos
                            total={total}
                        />

                        <ProdutosNoFiltro
                            products={filtersProducts}
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