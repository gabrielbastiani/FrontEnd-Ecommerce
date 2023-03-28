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
import { setupAPIClient } from '../../services/api';


export const MosaicoHome = () => {

    const [mosaicoBanners, setMosaicoBanners] = useState([]);

    useEffect(() => {
        async function loadHomeBanner() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/activeBannerMosaico`);
                setMosaicoBanners(response.data || []);
            } catch (error) {
                console.log(error.response.data)
            }
        }
        loadHomeBanner();
    }, []);

    return (
        <>
            <ContainerGaleria>
                {mosaicoBanners.splice(3).map((mos1) => {
                    return (
                        <ItemGaleria1>
                            <Link href={mos1.url}>
                                <Image src={'http://localhost:3333/files/' + mos1.bannerMosaico} width={650} height={300} alt="Mosaico Home Loja" />
                            </Link>
                        </ItemGaleria1>
                    )
                })}
                {mosaicoBanners.splice(2).map((mos2) => {
                    return (
                        <ItemGaleria2>
                            <Link href={mos2.url}>
                                <Image src={'http://localhost:3333/files/' + mos2.bannerMosaico} width={650} height={300} alt="Mosaico Home Loja" />
                            </Link>
                        </ItemGaleria2>
                    )
                })}
            </ContainerGaleria>

            <ContainerGaleriaBotton>
                {mosaicoBanners.splice(1).map((mos3) => {
                    return (
                        <ItemGaleriaBotton1>
                            <Link href={mos3.url}>
                                <Image src={'http://localhost:3333/files/' + mos3.bannerMosaico} width={858} height={350} alt="Mosaico Home Loja" />
                            </Link>
                        </ItemGaleriaBotton1>
                    )
                })}
                {mosaicoBanners.splice(0).map((mos4) => {
                    return (
                        <ItemGaleriaBotton2>
                            <Link href={mos4.url}>
                                <Image src={'http://localhost:3333/files/' + mos4.bannerMosaico} width={440} height={350} alt="Mosaico Home Loja" />
                            </Link>
                        </ItemGaleriaBotton2>
                    )
                })}
            </ContainerGaleriaBotton>
        </>
    )
}