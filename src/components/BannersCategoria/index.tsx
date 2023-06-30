import { CSSProperties, useEffect, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import Image from 'next/image';
import { Container, BannersContainer } from './styles';
import Link from 'next/link';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
register();


interface BannerPageRequest {
    slug: string;
}

const BannersCategoria = ({ slug }: BannerPageRequest) => {

    const [bannerPages, setBannerPages] = useState([]);
    const [bannerAllCategories, setBannerAllCategories] = useState([]);
    const [position, setPosition] = useState("");


    useEffect(() => {
        const position = bannerPages.map(item => item?.slugPosition);
        const stringposition = String(position);
        setPosition(stringposition);
    }, [bannerPages]);

    useEffect(() => {
        async function loadBannerSlug() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/activeBanner?slugPosition=${slug}`);
                setBannerPages(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadBannerSlug();
    }, [slug, position]);

    useEffect(() => {
        async function loadBannerPages() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/activeBanner?slugPosition=banner-paginas-categorias`);
                setBannerAllCategories(data || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadBannerPages();
    }, []);


    return (
        <>
            {position === slug ? (
                <BannersContainer>
                    <Container>
                        <Swiper
                            modules={[EffectFade, Autoplay]}
                            autoplay={{
                                delay: 3300
                            }}
                            effect='fade'
                            slidesPerView={1}
                            style={{
                                width: "95%"
                            } as CSSProperties}
                        >
                            {bannerPages.map((item) => (
                                <SwiperSlide
                                    key={item?.id}
                                    style={{
                                        width: "100%"
                                    } as CSSProperties}
                                >
                                    <Link href={item?.url} target="_blank">
                                        <Image
                                            src={'http://localhost:3333/files/' + item?.banner}
                                            width={905}
                                            height={318}
                                            alt="Banners Loja Builder Seu Negocio Online"
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Container>
                </BannersContainer>
            ) :
                <BannersContainer>
                    <Container>
                        <Swiper
                            modules={[EffectFade, Autoplay]}
                            autoplay={{
                                delay: 3300
                            }}
                            effect='fade'
                            slidesPerView={1}
                            style={{
                                width: "95%"
                            } as CSSProperties}
                        >
                            {bannerAllCategories.map((item) => (
                                <SwiperSlide
                                    key={item?.id}
                                    style={{
                                        width: "100%"
                                    } as CSSProperties}
                                >
                                    <Link href={item?.url} target="_blank">
                                        <Image
                                            src={'http://localhost:3333/files/' + item?.banner}
                                            width={905}
                                            height={318}
                                            alt="Banners Loja Builder Seu Negocio Online"
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Container>
                </BannersContainer>
            }
        </>
    )
};

export default BannersCategoria;