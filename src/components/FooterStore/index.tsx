import noImage from '../../assets/semfoto.png';
import Image from 'next/image';
import {
    FooterContainer,
    GridContainerUm,
    GridContainerDois,
    Block1,
    Block2,
    Block3,
    Block4,
    Block5,
    Block6,
    BoxLogo,
    TextInstitucional,
    SubTitulo,
    BlockRedes,
    BlockMunus,
    ItemMenu,
    InfosStore,
    BoxTitle,
    BlockRedesContent
} from './style';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setupAPIClient } from '../../services/api';


export const FooterStore = () => {

    const [logo, setLogo] = useState('');
    const [nameLoja, setNameLoja] = useState('');
    const [emailLoja, setEmailLoja] = useState('');
    const [phoneLoja, setPhoneLoja] = useState('');
    const [ruaLoja, setRuaLoja] = useState('');
    const [numeroLoja, setNumeroLoja] = useState('');
    const [bairroLoja, setBairroLoja] = useState('');
    const [cepLoja, setCepLoja] = useState('');
    const [cityLoja, setCityLoja] = useState('');
    const [stateLoja, setStateLoja] = useState('');

    const [redes, setRedes] = useState([]);
    const orderArrayRedes = redes.slice(0, 5);

    const [textLoja, setTextLoja] = useState([]);


    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/loja`);

                setLogo(response.data.logoLoja || "");
                setNameLoja(response.data.nameLoja || "")
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

    useEffect(() => {
        async function loadRedesSociais() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listRedesSociaisOrder?slugPosicao=rodape-loja`);

                setRedes(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        loadRedesSociais();
    },[])

    return (
        <>
            <FooterContainer>
                <GridContainerUm>
                    <Block1>
                        <BoxLogo>
                            {logo ? (
                                <Image src={'http://localhost:3333/files/' + logo} width={180} height={50} alt={nameLoja} />
                            ) :
                                <Image src={noImage} width={180} height={50} alt={nameLoja} />
                            }
                        </BoxLogo>
                    </Block1>

                    <Block2>
                        {/* {textLoja.map((text) => {
                            return (
                                <TextInstitucional>{text.textosinstitucionais}</TextInstitucional>
                            )
                        })} */}
                    </Block2>
                    <Block3>
                        <BoxTitle>
                            <SubTitulo>Redes Socias</SubTitulo>
                        </BoxTitle>
                        <BlockRedesContent>
                        {orderArrayRedes.map((item) => {
                            return (
                                <BlockRedes key={item.id}>
                                    <Link href={item.link} target="_blank">
                                        <Image src={'http://localhost:3333/files/' + item.imageRede} width={55} height={55} alt={nameLoja} />
                                    </Link>
                                </BlockRedes>
                            )
                        })}
                        </BlockRedesContent>
                    </Block3>
                </GridContainerUm>
                <br />
                <br />
                <br />
                <br />
                <GridContainerDois>
                    <Block4>
                        <SubTitulo>Institucional</SubTitulo>
                        <BlockMunus>
                            <Link href='/quemsomos'>
                                <ItemMenu>Quem Somos</ItemMenu>
                            </Link>
                            <Link href='/politicasdeprivacidade'>
                                <ItemMenu>Politicas de Privacidade</ItemMenu>
                            </Link>
                        </BlockMunus>
                        <br />
                        <br />
                        <SubTitulo>Minha Conta</SubTitulo>
                        <BlockMunus>
                            <Link href='/myAccount/meuspedidos'>
                                <ItemMenu>Meus Pedidos</ItemMenu>
                            </Link>
                            <Link href='/myAccount/meusdados'>
                                <ItemMenu>Meus Dados</ItemMenu>
                            </Link>
                        </BlockMunus>
                    </Block4>
                    <Block5>
                        <SubTitulo>Atendimento</SubTitulo>
                        <BlockMunus>
                            <Link href='/atendimento'>
                                <ItemMenu>Fale Conosco</ItemMenu>
                            </Link>
                            <Link href='/trocasedevolucoes'>
                                <ItemMenu>Trocas e Devoluções</ItemMenu>
                            </Link>
                            <Link href='/comocomprar'>
                                <ItemMenu>Como Comprar</ItemMenu>
                            </Link>
                            <Link href='/envioeprazodeentrega'>
                                <ItemMenu>Envio e Prazo de Entrega</ItemMenu>
                            </Link>
                            <Link href='/perguntasfrequentes'>
                                <ItemMenu>Perguntas Frequentes</ItemMenu>
                            </Link>
                            <Link href='/formasdepagamento'>
                                <ItemMenu>Formas de Pagamento</ItemMenu>
                            </Link>
                        </BlockMunus>
                    </Block5>
                    <Block6>
                        <SubTitulo>Loja Builder</SubTitulo>
                        <br />
                        <InfosStore>{ruaLoja}, {numeroLoja}<br />{cityLoja}<br />{stateLoja}<br /><br />CEP: {cepLoja}<br />Fone: {phoneLoja}<br />{emailLoja}</InfosStore>
                    </Block6>
                </GridContainerDois>
            </FooterContainer>
        </>
    )
}