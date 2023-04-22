import { setupAPIClient } from '../../services/api';
import Image from 'next/image';
import {
    ContainerGaleria,
    ItemGaleria1,
    ItemGaleria2,
    ContainerGaleriaBotton,
    ItemGaleriaBotton1,
    ItemGaleriaBotton2
} from './styles';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export const MosaicoHome = () => {

    const [mosaicoBanners, setMosaicoBanners] = useState([]);
    const orderArray = mosaicoBanners.slice(0, 4);

    useEffect(() => {
        async function loadHomeBanner() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/activeBanner?slugPosicao=banner-mosaico-pagina-principal`);
                setMosaicoBanners(response.data || []);
            } catch (error) {
                console.log(error.response.data);
            };
        }
        loadHomeBanner();
    }, []);
    

    return (
        <>
            <ContainerGaleria>
                {orderArray.splice(3).map((mos1) => {
                    return (
                        <ItemGaleria1 key={mos1.id}>
                            <Link href={mos1.url}>
                                <Image src={'http://localhost:3333/files/' + mos1.banner} width={mos1.width ? mos1.width : 539} height={mos1.height ? mos1.height : 300} alt="Mosaico Home Loja" />
                            </Link>
                        </ItemGaleria1>
                    )
                })}
                {orderArray.splice(2).map((mos2) => {
                    return (
                        <ItemGaleria2 key={mos2.id}>
                            <Link href={mos2.url}>
                                <Image src={'http://localhost:3333/files/' + mos2.banner} width={mos2.width ? mos2.width : 539} height={mos2.height ? mos2.height : 300} alt="Mosaico Home Loja" />
                            </Link>
                        </ItemGaleria2>
                    )
                })}
            </ContainerGaleria>

            <ContainerGaleriaBotton>
                {orderArray.splice(1).map((mos3) => {
                    return (
                        <ItemGaleriaBotton1 key={mos3.id}>
                            <Link href={mos3.url}>
                                <Image src={'http://localhost:3333/files/' + mos3.banner} width={mos3.width ? mos3.width : 858} height={mos3.height ? mos3.height : 350} alt="Mosaico Home Loja" />
                            </Link>
                        </ItemGaleriaBotton1>
                    )
                })}
                {orderArray.splice(0).map((mos4) => {
                    return (
                        <ItemGaleriaBotton2 key={mos4.id}>
                            <Link href={mos4.url}>
                                <Image src={'http://localhost:3333/files/' + mos4.banner} width={mos4.width ? mos4.width : 440} height={mos4.height ? mos4.height : 350} alt="Mosaico Home Loja" />
                            </Link>
                        </ItemGaleriaBotton2>
                    )
                })}
            </ContainerGaleriaBotton>
        </>
    )
}