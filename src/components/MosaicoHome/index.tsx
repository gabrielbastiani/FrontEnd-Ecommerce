import Image from 'next/image';
import {
    MosaicoHomeSection,
    MosaicoHome1,
    MosaicoHome2,
    MosaicoHome3,
    MosaicoHome4,
    GridContatinerTop,
    GridContatinerBotton
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
        <MosaicoHomeSection>
            <GridContatinerTop>
                {mosaicoBanners.splice(3).map((mos1) => {
                    return (
                        <MosaicoHome1 key={mos1.id}>
                            <Link href={mos1.url}>
                                <Image src={'http://localhost:3333/files/' + mos1.bannerMosaico} width={650} height={300} alt="Mosaico Home Loja" />
                            </Link>
                        </MosaicoHome1>
                    )
                })}
                {mosaicoBanners.splice(2).map((mos2) => {
                    return (
                        <MosaicoHome2 key={mos2.id}>
                            <Link href={mos2.url}>
                                <Image src={'http://localhost:3333/files/' + mos2.bannerMosaico} width={650} height={300} alt="Mosaico Home Loja" />
                            </Link>
                        </MosaicoHome2>
                    )
                })}
            </GridContatinerTop>
            <GridContatinerBotton>
                {mosaicoBanners.splice(1).map((mos3) => {
                    return (
                        <MosaicoHome3 key={mos3.id}>
                            <Link href={mos3.url}>
                                <Image src={'http://localhost:3333/files/' + mos3.bannerMosaico} width={858} height={402} alt="Mosaico Home Loja" />
                            </Link>
                        </MosaicoHome3>
                    )
                })}
                {mosaicoBanners.splice(0).map((mos4) => {
                    return (
                        <MosaicoHome4 key={mos4.id}>
                            <Link href={mos4.url}>
                                <Image src={'http://localhost:3333/files/' + mos4.bannerMosaico} width={440} height={402} alt="Mosaico Home Loja" />
                            </Link>
                        </MosaicoHome4>
                    )
                })}
            </GridContatinerBotton>
        </MosaicoHomeSection>
    )
}