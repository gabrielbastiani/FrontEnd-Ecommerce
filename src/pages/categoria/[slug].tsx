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
import { InputCategory, SectionCategories, SmallText, SubsCategs, Filtros, TextFilter, SubCategsBlockExtra, BoxText, TextTitle } from "./styles";


const ItemWithChevron = ({ header, ...rest }) => (
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
`;

export default function Categoria() {

    const router = useRouter();
    let slug = router.query.slug;

    const [categoriesLateral, setCategoriesLateral] = useState([]);
    const [subCategsFilter, setSubCategsFilter] = useState([]);
    const [nameItens, setNameItens] = useState("");

    const [atributosLateral, setAtributosLateral] = useState([]);
    const [atributoName, setAtributoName] = useState("");

    const [filterCAtegory, setFilterCAtegory] = useState("");

    console.log(atributosLateral.map((atr) => {
        return (
            atr
        )
    }))

    useEffect(() => {
        async function loadGroups() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/pocisaoListGroup?slugPosicao=lateral-esquerda&slugCategoryOrItem=${slug}`);

                setCategoriesLateral(data?.group || []);
                setNameItens(data?.dados?.categoryName);

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
                const { data } = await apiClient.get(`/pocisaoListAtributoFiltro?slugCategoryOrItem=${slug}`);

                setAtributosLateral(data?.group || []);
                setAtributoName(data?.dados?.categoryName);

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

    function filterCateg(slug: string) {
        setFilterCAtegory(slug)
    }




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
                                <Accordion>
                                    {categoriesLateral.map((item) => {
                                        return (
                                            <>
                                                <SectionCategories>
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
                                                        header={item?.itemName}
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
                                                    <SubsCategs>
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
                                                            header={filt?.itemName}
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


                    </AsideConteiner>

                    <ContentPage>
                        content
                    </ContentPage>
                </ContainerContent>
            </PageSection>

            <FooterStore />
            <FooterAccount />
        </>
    )
}