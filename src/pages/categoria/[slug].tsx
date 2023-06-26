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
    InputAttribute,
    TypeAtribute,
    Filtros,
    TextFilter,
    SubCategsBlockExtra,
    TextTitle,
    TextAtribute,
    FilterText,
    SectionAtributes,
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
    ImagesHover,
    ButtonFilter,
    EtiquetaPrice,
    RangeInput
} from "./styles";
import Image from "next/image";
import semimagem from '../../assets/semfoto.png';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";


export default function Categoria() {

    const router = useRouter();
    let slug = router.query.slug;

    const [groupName, setGroupName] = useState("");
    const [nameItens, setNameItens] = useState("");
    const [idCateg, setIdCatg] = useState("");
    const [idParent, setIdParent] = useState("");
    const [categs, setCategs] = useState([]);
    const [subCategs, setSubCategs] = useState([]);
    const [allCategoriesMenu, setAllCategoriesMenu] = useState([]);
    const [brandCrumb, setBrandCrumb] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [priceValueMin, setPriceValueMin] = useState(maxPrice);
    const [priceValueMax, setPriceValueMax] = useState(maxPrice);
    const [allProductsAttributes, setAllProductsAttributes] = useState([]);



    const filterObj = {};
    const arrayOb = allProductsAttributes.filter((typ) => {
        return filterObj.hasOwnProperty(typ?.type) ? false : (filterObj[typ?.type] = true)
    });

    const arrayIdAttr = products.map((ids) => ids.product_id);
    let paramAttr = '';
    arrayIdAttr && arrayIdAttr.map((item) => {
        paramAttr = paramAttr + 'product_id=' + item + '&'
    });
    const valueAttr = '?' + paramAttr;

    const filterAll = () => {
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


    useEffect(() => {
        /* console.log("Nome do Grupo: ", groupName);
        console.log("brandCrumb: ", brandCrumb);
        console.log("ID categoria atual: ", idCateg);
        console.log("ID parent ID atual: ", idParent); */

        const treeCrumb = document.querySelector('div#treeCrumb');

        const crumbs = document.createElement('span');

        const brand = brandCrumb.filter(item => item);
        
        
        crumbs.append()

    },[allCategoriesMenu, brandCrumb, idCateg, nameItens]);

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
            checkbox.name = "filter";
            checkbox.id = item?.id;
            checkbox.value = item?.slug;
            checkbox.checked;
            checkbox.onclick = (getValue);

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
            return label;
        }

        tree.appendChild(menu);

    }, [subCategs, categs]);

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

    var arrPrice = [];
    arrPrice.push({
        "priceMin": priceValueMin,
        "priceMax": priceValueMax
    });

    const filterPrices = () => {
        const WEB_URL = 'http://localhost:3001';
        let paramPrice = '';
        const verifyArrMin: any = arrPrice.map(ver => ver?.priceMin);
        const verifyArrMax: any = arrPrice.map(ver => ver?.priceMax);

        if (Number(verifyArrMin) < Number(verifyArrMax)) {
            arrPrice && arrPrice.map((ele) => {
                paramPrice = paramPrice + 'priceMin=' + ele?.priceMin + '&' + 'priceMax=' + ele?.priceMax
            });
        } else {
            return toast.error("O valor do preço minimo não pode ser maior que o valor do preço máximo!!!");
        }

        const NEW_URL = WEB_URL + '?' + paramPrice;
        let urlPrice = new URL(NEW_URL);
        let params = new URLSearchParams(urlPrice.search);

        Router.push(`/filter/filterPrice?${params}`);
    }

    const maxPriceVAlu = products.map(item => item?.product?.price);

    var minPrice = Math.min(...maxPriceVAlu);
    var maxPrice = Math.max(...maxPriceVAlu);

    const changePriceMin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceValueMin(parseInt(event.target.value));
    };

    const changePriceMax = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceValueMax(parseInt(event.target.value));
    };

    const formatter = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });

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
        async function allCategoriesMenus() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/listMenuCategories`);

                setAllCategoriesMenu(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        allCategoriesMenus();
    }, []);

    useEffect(() => {
        async function loadBrandCrumb() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/categoriesParentIdBradCrumb?parentId=${idCateg}`);

                setBrandCrumb(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadBrandCrumb();
    }, [idCateg]);

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
                        {/* <Link href={"http://localhost:3001/categoria/" + slug}>
                            {nameItens}
                        </Link> */}

                        <div id="treeCrumb"></div>

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
                        {arrayOb.length < 1 ? (
                            null
                        ) :
                            <>
                                <TextAtribute>Atributos:</TextAtribute>
                                <SubCategsBlockExtra>
                                    {arrayOb.map((item) => {
                                        return (

                                            <>
                                                <TypeAtribute>{item?.typeAttribute?.type}</TypeAtribute>
                                                {item?.typeAttribute?.valueattribute.map((val: any) => {
                                                    return (

                                                        <>
                                                            {val?.RelationAttributeProduct.map((rel: any) => {
                                                                return (

                                                                    <>
                                                                        <SectionAtributes>
                                                                            <InputAttribute type='checkbox' name="filter" id={rel?.valueAttribute?.id} value={rel?.valueAttribute?.slug} onClick={getValueAttr} />
                                                                            <FilterText>{rel?.valueAttribute?.value}</FilterText>
                                                                        </SectionAtributes>
                                                                    </>
                                                                )
                                                            })}
                                                        </>
                                                    )
                                                })}
                                            </>
                                        )
                                    })}
                                </SubCategsBlockExtra>
                            </>
                        }
                        <br />
                        <ButtonFilter onClick={filterAll}>
                            Buscar
                        </ButtonFilter>
                        <br />
                        <br />
                        <TextTitle style={{ fontWeight: 'bold' }}>
                            Preço por:
                        </TextTitle>
                        <br />
                        <EtiquetaPrice>
                            Minimo:
                            <RangeInput
                                type='range'
                                onChange={changePriceMin}
                                min={minPrice}
                                max={maxPrice}
                                step={1}
                                value={priceValueMin}
                                defaultValue={0}
                            />
                            {priceValueMin ? formatter.format(priceValueMin) : String(minPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))}
                        </EtiquetaPrice>
                        <br />
                        <EtiquetaPrice>
                            Máximo:
                            <RangeInput
                                type='range'
                                onChange={changePriceMax}
                                min={minPrice}
                                max={maxPrice}
                                step={1}
                                value={priceValueMax}
                                defaultValue={9999999999999999999999}
                            />
                            {priceValueMax ? formatter.format(priceValueMax) : String(maxPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))}
                        </EtiquetaPrice>
                        <br />
                        <ButtonFilter onClick={filterPrices}>
                            Filtrar Preços
                        </ButtonFilter>
                        <br />
                        <br />
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