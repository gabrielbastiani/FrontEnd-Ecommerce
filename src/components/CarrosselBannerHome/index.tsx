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


const CarrosselBannerHome = () => {

    const config = [
        {
            image: bannerHome1,
            url: ""
        },
        {
            image: bannerHome2,
            url: ""
        },
        {
            image: bannerHome3,
            url: ""
        },
        {
            image: bannerHome4,
            url: ""
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

    setInterval(next, 4000);

    return (
        <Container>
            <Image src={config[imageIndex]?.image} width={1800} height={700} alt="Banners Loja Builder Seu Negocio Online" />
            <NavButton right onClick={next}>
                <FaArrowRight size={35} color='white' />
            </NavButton>
            <NavButton onClick={prev}>
                <FaArrowLeft size={35} color='white' />
            </NavButton>
            <DotContainer>
                {
                    config.map((dot, index) => (
                        /* @ts-ignore */
                        <Dot key={dot?.image} active={(index === imageIndex)} />
                    ))
                }
            </DotContainer>
        </Container>
    );
};

export default CarrosselBannerHome;