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
    const [idCateg, setIdCatg] = useState("");
    const [categs, setCategs] = useState([]);
    const [subCategs, setSubCategs] = useState([]);
    const [filterInPage, setFilterInPage] = useState([]);
    const [products, setProducts] = useState([]);



    // pega a tag principal que irá receber o menu
    const tree = document.querySelector('nav#tree')

    // recebe toda a arvore de elementos
    const menu = document.createElement('ul')

    const firstLevel = categs.filter(item => !item.parentId)
    const getFirstLis = firstLevel.map(buildTree) // retorno novo array com li's
    getFirstLis.forEach(li => menu.append(li)) // adicionar li's ao menu

    function buildTree(item) {

        // primeiro elemento
        const li = document.createElement('li')
        li.innerHTML = item.name


        const children = categs.filter(child => child.parentId === item.id)

        if (children.length > 0) {

            //adiciona um click para os parents
            /* li.addEventListener('click', event => {
                event.stopPropagation()
                event.target.classList.toggle('open')
            }) */

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



    const dados: any = [];

    subCategs.forEach((item) => {

        const getChild = categs.filter(child => child.parentId === item.id);
        const subName = getChild.map((sub) => { return (<FilterText>{sub.name}</FilterText>) });
        const subSlug = getChild.map(sub => sub.slug || "");
        const subId = getChild.map(sub => sub.id || "");

        const getChild3 = categs.filter(child3 => String(subId) === child3.parentId);
        const subName3 = getChild3.map((sub3) => { return (<FilterText>{sub3.name}</FilterText>) });
        const subSlug3 = getChild3.map(sub3 => sub3.slug || "");
        const subId2 = getChild3.map(sub3 => sub3.id || "");

        const getChild4 = categs.filter(child4 => String(subId2) === child4.parentId);
        const subName4 = getChild4.map((sub4) => { return (<FilterText>{sub4.name}</FilterText>) });
        const subSlug4 = getChild4.map(sub4 => sub4.slug || "");
        const subId3 = getChild4.map(sub4 => sub4.id || "");

        const getChild5 = categs.filter(child5 => String(subId3) === child5.parentId);
        const subName5 = getChild5.map((sub5) => { return (<FilterText>{sub5.name}</FilterText>) });
        const subSlug5 = getChild5.map(sub5 => sub5.slug || "");
        const subId4 = getChild5.map(sub5 => sub5.id || "");

        const getChild6 = categs.filter(child6 => String(subId4) === child6.parentId);
        const subName6 = getChild6.map((sub6) => { return (<FilterText>{sub6.name}</FilterText>) });
        const subSlug6 = getChild6.map(sub6 => sub6.slug || "");
        const subId5 = getChild6.map(sub6 => sub6.id || "");

        const getChild7 = categs.filter(child7 => String(subId5) === child7.parentId);
        const subName7 = getChild7.map((sub7) => { return (<FilterText>{sub7.name}</FilterText>) });
        const subSlug7 = getChild7.map(sub7 => sub7.slug || "");
        const subId6 = getChild7.map(sub7 => sub7.id || "");

        const getChild8 = categs.filter(child8 => String(subId6) === child8.parentId);
        const subName8 = getChild8.map((sub8) => { return (<FilterText>{sub8.name}</FilterText>) });
        const subSlug8 = getChild8.map(sub8 => sub8.slug || "");
        const subId7 = getChild8.map(sub8 => sub8.id || "");

        const getChild9 = categs.filter(child9 => String(subId7) === child9.parentId);
        const subName9 = getChild9.map((sub9) => { return (<FilterText>{sub9.name}</FilterText>) });
        const subSlug9 = getChild9.map(sub9 => sub9.slug || "");
        const subId8 = getChild9.map(sub9 => sub9.id || "");

        const getChild10 = categs.filter(child10 => String(subId8) === child10.parentId);
        const subName10 = getChild10.map((sub10) => { return (<FilterText>{sub10.name}</FilterText>) });
        const subSlug10 = getChild10.map(sub10 => sub10.slug || "");

        dados.push(
            {
                "name": item.name,
                "slug": item.slug,
                "name2": subName,
                "slug2": subSlug,
                "name3": subName3,
                "slug3": subSlug3,
                "name4": subName4,
                "slug4": subSlug4,
                "name5": subName5,
                "slug5": subSlug5,
                "name6": subName6,
                "slug6": subSlug6,
                "name7": subName7,
                "slug7": subSlug7,
                "name8": subName8,
                "slug8": subSlug8,
                "name9": subName9,
                "slug9": subSlug9,
                "name10": subName10,
                "slug10": subSlug10
            }
        )
    });

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
                const response = await apiClient.get(`/listCategorysDisponivel`);

                setCategs(response?.data || []);

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
                const response = await apiClient.get(`/categoriesInPageCategory?parentId=${idCateg}`);

                setSubCategs(response?.data || []);

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
                            {dados.map((item: any) => {
                                return (
                                    <>
                                        <FilterText>{item.name}</FilterText>
                                        <FilterText>{item.name2}</FilterText>
                                        <FilterText>{item.name3}</FilterText>
                                        <FilterText>{item.name4}</FilterText>
                                        <FilterText>{item.name5}</FilterText>
                                        <FilterText>{item.name6}</FilterText>
                                        <FilterText>{item.name7}</FilterText>
                                        <FilterText>{item.name8}</FilterText>
                                        <FilterText>{item.name9}</FilterText>
                                        <FilterText>{item.name10}</FilterText>
                                    </>
                                )
                            })}
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