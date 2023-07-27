"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { setupAPIClient } from "../../../services/api";
import { AuthContextProducts } from "../../../contexts/AuthContextProducts";
import Router from "next/router";
import { HeaderStore } from "../../../components/HeaderStore";
import { AsideConteiner, ContainerContent, ContentPage, PageSection } from "../../../components/dateStoreUx/styles";
import { ButtonFilter, ButtonFilterMobile, Filtros, TextFilter } from "../../categoria/styles";
import { BsFillFilterSquareFill, BsFilterSquare } from "react-icons/bs";
import CategoriasFilterFilter from "../../../components/CategoriasFilter/CategoriasFilterFilter";
import BannersCategoria from "../../../components/BannersCategoria";
import OrdenarProdutos from "../../../components/OrdenarProdutos";
import ProdutosNoFiltro from "../../../components/ProdutosNoFiltro";
import { FooterStore } from "../../../components/FooterStore";
import FooterAccount from "../../../components/FooterAccount";
import { ModalFilterFilter } from "../../../components/popups/ModalFilter/ModalFilterFilter";
import FiltroPreco from "../../../components/FiltroPreco";
import AtributosFilter from "../../../components/AtributosFilter";


export default function OrderProducts() {

    const { productsData } = useContext(AuthContextProducts);

    const searchParams = useSearchParams();
    const params = searchParams.get("sortBy");

    const arrOrder = productsData.map((ids: any) => ids?.product_id);
    let paramOrderProducts = '';
    arrOrder && arrOrder.map((item: any) => {
        paramOrderProducts = paramOrderProducts + 'product_id=' + item + '&'
    });
    const productsOrders = '?' + paramOrderProducts;

    const [total, setTotal] = useState(0);
    const [limit] = useState(20);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter] = useState<any[]>([]);

    const [orderProducts, setOrderProducts] = useState<any[]>([]);

    useEffect(() => {
        async function loadordersProducts() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/orderProducts${productsOrders}sortBy=${params}&limit=${limit}&page=${currentPage}`);

                setTotal(data?.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setOrderProducts(data?.ordersProducts || []);

            } catch (error) {
                console.log(error);
            }
        }
        loadordersProducts();
    }, [productsOrders, params, currentPage, limit]);

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
            <br />
            <br />
            <PageSection>
                <ContainerContent>
                    <AsideConteiner>
                        <Filtros>
                            <BsFillFilterSquareFill size={22} />&nbsp;&nbsp;
                            <TextFilter>Filtrar por:</TextFilter>
                        </Filtros>

                        <CategoriasFilterFilter
                            onClick={getValueCateg}
                        />
                        <br />
                        <AtributosFilter
                            products={productsData}
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
                            products={productsData}
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
                            products={orderProducts}
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
                <ModalFilterFilter
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    productsFilter={orderProducts}
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