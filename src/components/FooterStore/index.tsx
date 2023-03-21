import logoLoginWhite from '../../assets/LogoBuilderWhite.png';
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
    InfosStore
} from './style';
import { TfiFacebook } from 'react-icons/tfi';
import { AiOutlineYoutube } from 'react-icons/ai';
import { SlSocialInstagram } from 'react-icons/sl';
import { FaLinkedinIn } from 'react-icons/fa';
import { TbBrandTelegram } from 'react-icons/tb';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setupAPIClient } from '../../services/api';


export const FooterStore = () => {

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
            <FooterContainer>
                <GridContainerUm>
                    <Block1>
                        <BoxLogo>
                            <Image src={logoLoginWhite} width={180} height={50} alt="Logo Builder Seu Negocio Online" />
                        </BoxLogo>
                    </Block1>

                    <Block2>
                        <TextInstitucional>Fundada em 1980, a Sumig é especializada em soluções para solda e corte, sendo a maior fabricante de tochas de solda MIG/MAG, TIG e Corte Plasma da América Latina. Entregamos a solução completa em solda e corte com agilidade e confiabilidade, oferecendo um excelente apoio técnico e serviço de pós-venda especializado.</TextInstitucional>
                    </Block2>
                    <Block3>
                        <SubTitulo>Redes Socias</SubTitulo>
                        <BlockRedes>
                            <Link href='https://www.facebook.com/builderseunegocioonline' target="_blank">
                                <TfiFacebook size={55} color='white' />
                            </Link>
                            <Link href='https://builderseunegocioonline.com.br/canalnoyoutube' target="_blank">
                                <AiOutlineYoutube size={55} color='white' />
                            </Link>
                            <Link href='https://www.instagram.com/builderseunegocioonline' target="_blank">
                                <SlSocialInstagram size={55} color='white' />
                            </Link>
                            <Link href='https://www.linkedin.com/in/gabriel-campos-de-bastiani' target="_blank">
                                <FaLinkedinIn size={55} color='white' />
                            </Link>
                            <Link href='' target="_blank">
                                <TbBrandTelegram size={55} color='white' />
                            </Link>

                        </BlockRedes>
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