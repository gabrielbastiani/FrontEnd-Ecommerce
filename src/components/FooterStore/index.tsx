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
    Block7,
    BoxLogo,
    TextInstitucional,
    SubTitulo,
    BlockRedes,
    BlockMunus,
    ItemMenu
} from './style';
import { TfiFacebook } from 'react-icons/tfi';
import { AiOutlineYoutube } from 'react-icons/ai';
import { SlSocialInstagram } from 'react-icons/sl';
import { FaLinkedinIn } from 'react-icons/fa';
import { TbBrandTelegram } from 'react-icons/tb';


export const FooterStore = () => {


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
                            <TfiFacebook size={55} color='white' />
                            <AiOutlineYoutube size={55} color='white' />
                            <SlSocialInstagram size={55} color='white' />
                            <FaLinkedinIn size={55} color='white' />
                            <TbBrandTelegram size={55} color='white' />
                        </BlockRedes>
                    </Block3>
                </GridContainerUm>

                <GridContainerDois>
                    <Block4>
                        <SubTitulo>Institucional</SubTitulo>
                        <BlockMunus>
                            <ItemMenu>Quem Somos</ItemMenu>
                            <ItemMenu>Politicas de Privacidade</ItemMenu>
                        </BlockMunus>
                        <br />
                        <br />
                        <SubTitulo>Minha Conta</SubTitulo>
                        <BlockMunus>
                            <ItemMenu>Meus Pedidos</ItemMenu>
                            <ItemMenu>Meus Dados</ItemMenu>
                        </BlockMunus>
                    </Block4>
                    <Block5>5</Block5>
                    <Block6>6</Block6>
                    <Block7>7</Block7>
                </GridContainerDois>
            </FooterContainer>
        </>
    )
}