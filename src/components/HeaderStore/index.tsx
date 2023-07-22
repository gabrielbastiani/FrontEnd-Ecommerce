import Image from 'next/image';
import noImage from '../../assets/semfoto.png';
import {
    ContainerHeaderStore,
    ContentHeaderStore,
    BlockLogo,
    BlockItems,
    CategorysHeader,
    StyledUl,
    StyledLi,
    StyledA,
    DropDownLi,
    DropDownContent,
    TextContent,
    BlockContact,
    TitleContac,
    ButtonContact,
    ButtonAtentimento,
    FontStrong,
    SmallText,
    DataResult,
    ListItems,
    CategorysHeaderMobile,
    Categ,
    BoxProductSearch,
    LinkRoute
} from './styles';
import PesquisaHeaderStore from './PesquisaHeaderStore';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { setupAPIClient } from '../../services/api';
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import styled from "styled-components";
import chevronDown from "../../assets/chevron-down.svg";


const ItemWithChevron = ({ header, ...rest }) => (
    <Item
        {...rest}
        header={
            <>
                {header}
                <Image className="chevron-down" src={chevronDown} width={18} height={18} alt="Chevron Down" />
            </>
        }
    />
);

const AccordionItem: React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps> = styled(ItemWithChevron)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    a {
        padding: 14px;
        color: ${props => props?.theme?.colors?.white};
        }

  .szh-accordion__item {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-btn {
      cursor: pointer;
      display: flex;
      width: 100%;
      padding: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: ${props => props?.theme?.colors?.white};
      background-color: transparent;
      border: none;
      text-align: center;
    }

    &-content {
      transition: height 0.2s ease-in-out;
    }

    &-panel {
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }
  }

  .chevron-down {
    margin-left: auto;
    transition: transform 0.2s ease-in-out;
  }

  &.szh-accordion__item--expanded {
    text-align: center;
    .szh-accordion__item-btn {
      background-color: ${props => props?.theme?.colors?.gray};
      color: ${props => props?.theme?.colors?.black};
    }
    .chevron-down {
      transform: rotate(180deg);
    }
  }
`;


export const HeaderStore = () => {

    const { customer } = useContext(AuthContext);

    const [logo, setLogo] = useState('');
    const [nameLoja, setNameLoja] = useState('');
    const [emailLoja, setEmailLoja] = useState('');
    const [phoneLoja, setPhoneLoja] = useState('');
    const [cellPhone, setCellPhone] = useState('');

    const [categoryNames, setCategoryNames] = useState([]);

    const [textLoja, setTextLoja] = useState([]);
    const orderArrayTextos = textLoja.slice(0, 1);

    const [categories, setCategories] = useState([]);

    const [initialFilter, setInitialFilter] = useState([]);
    const [products, setProducts] = useState([]);

    const [click, setClick] = useState([0]);

    const [element, setElement] = useState(false);

    const showOrHide = () => {
        setElement(!element);
    }

    const [productsFavorites, setProductsFavorites] = useState<any[]>([]);

    useEffect(() => {
        let dadosFavorites = localStorage.getItem("@favoriteproduct");
        let arrayFavorites = JSON.parse(dadosFavorites);
        setProductsFavorites(arrayFavorites || []);
    }, []);

    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/store`);

                setLogo(response.data.logo || "");
                setNameLoja(response.data.name || "");
                setEmailLoja(response.data.email || "");
                setPhoneLoja(response.data.phone || "");
                setCellPhone(response.data.cellPhone || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    useEffect(() => {
        async function loadTextosInstitucionais() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listInstitutionalText?slugPosition=popup-menu-topo`);

                setTextLoja(response.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadTextosInstitucionais();
    }, []);

    useEffect(() => {
        async function loadGroups() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/positionListMenu?slugPosition=menu-topo&slugCategory=neutro`);

                setCategoryNames(data?.group || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadGroups();
    }, []);

    async function load(id: string) {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/listCategoryMenu?parentId=${id}`);

            setCategories(response.data || []);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function filterProductsAll() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsStore`);

                setProducts(response?.data || []);
                setInitialFilter(response?.data);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        filterProductsAll();
    }, []);

    const handleChange = ({ target }) => {
        if (!target.value) {
            setProducts(initialFilter);
            return;
        }

        const filterProducts = products.filter((filt) => filt.name.toLowerCase().includes(target.value));
        setProducts(filterProducts);

    }

    const search = () => {
        const arraySearch = [0];
        for (let i = 1; i <= click.length; i++) {
            arraySearch.push(i);
        }
        setClick(arraySearch)
    }

    function cancel(event: any) {
        if (event.key === "Backspace" ||
            event.key === "Escape" ||
            event.key === "ArrowLeft" ||
            event.key === "Delete") {
            setClick([]);
        }
    }

    function removerAcentos(s: any) {
        return s.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace('(', "")
            .replace(')', "")
            .replace(' ', "")
            .replace('-', "")
            .replace('.', "")
            .replace(',', "")
    }


    return (
        <>
            <ContainerHeaderStore>
                <ContentHeaderStore>
                    <BlockLogo>
                        <Link href='http://localhost:3001'>
                            {logo ? (
                                <Image src={'http://localhost:3333/files/' + logo} width={180} height={50} alt={nameLoja} />
                            ) :
                                <Image src={noImage} width={180} height={50} alt={nameLoja} />
                            }
                        </Link>
                        <PesquisaHeaderStore
                            /* @ts-ignore */
                            onChange={handleChange}
                            onKeyUp={search}
                            /* @ts-ignore */
                            onKeyDown={cancel}
                            placeholder='Busque aqui...'
                        />
                        {click.length > 1 && (
                            <DataResult>
                                <>
                                    {products.map((value) => {
                                        return (
                                            <BoxProductSearch>
                                                <Link key={value?.id} href={`/produto/${value?.slug}`} target="_blank">
                                                    <Image src={"http://localhost:3333/files/" + value?.photoproducts[0].image} width={70} height={70} alt="foto produto" />
                                                    <ListItems>{value?.name}</ListItems>
                                                </Link>
                                            </BoxProductSearch>
                                        )
                                    })}
                                </>
                            </DataResult>
                        )}
                    </BlockLogo>

                    <BlockItems>
                        <StyledUl>
                            <DropDownLi>
                                <StyledA>
                                    <RiCustomerService2Fill color='white' size={20} />
                                    Atendimento
                                </StyledA>
                                <DropDownContent>
                                    <BlockContact>
                                        <TitleContac>TELEVENDAS</TitleContac>
                                        <TextContent>
                                            <FontStrong>Telefone</FontStrong>
                                            &emsp;&emsp;&emsp;&emsp;&emsp;
                                            {phoneLoja}
                                        </TextContent>
                                    </BlockContact>
                                    <br />
                                    <br />
                                    <BlockContact>
                                        <TitleContac>ATENDIMENTO POR WHATSAPP</TitleContac>
                                        <TextContent>
                                            <FontStrong>WhatsApp</FontStrong>
                                            &emsp;&emsp;&emsp;&emsp;&emsp;
                                            <Link
                                                style={{ color: 'black' }}
                                                href={`https://api.whatsapp.com/send?phone=55${removerAcentos(cellPhone)}`} target="_blank"
                                            >
                                                {cellPhone}
                                            </Link>
                                        </TextContent>
                                    </BlockContact>
                                    <br />
                                    <br />
                                    <BlockContact>
                                        <TitleContac>ATENDIMENTO POR EMAIL</TitleContac>
                                        <TextContent>
                                            <FontStrong>Email</FontStrong>
                                            &emsp;&emsp;
                                            <Link
                                                style={{ color: 'black' }}
                                                href={'mailto:' + emailLoja}
                                            >
                                                {emailLoja}
                                            </Link>
                                        </TextContent>
                                    </BlockContact>
                                    <br />
                                    <br />
                                    {orderArrayTextos.map((atend) => {
                                        return (
                                            <SmallText
                                                key={atend.id}
                                                dangerouslySetInnerHTML={{ __html: atend?.description }}
                                            ></SmallText>
                                        )
                                    })}

                                    <br />
                                    <br />
                                    <BlockContact>
                                        <Link href={`https://api.whatsapp.com/send?phone=55${removerAcentos(cellPhone)}`} target="_blank">
                                            <ButtonAtentimento>ATENDIMENTO ONLINE</ButtonAtentimento>
                                        </Link>
                                        <Link href='/atendimento' target="_blank">
                                            <ButtonContact>FALE CONOSCO</ButtonContact>
                                        </Link>
                                    </BlockContact>
                                </DropDownContent>
                            </DropDownLi>
                            <StyledLi>
                                <StyledA>
                                    <Link
                                        href='/loginClient'
                                    >
                                        <BiUser color='white' size={20} />
                                        Login | Cadastre-se
                                    </Link>
                                </StyledA>
                            </StyledLi>
                            <StyledLi>
                                <StyledA>
                                    {productsFavorites?.length < 1 ? (
                                        <Link
                                            href='/favoritos'
                                        >
                                            <AiOutlineHeart color='white' size={20} />
                                            Favoritos
                                        </Link>
                                    ) :
                                        <Link
                                            href='/favoritos'
                                        >
                                            <AiFillHeart color='red' size={20} />
                                            Favoritos
                                        </Link>
                                    }
                                </StyledA>
                            </StyledLi>
                            <DropDownLi>
                                <StyledA>
                                    <Link href='/carrinho'><AiOutlineShoppingCart size={20} /></Link>
                                </StyledA>
                                <DropDownContent>
                                    <BlockContact>
                                        <FontStrong>TOTAL</FontStrong>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        {'R$0,00'}
                                        <br />
                                        <br />
                                        <Link href='/carrinho' target="_blank">
                                            <ButtonAtentimento>IR PARA O CARRINHO</ButtonAtentimento>
                                        </Link>
                                    </BlockContact>
                                </DropDownContent>
                            </DropDownLi>
                        </StyledUl>
                    </BlockItems>
                </ContentHeaderStore>

                <CategorysHeader>
                    <StyledUl>
                        {categoryNames.map((item) => {
                            return (
                                <>
                                    <DropDownLi>
                                        <LinkRoute key={item.id} href={`http://localhost:3001/categoria/${item?.category?.slug}`}>
                                            <StyledA onMouseOver={() => load(item.id)} >
                                                {item?.categoryName}
                                            </StyledA>
                                        </LinkRoute>

                                        {categories.length >= 1 && (
                                            <DropDownContent>
                                                {categories.map((categ) => {
                                                    return (
                                                        <LinkRoute key={categ.id} href={`http://localhost:3001/categoria/${categ?.category?.slug}`}>
                                                            <Categ>{categ?.categoryName}</Categ>
                                                        </LinkRoute>
                                                    )
                                                })}
                                            </DropDownContent>
                                        )}
                                    </DropDownLi>
                                </>
                            )
                        })}
                    </StyledUl>
                </CategorysHeader>

                <CategorysHeaderMobile>

                    <GiHamburgerMenu color='white' size={35} onClick={showOrHide} />

                    {element ? (
                        <>
                            <Accordion>
                                {categoryNames.map((item) => {
                                    return (
                                        <AccordionItem
                                            key={item?.id}
                                            onClick={() => load(item?.id)}
                                            header={item?.categoryName}
                                        >
                                            {categories.map((categ) => {
                                                return (
                                                    <Link key={categ.id} href={'/categoria/' + `${categ?.category?.slug}`}>
                                                        {categ?.categoryName}
                                                    </Link>
                                                )
                                            })}
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </>
                    ) :
                        null
                    }
                </CategorysHeaderMobile>
            </ContainerHeaderStore>
        </>
    )
}