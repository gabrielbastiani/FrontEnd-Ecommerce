import { useState } from 'react';
import Image from 'next/image';
import {
    Container,
    NavButton,
    DotContainer,
    Dot,
} from './styles';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import bannerHome1 from '../../assets/banners/bannerHome-1.png';
import bannerHome2 from '../../assets/banners/bannerHome-2.png';
import bannerHome3 from '../../assets/banners/bannerHome-3.png';
import bannerHome4 from '../../assets/banners/bannerHome-4.png';
import Link from 'next/link';


const CarrosselBannerHome = () => {

    const config = [
        {
            image: bannerHome1,
            url: "https://youtu.be/Rwm9LUqPLKY"
        },
        {
            image: bannerHome2,
            url: "https://loja.sumig.com/produto/maquina-de-solda-mig-mag-black-mig-180-com-tocha-mig-mag-su-220-e-com-tocha-tig-su-26-70905"
        },
        {
            image: bannerHome3,
            url: "https://loja.sumig.com/produto/maquina-de-corte-plasma-black-cut-40-70909"
        },
        {
            image: bannerHome4,
            url: "https://loja.sumig.com/produto/tocha-mig-su-180-black-3-metros-70932"
        }
    ]

    const [imageIndex, setImageIndex] = useState(0);

    const next = () => {
        setImageIndex((state) => (state += 1));
        if (imageIndex === config.length - 1) setImageIndex(0);
    };

    const prev = () => {
        setImageIndex((state) => (state -= 1));
        if (imageIndex === 0) setImageIndex(config.length - 1);
    };

    setInterval(next, 5000);

    return (
        <Container>
            <Link href={config[imageIndex]?.url} target="_blank">
                <Image src={config[imageIndex]?.image} width={1800} height={700} alt="Banners Loja Builder Seu Negocio Online" />
            </Link>
            <NavButton right onClick={next}>
                <FaArrowRight size={35} color='white' />
            </NavButton>
            <NavButton onClick={prev}>
                <FaArrowLeft size={35} color='white' />
            </NavButton>
            <DotContainer>
                {
                    config.map((dot, index) => (
                        <Link href=''>
                            <Dot key={dot?.image} active={(index === imageIndex)} />
                        </Link>
                    ))
                }
            </DotContainer>
        </Container>
    );
};

export default CarrosselBannerHome;