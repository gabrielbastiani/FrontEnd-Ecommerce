import Image from 'next/image';
import { ContainerHeader, ContentHeader, BlockBack, TextVoltar, BlockSecurity, TextSecurity } from './styles';
import { BsArrowLeft } from 'react-icons/bs';
import { TbLock } from 'react-icons/tb';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { setupAPIClient } from '../../services/api';


export const HeaderCart = () => {

    const [logo, setLogo] = useState("");

    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/store`);
                setLogo(data.logo || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    return (
        <ContainerHeader>
            <ContentHeader>
                <Link href='/'>
                    <BlockBack>
                        <BsArrowLeft color='white' size={25} />
                        <TextVoltar>VOLTAR</TextVoltar>
                    </BlockBack>
                </Link>
                <Link href='/'>
                    <Image src={'http://localhost:3333/files/' + logo} width={180} height={70} alt="Logo loja virtual" />
                </Link>
                <BlockSecurity>
                    <TbLock color='white' size={25} />
                    <TextSecurity>Ambiente 100% seguro</TextSecurity>
                </BlockSecurity>
            </ContentHeader>
        </ContainerHeader>
    )
}