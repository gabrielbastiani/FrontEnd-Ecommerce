import { useEffect, useState } from "react";
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
    const [idCateg, setIdCatg] = useState("");
    const [categs, setCategs] = useState([]);
    const [subCategs, setSubCategs] = useState([]);
    const [filterInPage, setFilterInPage] = useState([]);
    const [products, setProducts] = useState([]);
    

    useEffect(() => {

        {/* <style jsx>{`
            nav#tree {
                margin-top: 45px;
                max-width: 300px;
            }

            nav#tree ul {
                padding-left: 16px;
            }

            nav#tree li {
                list-style: none;
                margin-top: 2px;
            }

            nav#tree li.has-children {
                cursor: pointer;
                position: relative;
            }

            nav#tree li.has-children:before {
                content: '\f107';
                color: #F3F3F4;
                position: absolute;
                font-family: FontAwesome;
                font-size: 26px;
                right: 15px;
            }

            li > ul {
                display: none;
            }

            li.open > ul {
                display: block;
            }
        `}</style> */}

        // pega a tag principal que irá receber o menu
        const tree = document.querySelector('nav#tree')

        // recebe toda a arvore de elementos
        const menu = document.createElement('ul')

        const firstLevel = categs.filter(item => !item.parent)
        const getFirstLis = firstLevel.map(buildTree) // retorno novo array com li's
        getFirstLis.forEach(li => menu.append(li)) // adicionar li's ao menu


        function buildTree(item: any) {

            // primeiro elemento
            const li = document.createElement('li')
            li.style.listStyle = 'none'
            li.innerHTML = item.name

            const children = categs.filter(child => child.parent === item.id)

            if (children.length > 0) {

                //adiciona um click para os parents
                li.addEventListener('click', event => {
                    event.stopPropagation()/* @ts-ignore */
                    event.target.classList.toggle('open')
                })

                // adiciona uma classe identificadora de que tem filhos
                li.classList.add('has-children')

                // constroi os filhos
                const subMenu = document.createElement('ul')
                children.map(buildTree)
                    .forEach(li => subMenu.append(li))
                li.append(subMenu)
            }

            // adicionar os elements ao menu
            return li
        }

        // adiciona o menu no HTML
        tree.append(menu)

    }, [categs]);

    useEffect(() => {
        async function loadSlugDate() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findDateSlugCategory?slug=${slug}`);

                setNameItens(response?.data?.name);
                setIdCatg(response?.data?.id);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadSlugDate();
    }, [slug]);

    useEffect(() => {
        async function loadCategs() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/listCategorysDisponivel`);

                setCategs(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadCategs();
    }, []);

    useEffect(() => {
        async function loadSubCategs() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/categoriesInPageCategory?parentId=${idCateg}`);

                setSubCategs(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadSubCategs();
    }, [idCateg]);

    useEffect(() => {
        async function loadFilters() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listFilterGroup?slugCategory=${slug}`);

                setFilterInPage(response?.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadFilters();
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
            <style jsx>{`
            nav#tree {
                margin-top: 45px;
                max-width: 300px;
            }

            nav#tree ul {
                padding-left: 16px;
            }

            nav#tree li {
                list-style: none;
                margin-top: 2px;
            }

            nav#tree li.has-children {
                cursor: pointer;
                position: relative;
            }

            /* nav#tree li.has-children:before {
                content: '\f107';
                color: #F3F3F4;
                position: absolute;
                font-family: FontAwesome;
                font-size: 26px;
                right: 15px;
            } */

            li > ul {
                display: none;
            }

            li.open > ul {
                display: block;
            }
        `}</style>

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

                        <TextAtribute>Categorias:</TextAtribute>
                        <SubCategsBlockExtra>

                            <nav id="tree"></nav>

                        </SubCategsBlockExtra>

                        {filterInPage.length

                            < 1 ? (null) : <>
                            <TextAtribute>Atributos:</TextAtribute>
                            <SubCategsBlockExtra>
                                {filterInPage.map((item) => {
                                    return (

                                        <>
                                            <TypeAtribute key={item?.id}>{item?.type}</TypeAtribute>
                                            {item.filterattributes.map((val: any) => {
                                                return (
                                                    <FilterText>
                                                        {val?.value}
                                                    </FilterText>
                                                )
                                            })}
                                        </>
                                    )
                                })}
                            </SubCategsBlockExtra>
                            <br />
                        </>
                        }

                        <TextTitle style={{ fontWeight: 'bold' }}>
                            Preço por:
                        </TextTitle>

                        <input type="range" id="price" name="price" min="0" max="999999999999" />

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