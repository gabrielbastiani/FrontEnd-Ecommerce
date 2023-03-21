

import Image from 'next/image';
import {
    SectionCarrossel,
    ContainerBanner,
    Icons,
    Icon
} from './styles';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import bannerHome1 from '../../assets/banners/bannerHome-1.png';
import bannerHome2 from '../../assets/banners/bannerHome-2.png';
import bannerHome3 from '../../assets/banners/bannerHome-3.png';
import bannerHome4 from '../../assets/banners/bannerHome-4.png';


const CarrosselBannerHome = () => {

    const data = [
        bannerHome1,
        bannerHome2,
        bannerHome3,
        bannerHome4
    ]

    return (
        <>
            <SectionCarrossel>
                <ContainerBanner>
                    <Image src={data[0]} width={1800} height={700} alt="Banners Loja Builder Seu Negocio Online" />
                    <Image src={data[1]} width={1800} height={700} alt="Banners Loja Builder Seu Negocio Online" />
                    <Image src={data[2]} width={1800} height={700} alt="Banners Loja Builder Seu Negocio Online" />
                    <Image src={data[3]} width={1800} height={700} alt="Banners Loja Builder Seu Negocio Online" />
                </ContainerBanner>

                <Icons>
                    <Icon>
                        <FaArrowLeft size={45} color='white' />
                    </Icon>

                    <Icon>
                        <FaArrowRight size={45} color='white' />
                    </Icon>
                </Icons>
            </SectionCarrossel>
        </>
    );
};

export default CarrosselBannerHome;