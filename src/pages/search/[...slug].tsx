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
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import styled from "styled-components";
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


/* const ItemWithChevron = ({ header, ...rest }) => (
    <Item
        {...rest}
        header={
            <>
                {header}
            </>
        }
    />
);

const AccordionItem: React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps> = styled(ItemWithChevron)`
    color: ${props => props?.theme?.colors?.black};
    
  .szh-accordion__item {
    color: ${props => props?.theme?.colors?.black};

    &-btn {
      cursor: pointer;
      color: ${props => props?.theme?.colors?.black};
      background-color: transparent;
      border: none;
    }

    &-content {
      color: ${props => props?.theme?.colors?.black};
    }

    &-panel {
      color: ${props => props?.theme?.colors?.black};
    }
  }

  &.szh-accordion__item--expanded {
    color: ${props => props?.theme?.colors?.black};
    .szh-accordion__item-btn {
      color: ${props => props?.theme?.colors?.black};
    }
  }
`; */

export default function Search() {

    const router = useRouter();
    let { slug } = router.query;

    console.log(slug[0])
    

    /* const [categoriesLateral, setCategoriesLateral] = useState([]);
    const [subCategsFilter, setSubCategsFilter] = useState([]);
    const [nameItens, setNameItens] = useState("");

    const [atributosLateral, setAtributosLateral] = useState([]);
    const [valorFilterAtribute, setValorFilterAtribute] = useState([]);

    const [products, setProducts] = useState([]);

    const [filterCAtegory, setFilterCAtegory] = useState("");
    const [filterAtributo, setFilterAtributo] = useState("");


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
                const { data } = await apiClient.get(`/pocisaoListGroup?slugPosition=lateral-esquerda&slugCategory=${slug}`);

                setCategoriesLateral(data?.group || []);

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
                const { data } = await apiClient.get(`/pocisaoListAtributoFiltro?slugCategory=${slug}`);

                setAtributosLateral(data?.group || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadFiltrosAtributos();
    }, [slug]);

    async function load(id: string) {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/listCategoriesGroup?groupId=${id}`);

            setSubCategsFilter(response.data || []);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function loadAtribute(id: string) {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/listGrupoIDAtributoFilter?groupId=${id}`);

            setValorFilterAtribute(response.data || []);

        } catch (error) {
            console.log(error.response.data);
        }
    }

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

    function filterCateg(slug: string) {
        setFilterCAtegory(slug);
    }

    function filterAtrib(slugValor: string) {
        setFilterAtributo(slugValor);
    } */


    return (
        <>
            <h1>Search</h1>
            {/* <Head>
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
                                <Accordion>
                                    {categoriesLateral.map((item) => {
                                        return (
                                            <>
                                                <SectionCategories key={item?.id}>
                                                    <InputCategory
                                                        type="radio"
                                                        value={filterCAtegory}
                                                        name="categs"
                                                        onClick={() => filterCateg(item?.category?.slug)}
                                                    />
                                                    <SmallText>(+)</SmallText>
                                                    <AccordionItem
                                                        key={item?.id}
                                                        onClick={() => load(item?.id)}
                                                        header={item?.categoryName}
                                                        itemKey={item?.id}
                                                    >
                                                    </AccordionItem>
                                                </SectionCategories>
                                            </>
                                        )
                                    })}
                                </Accordion>
                            </>
                        ) :
                            null
                        }

                        <Accordion allowMultiple>
                            {subCategsFilter.length >= 1 && (
                                <SubCategsBlockExtra>
                                    <>
                                        <BoxText>
                                            <SmallText>MAIS CATEGORIAS...</SmallText>
                                        </BoxText>
                                        {subCategsFilter.map((filt) => {
                                            return (
                                                <>
                                                    <SubsCategs key={filt?.id}>
                                                        <InputCategory
                                                            type="radio"
                                                            value={filterCAtegory}
                                                            name="categs"
                                                            onClick={() => filterCateg(filt?.category?.slug)}
                                                        />
                                                        <SmallText>(+)</SmallText>
                                                        <AccordionItem
                                                            key={filt?.id}
                                                            onClick={() => load(filt?.id)}
                                                            header={filt?.categoryName}
                                                            itemKey={filt?.id}
                                                        >
                                                            <InputCategory
                                                                type="radio"
                                                                value={filterCAtegory}
                                                                name="categs"
                                                                onClick={() => filterCateg(filt?.category?.slug)}
                                                            />
                                                        </AccordionItem>
                                                    </SubsCategs>
                                                </>
                                            )
                                        })}
                                    </>
                                </SubCategsBlockExtra>
                            )}
                        </Accordion>
                        <br />
                        {atributosLateral.length >= 1 ? (
                            <>
                                <TextTitle>Atributos:</TextTitle>
                                <SectionBoxAtributes>
                                    <Accordion>
                                        {atributosLateral.map((atr) => {
                                            return (
                                                <>
                                                    <SectionAtributes key={atr?.id}>
                                                        <SmallText>(+)</SmallText>
                                                        <AccordionItem
                                                            key={atr?.id}
                                                            onClick={() => loadAtribute(atr?.id)}
                                                            header={atr?.categoryName}
                                                            itemKey={atr?.id}
                                                        >
                                                            {valorFilterAtribute.map((valu) => {
                                                                return (
                                                                    <>
                                                                        <SubsAtribut key={valu?.id}>
                                                                            <InputCategory
                                                                                type="radio"
                                                                                value={filterAtributo}
                                                                                name="atribut"
                                                                                onClick={() => filterAtrib(valu?.atributo?.slugValor)}
                                                                            />
                                                                            <FilterText>{valu?.atributo?.valor}</FilterText>
                                                                        </SubsAtribut>
                                                                    </>
                                                                )
                                                            })}
                                                        </AccordionItem>
                                                    </SectionAtributes>
                                                </>
                                            )
                                        })}
                                    </Accordion>
                                </SectionBoxAtributes>
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

                        <button>
                            <Link href={`/search/${''}/${''}`} >Aplicar Filtro</Link>
                        </button>

                    </AsideConteiner>

                    <ContentPage>

                        <GridSectionProducts>
                            {products.map((prod) => {
                                return (
                                    <BoxProduct key={prod?.id}>
                                        <Link href={'/produto/' + prod?.product?.slug}>
                                            <Images>
                                                {prod?.photoProduct1 ? (
                                                    <Image src={'http://localhost:3333/files/' + prod?.photoProduct1?.image} width={450} height={300} alt={prod?.product?.name} />
                                                ) :
                                                    <Image src={semimagem} width={450} height={400} alt={prod?.product?.name} />
                                                }
                                            </Images>
                                            <ImagesHover>
                                                {prod?.photoProduct ? (
                                                    <Image src={'http://localhost:3333/files/' + prod?.photoProduct?.image} width={450} height={300} alt={prod?.product?.name} />
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
            <FooterAccount /> */}
        </>
    )
}