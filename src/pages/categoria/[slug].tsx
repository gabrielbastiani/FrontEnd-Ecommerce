import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import {
    AsideConteiner,
    Boxbreadcrumbs,
    Bread,
    ContainerContent,
    ContentPage,
    PageSection
} from "../../components/dateStoreUx/styles";
import { HeaderStore } from "../../components/HeaderStore";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";
import { IoIosHome } from 'react-icons/io';
import { BsFillFilterSquareFill } from 'react-icons/bs';
import Link from "next/link";
import {
    InputCategory,
    SectionCategories,
    SmallText,
    SubsCategs,
    TypeAtribute,
    Filtros,
    TextFilter,
    SubCategsBlockExtra,
    BoxText,
    TextTitle,
    TextAtribute,
    FilterText,
    SectionAtributes,
    SectionBoxAtributes,
    SubsAtribut,
    GridSectionProducts,
    BoxProduct,
    Info,
    Name,
    OldPrice,
    Price,
    BoxBuy,
    Quantidade,
    Min,
    ValueQuant,
    Max,
    Add,
    Images,
    ImagesHover
} from "./styles";
import Image from "next/image";
import semimagem from '../../assets/semfoto.png';
import { AiOutlineShoppingCart } from "react-icons/ai";


export default function Categoria() {

    const router = useRouter();
    let slug = router.query.slug;

    const [nameItens, setNameItens] = useState("");

    const [filterInPage, setFilterInPage] = useState([]);

    const [products, setProducts] = useState([]);


    useEffect(() => {
        async function loadSlugDate() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findDateSlugCategory?slug=${slug}`);

                setNameItens(response?.data?.name);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadSlugDate();
    }, [slug]);

    useEffect(() => {
        async function loadFiltrosAtributos() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listFilterGroup?slugCategory=${slug}`);

                setFilterInPage(response?.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadFiltrosAtributos();
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



    return (
        <>
            <Head>
                <title>{nameItens}</title>
            </Head>

            <HeaderStore />

            <PageSection>
                <Bread>
                    <Boxbreadcrumbs>
                        <Link href="http://localhost:3001">
                            <IoIosHome size={22} color="red" /> / &nbsp;
                        </Link>
                        <Link href={"http://localhost:3001/categoria/" + slug}>
                            {nameItens}
                        </Link>
                    </Boxbreadcrumbs>
                </Bread>
                <ContainerContent>
                    <AsideConteiner>

                        <Filtros>
                            <BsFillFilterSquareFill size={22} />&nbsp;&nbsp;
                            <TextFilter>Filtrar por:</TextFilter>
                        </Filtros>

                        {filterInPage.length < 1 ? (
                            null
                        ) :
                            <>
                                <TextAtribute>Categorias:</TextAtribute>
                                <SubCategsBlockExtra>
                                    {filterInPage.map((item) => {
                                        return (
                                            <>
                                                {item.filtercategories.map((val: any) => {
                                                    return (
                                                        <FilterText>{val?.name}</FilterText>
                                                    )
                                                })}
                                            </>
                                        )
                                    })}
                                </SubCategsBlockExtra>
                                <br />
                            </>
                        }

                        {filterInPage.length < 1 ? (
                            null
                        ) :
                            <>
                                <TextAtribute>Atributos:</TextAtribute>
                                <SubCategsBlockExtra>
                                    {filterInPage.map((item) => {
                                        return (
                                            <>
                                                <TypeAtribute>{item?.type}</TypeAtribute>
                                                {item.filterattributes.map((val: any) => {
                                                    return (
                                                        <FilterText>{val?.value}</FilterText>
                                                    )
                                                })}
                                            </>
                                        )
                                    })}
                                </SubCategsBlockExtra>
                                <br />
                            </>
                        }

                        <TextTitle
                            style={{ fontWeight: 'bold' }}
                        >
                            Preço por:
                        </TextTitle>

                        <input
                            type="range"
                            id="price"
                            name="price"
                            min="0"
                            max="999999999999"
                        />

                    </AsideConteiner>

                    <ContentPage>

                        <GridSectionProducts>
                            {products.map((prod) => {
                                return (
                                    <BoxProduct key={prod?.id}>
                                        <Link href={'/produto/' + prod?.product?.slug}>
                                            <Images>
                                                {prod?.product?.photoproducts[0] ? (
                                                    <Image src={'http://localhost:3333/files/' + prod?.product?.photoproducts[0]?.image} width={450} height={300} alt={prod?.product?.name} />
                                                ) :
                                                    <Image src={semimagem} width={450} height={400} alt={prod?.product?.name} />
                                                }
                                            </Images>
                                            <ImagesHover>
                                                {prod?.product?.photoproducts[1] ? (
                                                    <Image src={'http://localhost:3333/files/' + prod?.product?.photoproducts[1]?.image} width={450} height={300} alt={prod?.product?.name} />
                                                ) :
                                                    <Image src={semimagem} width={450} height={400} alt={prod?.product?.name} />
                                                }
                                            </ImagesHover>
                                        </Link>
                                        <Info>
                                            <Link href={'/produto/' + prod?.product?.slug}>
                                                <Name>{prod?.product?.name}</Name>
                                                <OldPrice>De {prod?.product?.promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</OldPrice>
                                                <Price>Por {prod?.product?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Price>
                                            </Link>
                                            <BoxBuy>
                                                <Quantidade>
                                                    <Min>-</Min>
                                                    <ValueQuant>1</ValueQuant>
                                                    <Max>+</Max>
                                                </Quantidade>
                                                <Add>
                                                    <AiOutlineShoppingCart color='white' size={25} />
                                                    &emsp;Adicionar
                                                </Add>
                                            </BoxBuy>
                                        </Info>
                                    </BoxProduct>
                                )
                            })}
                        </GridSectionProducts>
                    </ContentPage>
                </ContainerContent>
            </PageSection>
            <FooterStore />
            <FooterAccount />
        </>
    )
}