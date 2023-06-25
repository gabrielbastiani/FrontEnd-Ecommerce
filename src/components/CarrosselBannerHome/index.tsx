import { CSSProperties, useEffect, useRef, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import Image from 'next/image';
import bannerHomePadrao from '../../assets/sembannerhome.png';
import { Container, SwiperButton, SwiperButtonLeft } from './styles';
import Link from 'next/link';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
register();

const CarrosselBannerHome = () => {

    const [bannersHome, setBannersHome] = useState([]);

    useEffect(() => {
        async function loadBannersHome() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/activeBanner?slugPosition=banner-topo`);
                setBannersHome(data || []);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadBannersHome();
    }, []);

    const [swiper, setSwiper] = useState<any>();
    const prevRef = useRef();
    const nextRef = useRef();

    useEffect(() => {
        if (swiper) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [swiper]);


    return (
        <>
            {bannersHome.length < 1 ? (
                <Container>
                    <Image
                        src={bannerHomePadrao}
                        width={1700}
                        height={100}
                        alt="Banners Loja Builder Seu Negocio Online"
                    />
                </Container>
            ) :
                <Container>
                    <Swiper
                        modules={[EffectFade, Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        effect='fade'
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation={{
                            prevEl: prevRef?.current,
                            nextEl: nextRef?.current
                        }}
                        updateOnWindowResize
                        observer
                        observeParents
                        loop
                        onSwiper={setSwiper}
                        style={{
                            "--swiper-pagination-color": "#FFBA08",
                            "--swiper-pagination-bullet-inactive-color": "#999999",
                            "--swiper-pagination-bullet-inactive-opacity": "1",
                            "--swiper-pagination-bullet-size": "16px",
                            "--swiper-pagination-bullet-horizontal-gap": "6px"
                        } as CSSProperties}
                    >
                        {bannersHome.map((item) => (
                            <SwiperSlide key={item?.id}>
                                <Link href={item?.url} target="_blank">
                                    <Image
                                        src={'http://localhost:3333/files/' + item?.banner}
                                        width={1500}
                                        height={700}
                                        alt="Banners Loja Builder Seu Negocio Online"
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <SwiperButton right ref={nextRef}>
                        <FaArrowRight size={35} color='white' />
                    </SwiperButton>
                    <SwiperButtonLeft left ref={prevRef}>
                        <FaArrowLeft size={35} color='white' />
                    </SwiperButtonLeft>
                </Container>
            }
        </>
    )
};

export default CarrosselBannerHome;