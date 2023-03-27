import Image from 'next/image';



import {
    MosaicoHomeSection,
    MosaicoHome1,
    MosaicoHome2,
    MosaicoHome3,
    MosaicoHome4
} from './styles';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { setupAPIClient } from '../../services/api';


export const MosaicoHome = () => {

    const [bannersHome, setBannersHome] = useState([]);

    console.log(bannersHome.map((Item)) => {Item.url})

    useEffect(() => {
        async function loadHomeBanner() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/activeBannerMosaico`);
                setBannersHome(response.data || []);
            } catch (error) {
                console.log(error.response.data)
            }
        }
        loadHomeBanner();
    }, []);

    return (
        <MosaicoHomeSection>
            <MosaicoHome1>
                <Link href={''}>
                    <Image src={'http://localhost:3333/files/'} width={618} height={300} alt="Mosaico Home Loja" />
                </Link>
            </MosaicoHome1>
            <MosaicoHome2>
                <Link href=''>
                    <Image src={'http://localhost:3333/files/'} width={618} height={300} alt="Mosaico Home Loja" />
                </Link>
            </MosaicoHome2>
            <MosaicoHome3>
                <Link href=''>
                    <Image src={'http://localhost:3333/files/'} width={828} height={402} alt="Mosaico Home Loja" />
                </Link>
            </MosaicoHome3>
            <MosaicoHome4>
                <Link href=''>
                    <Image src={'http://localhost:3333/files/'} width={404} height={402} alt="Mosaico Home Loja" />
                </Link>
            </MosaicoHome4>
        </MosaicoHomeSection>
    )
}