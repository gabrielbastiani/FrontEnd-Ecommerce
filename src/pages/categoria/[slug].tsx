import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from 'next/router';
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
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [allProductsAttributes, setAllProductsAttributes] = useState([]);

    const arrAttr = allProductsAttributes.map(item => item.typeAttribute);

    const filterObj = {};
    const arrayOb = arrAttr.filter((typ) => {
        return filterObj.hasOwnProperty(typ?.type) ? false : (filterObj[typ?.type] = true)
    });

    const fitertype = arrayOb.filter(att => att?.type ? att?.type : null);

    console.log(fitertype)


    /* const fiterAttrType = allProductsAttributes.filter(att => att.type ? att.type : null);
    const fiterAttrValue = allProductsAttributes.filter(att => att.value ? att.value : null);
    
    const attrsType = Object.keys(fiterAttrType.reduce((acc, atribute) => ({
        ...acc,
        [atribute.type]: true,
    }), {}));

    const attrsValue = Object.keys(fiterAttrValue.reduce((acc, atribute) => ({
        ...acc,
        [atribute.value]: true,
    }), {}));

    const newAttr = new Array();
    newAttr.push({
        "type": attrsType,
        "value": attrsValue
    });

    console.log(newAttr.map((item) => {
        return (
            item.type
        )
    })) */

    const arrayIdAttr = products.map((ids) => ids.product_id);
    let paramAttr = '';
    arrayIdAttr && arrayIdAttr.map((item) => {
        paramAttr = paramAttr + 'product_id=' + item + '&'
    });
    const valueAttr = '?' + paramAttr;

    const filterCategory = () => {
        const WEB_URL = 'http://localhost:3001';
        let param = '';
        filter && filter.map((ele) => {
            param = param + 'q=' + ele + '&'
        });
        const NEW_URL = WEB_URL + '?' + param;
        let url = new URL(NEW_URL);
        let params = new URLSearchParams(url.search);

        Router.push(`/search?${params}`);
    }

    const objectFilter = {};
    const arrayOrigin = allProductsAttributes.filter((valor) => {
        return objectFilter.hasOwnProperty(valor?.type) ? false : (objectFilter[valor?.type] = true)
    });

    const fiterAttrType = arrayOrigin.filter(att => att?.type ? att?.type : null);

    const objectFilterAll = {};
    const arrayOriginAll = allProductsAttributes.filter((valor) => {
        return objectFilterAll.hasOwnProperty(valor?.value) ? false : (objectFilterAll[valor?.value] = true)
    });

    const filterValue = arrayOriginAll.filter(att => att?.value ? att?.value : null);

    const data = fiterAttrType.concat(filterValue);

    /* useEffect(() => {

        const treeAttr = document.querySelector('div#treeAttr');
        const typeAttr = data?.filter(item => !item?.parentId);

        typeAttr?.forEach(item => {
            const ul = document.createElement('ul');
            ul.style.marginBottom = '12px';
            ul.style.fontWeight = 'bold';
            ul.innerHTML = item?.type;

            const children = data?.filter(child => child?.parentId === item?.id);
            children?.forEach(child2 => {

                const valueText = document.createElement('li');
                valueText.style.listStyle = 'none';

                const li = document.createElement('li');
                li.style.marginBottom = '8px';
                li.style.marginTop = '8px';
                li.style.fontWeight = '100';
                li.innerHTML = child2?.value;

                valueText?.appendChild(li);
                ul?.appendChild(valueText);
            });

            treeAttr?.appendChild(ul);

            console.log(treeAttr)

        });

    }, [data]); */

    useEffect(() => {

        const tree = document.querySelector('div#tree');
        const menu = document.createElement('div');

        const firstLevel = subCategs.filter(item => item);
        const getFirstLis = firstLevel.map(buildTree);
        getFirstLis.forEach(label => menu.append(label));

        function buildTree(item: any) {

            const label = document.createElement('label');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = "category";
            checkbox.id = item?.id;
            checkbox.value = item?.slug;
            checkbox.checked;
            checkbox.onclick = (getValue)

            checkbox.style.marginRight = '10px';
            checkbox.style.marginBottom = '10px';

            const textContent = document.createTextNode(`${item?.name}`);

            label.appendChild(checkbox);
            label.appendChild(textContent);

            const children = categs.filter(child => child?.parentId === item?.id);
            const subMenu = document.createElement('div');

            children.map(buildTree)
                .forEach(label => subMenu.appendChild(label))
            label.appendChild(subMenu);

            function getValue() {
                var arr = [];
                var inputElements = document.getElementsByName("category")
                for (var i = 0; inputElements[i]; ++i) {
                    /* @ts-ignore */
                    if (inputElements[i].checked)
                        /* @ts-ignore */
                        arr.push(/* @ts-ignore */
                            inputElements[i].value
                        );/* @ts-ignore */
                }
                setFilter(arr)
                return arr;
            }

            return label;
        }

        tree.appendChild(menu);

    }, [subCategs, categs]);

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
        async function loadAttributesproducts() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/allProductsAndAttributes${valueAttr}`);

                setAllProductsAttributes(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadAttributesproducts();
    }, [valueAttr]);

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

                            <div id="tree"></div>

                        </SubCategsBlockExtra>
                        <br />
                        <TextAtribute>Atributos:</TextAtribute>
                        <SubCategsBlockExtra>

                            {fitertype.map((item) => {
                                return(
                                    <>
                                        <span>{item?.type}</span>
                                        {item?.relationattributeproducts.map((val) => {
                                            return (
                                                <span>{val?.id}</span>
                                            )
                                        })}
                                    </>
                                )
                            })}

                            <div id="treeAttr"></div>

                        </SubCategsBlockExtra>
                        <br />



                        {/* {filterInPage.length
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
                        } */}

                        <TextTitle style={{ fontWeight: 'bold' }}>
                            Preço por:
                        </TextTitle>

                        <input type="range" id="price" name="price" min="0" max="999999999999" />

                        <button
                            onClick={filterCategory}
                        >
                            Buscar
                        </button>

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