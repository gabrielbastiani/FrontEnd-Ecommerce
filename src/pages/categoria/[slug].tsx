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
    Filtros,
    TextFilter,
    SubCategsBlockExtra,
    BoxText,
    TextTitle,
    AtributoText,
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

    const [categoriesLateral, setCategoriesLateral] = useState([]);
    const [nameItens, setNameItens] = useState("");

    const [atributosLateral, setAtributosLateral] = useState([]);

    const [products, setProducts] = useState([]);


    useEffect(() => {
        async function loadSlugDate() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findDateSlugCategory?slug=${slug}`);

                setNameItens(response?.data?.categoryName);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadSlugDate();
    }, [slug]);

    useEffect(() => {
        async function loadGroups() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/pocisaoListGroup?slugPosicao=lateral-esquerda&slugCategoryOrItem=${slug}`);

                setCategoriesLateral(response?.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadGroups();
    }, [slug]);

    useEffect(() => {
        async function loadFiltrosAtributos() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listFilterGroup?slugCategoryOrItem=${slug}`);

                setAtributosLateral(response?.data || []);

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

                        {categoriesLateral.length >= 1 ? (
                            <>
                                <TextTitle>Categorias:</TextTitle>
                                <SubCategsBlockExtra>
                                    {categoriesLateral.map((item) => {
                                        return (
                                            <>

                                            </>
                                        )
                                    })}
                                </SubCategsBlockExtra>
                            </>
                        ) :
                            null
                        }

                        {atributosLateral.length >= 1 ? (
                            <>
                                <TextTitle>Atributos:</TextTitle>
                                <SubCategsBlockExtra>
                                    {atributosLateral.map((atrib) => {
                                        return (
                                            <>
                                                <span>{atrib?.atributoName}</span>
                                                {atrib?.filteratributos.map((item: { valor: string; }) => {
                                                    return (
                                                        <>
                                                            <SubCategsBlockExtra>
                                                                {item?.valor}
                                                            </SubCategsBlockExtra>
                                                        </>
                                                    )
                                                })}
                                            </>
                                        )
                                    })}
                                </SubCategsBlockExtra>
                            </>
                        ) :
                            null
                        }
                        <br />
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
                                                {prod?.photoProduct1 ? (
                                                    <Image src={'http://localhost:3333/files/' + prod?.photoProduct1?.photo} width={450} height={300} alt={prod?.product?.nameProduct} />
                                                ) :
                                                    <Image src={semimagem} width={450} height={400} alt={prod?.product?.nameProduct} />
                                                }
                                            </Images>
                                            <ImagesHover>
                                                {prod?.photoProduct ? (
                                                    <Image src={'http://localhost:3333/files/' + prod?.photoProduct?.photo} width={450} height={300} alt={prod?.product?.nameProduct} />
                                                ) :
                                                    <Image src={semimagem} width={450} height={400} alt={prod?.product?.nameProduct} />
                                                }
                                            </ImagesHover>
                                        </Link>
                                        <Info>
                                            <Link href={'/produto/' + prod?.product?.slug}>
                                                <Name>{prod?.product?.nameProduct}</Name>
                                                <OldPrice>De {prod?.product?.promocao.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</OldPrice>
                                                <Price>Por {prod?.product?.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Price>
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