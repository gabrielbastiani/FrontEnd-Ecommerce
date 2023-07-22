import Image from 'next/image';
import logoLoginWhite from '../../assets/LogoBuilderWhite.png';
import { ContainerHeader, ContentHeader, BlockBack, TextVoltar, BlockSecurity, TextSecurity } from './styles';
import { BsArrowLeft } from 'react-icons/bs';
import { TbLock } from 'react-icons/tb';
import Link from 'next/link';
import Router from 'next/router';


export const HeaderAccount = () => (
    <>
        <ContainerHeader>
            <ContentHeader>
                <BlockBack
                    onClick={() => Router.back()}
                >
                    <BsArrowLeft color='white' size={25} />
                    <TextVoltar>VOLTAR</TextVoltar>
                </BlockBack>
                <Link href={'/'}>
                    <Image src={logoLoginWhite} width={180} height={50} alt="Logo Builder Seu Negocio Online" />
                </Link>
                <BlockSecurity>
                    <TbLock color='white' size={25} />
                    <TextSecurity>Ambiente 100% seguro</TextSecurity>
                </BlockSecurity>
            </ContentHeader>
        </ContainerHeader>
    </>
)