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
    TextNameCategoryMobile,
    BoxItemsMobile,
    Categ
} from './styles';
import PesquisaHeaderStore from './PesquisaHeaderStore';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { setupAPIClient } from '../../services/api';


export const HeaderStore = () => {

    const { user } = useContext(AuthContext);

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


    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/loja`);

                setLogo(response.data.logoLoja || "");
                setNameLoja(response.data.nameLoja || "");
                setEmailLoja(response.data.emailLoja || "");
                setPhoneLoja(response.data.phoneLoja || "");
                setCellPhone(response.data.cellPhoneLoja || "");

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
                const response = await apiClient.get(`/listTextosInstitucionais?slugPosicao=popup-menu-topo`);

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
                const response = await apiClient.get(`/pocisaoListGroup?slugPosicao=menu-topo`);

                setCategoryNames(response.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadGroups();
    }, []);

    async function load(id: string) {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/listCategoriesGroup?groupId=${id}`);

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

        const filterProducts = products.filter((filt) => filt.nameProduct.toLowerCase().includes(target.value));
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
                                            <Link key={value.id} href={`/produto/${value?.slug}`} target="_blank">
                                                <ListItems>{value?.nameProduct}</ListItems>
                                            </Link>
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
                                            <SmallText key={atend.id}>
                                                {atend.description}
                                            </SmallText>
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
                                    <Link
                                        href='/favoritos'
                                    >
                                        <AiOutlineHeart color='white' size={20} />
                                        Favoritos
                                    </Link>
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
                                        <Link key={item.id} href={'/categoria/' + `${item?.category?.slug}`}>
                                            <StyledA onMouseOver={() => load(item.id)} >
                                                {item?.itemName}
                                            </StyledA>
                                        </Link>
                                        <DropDownContent>
                                            {categories.map((categ) => {
                                                return (
                                                    <Link key={item.id} href={'/categoria/' + `${categ?.category?.slug}`}>
                                                        <Categ>{categ?.category?.categoryName}</Categ>
                                                    </Link>
                                                )
                                            })}
                                        </DropDownContent>
                                    </DropDownLi>
                                </>
                            )
                        })}
                    </StyledUl>
                </CategorysHeader>

                <CategorysHeaderMobile>

                    <GiHamburgerMenu color='white' size={35} onClick={showOrHide} />

                    {element ?
                        <BoxItemsMobile>
                            {categoryNames.map((item) => {
                                return (
                                    <Link key={item.id} href={'/categoria/' + `${item?.category?.slug}`}>
                                        <TextNameCategoryMobile>
                                            {item?.itemName}
                                        </TextNameCategoryMobile>
                                    </Link>
                                )
                            })}
                        </BoxItemsMobile>
                        :
                        null
                    }
                </CategorysHeaderMobile>
            </ContainerHeaderStore>
        </>
    )
}