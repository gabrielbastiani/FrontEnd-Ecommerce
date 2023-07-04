import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { BoxName, ButtonClose, ContainerContent, ContainerNameProduct, ProductName, SwiperButton, SwiperButtonLeft } from './styles';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
register();


interface ImagesRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    nameProduct: string;
    allImagesProduct: any;
}

export function ModalImageProduct({ isOpen, onRequestClose, nameProduct, allImagesProduct }: ImagesRequest) {

    const customStyles = {
        content: {
            top: '57%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
        }
    };

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
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <ButtonClose
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
            >
                <FiX size={45} color="#f34748" />
            </ButtonClose>

            <ContainerContent>

                <Swiper
                    modules={[EffectFade]}
                    effect='fade'
                    slidesPerView={1}
                    navigation={{
                        prevEl: prevRef?.current,
                        nextEl: nextRef?.current
                    }}
                    updateOnWindowResize
                    observer
                    observeParents
                    loop
                    onSwiper={setSwiper}
                >
                    {allImagesProduct.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Image
                                src={'http://localhost:3333/files/' + item?.image}
                                width={650}
                                height={610}
                                alt="Imagem Produto Loja Builder Seu Negocio Online"
                            />
                            <ContainerNameProduct>
                                <BoxName>
                                    <ProductName>{nameProduct}</ProductName>
                                </BoxName>
                            </ContainerNameProduct>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <SwiperButton right ref={nextRef}>
                    <FaArrowRight size={35} color='black' />
                </SwiperButton>
                <SwiperButtonLeft left ref={prevRef}>
                    <FaArrowLeft size={35} color='black' />
                </SwiperButtonLeft>

            </ContainerContent>
        </Modal>
    )
}