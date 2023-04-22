import { useEffect, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import Image from 'next/image';
import bannerHomePadrao from '../../assets/sembannerhome.png';
import {
    Container,
    NavButton,
    DotContainer,
    Dot,
    NavButtonLeft,
} from './styles';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';



const CarrosselBannerHome = () => {

    const [bannersHome, setBannersHome] = useState([]);

    useEffect(() => {
        async function loadBannersHome() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/activeBanner?slugPosicao=banner-topo`);
                setBannersHome(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadBannersHome();
    }, []);

    const [imageIndex, setImageIndex] = useState(0);

    const next = () => {
        setImageIndex((state) => (state += 1));
        if (imageIndex === bannersHome.length - 1) setImageIndex(0);
    };

    const prev = () => {
        setImageIndex((state) => (state -= 1));
        if (imageIndex === 0) setImageIndex(bannersHome.length - 1);
    };

    /* setInterval(next, 5000); */


    return (
        <>
            {bannersHome.length < 1 ? (
                <Container>
                    <Image
                        src={bannerHomePadrao}
                        width={1800}
                        height={100}
                        alt="Banners Loja Builder Seu Negocio Online"
                    />
                </Container>
            ) :
                <Container>
                    <Link href={String(bannersHome[imageIndex]?.url)} target="_blank">
                        <Image
                            src={'http://localhost:3333/files/' + bannersHome[imageIndex]?.banner}
                            width={1800}
                            height={700}
                            alt="Banners Loja Builder Seu Negocio Online"
                        />
                    </Link>
                    <NavButton right onClick={next}>
                        <FaArrowRight size={35} color='white' />
                    </NavButton>
                    <NavButtonLeft left onClick={prev}>
                        <FaArrowLeft size={35} color='white' />
                    </NavButtonLeft>
                    <DotContainer>
                        {
                            bannersHome.map((dot, index) => (/* @ts-ignore */
                                <Dot key={dot?.banner} active={(index === imageIndex)} />
                            ))
                        }
                    </DotContainer>
                </Container>
            }
        </>
    )
};

export default CarrosselBannerHome;