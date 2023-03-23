import Image from 'next/image';
import logoLoginWhite from '../../assets/LogoBuilderWhite.png';
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
    TextNameCategory,
    DataResult,
    ListItems,
    CategorysHeaderMobile,
    TextNameCategoryMobile,
    BoxItemsMobile
} from './styles';
import PesquisaHeaderStore from './PesquisaHeaderStore';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { setupAPIClient } from '../../services/api';


export const HeaderStore = () => {

    const { user } = useContext(AuthContext);

    const [emailLoja, setEmailLoja] = useState('');
    const [phoneLoja, setPhoneLoja] = useState('');

    const [categoryNames, setCategoryNames] = useState([]);

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

                setEmailLoja(response.data.emailLoja || "");
                setPhoneLoja(response.data.phoneLoja || "");

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadStore();
    }, []);

    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allCategorys`);

                setCategoryNames(response?.data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadCategorys();
    }, []);

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


    return (
        <>
            <ContainerHeaderStore>
                <ContentHeaderStore>
                    <BlockLogo>
                        <Image src={logoLoginWhite} width={180} height={50} alt="Logo Builder Seu Negocio Online" />
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
                                            <Link key={value.id} href={`/produto/${value.nameProduct}`} target="_blank">
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
                                                href='https://api.whatsapp.com/send?phone=5554996860104' target="_blank"
                                            >
                                                (54) 99686-0104
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
                                    <SmallText>
                                        Atendimento disponível de segunda a sexta das<br /> 08h às 12h e das 13h às 17h30
                                    </SmallText>
                                    <br />
                                    <br />
                                    <BlockContact>
                                        <Link href='https://api.whatsapp.com/send?phone=5554996860104' target="_blank">
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
                    {categoryNames.map((item) => {
                        return (
                            <Link key={item.id} href={'/categoria/' + `${item?.codigo}`}>
                                <TextNameCategory>
                                    {item?.categoryName}
                                </TextNameCategory>
                            </Link>
                        )
                    })}
                </CategorysHeader>

                <CategorysHeaderMobile>

                    <GiHamburgerMenu color='white' size={35} onClick={showOrHide} />

                    {element ?
                        <BoxItemsMobile>
                            {categoryNames.map((item) => {
                                return (
                                    <Link key={item.id} href={'/categoria/' + `${item?.codigo}`}>
                                        <TextNameCategoryMobile>
                                            {item?.categoryName}
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