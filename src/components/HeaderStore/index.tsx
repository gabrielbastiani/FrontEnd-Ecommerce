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
    SmallText
} from './styles';
import PesquisaHeaderStore from './PesquisaHeaderStore';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { setupAPIClient } from '../../services/api';


export const HeaderStore = () => {

    const { user } = useContext(AuthContext);

    const [loja_id, setLoja_id] = useState('');
    const [nameLoja, setNameLoja] = useState('');
    const [cnpjLoja, setCnpjLoja] = useState('');
    const [emailLoja, setEmailLoja] = useState('');
    const [phoneLoja, setPhoneLoja] = useState('');
    const [ruaLoja, setRuaLoja] = useState('');
    const [numeroLoja, setNumeroLoja] = useState('');
    const [bairroLoja, setBairroLoja] = useState('');
    const [cepLoja, setCepLoja] = useState('');
    const [cityLoja, setCityLoja] = useState('');
    const [stateLoja, setStateLoja] = useState('');


    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/loja`);

                setLoja_id(response.data.loja_id || "");
                setNameLoja(response.data.nameLoja || "");
                setCnpjLoja(response.data.cnpjLoja || "");
                setEmailLoja(response.data.emailLoja || "");
                setPhoneLoja(response.data.phoneLoja || "");
                setRuaLoja(response.data.ruaLoja || "");
                setNumeroLoja(response.data.numeroLoja || "");
                setBairroLoja(response.data.bairroLoja || "");
                setCepLoja(response.data.cepLoja || "");
                setCityLoja(response.data.cityLoja || "");
                setStateLoja(response.data.stateLoja || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    return (
        <>
            <ContainerHeaderStore>
                <ContentHeaderStore>
                    <BlockLogo>
                        <Image src={logoLoginWhite} width={180} height={50} alt="Logo Builder Seu Negocio Online" />
                        <PesquisaHeaderStore
                            valor={''}
                            onChange={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                            placeholder='Busque aqui...'
                            onClick={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
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
                                    <Link href=''><AiOutlineShoppingCart size={20} /></Link>
                                </StyledA>
                                <DropDownContent>
                                    <TextContent>fdregergergergegegf</TextContent>
                                </DropDownContent>
                            </DropDownLi>
                        </StyledUl>
                    </BlockItems>
                </ContentHeaderStore>

                <CategorysHeader>

                </CategorysHeader>
            </ContainerHeaderStore>
        </>
    )
}