import { useEffect, useRef, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import Modal from 'react-modal';
import Image from 'next/image';
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa';
import {
    BoxImages,
    BoxImagesMobile,
    BoxPhotoProduct,
    BoxPhotoProductMobile,
    Button,
    Buttons,
    ButtonsMobileLeft,
    ButtonsMobileRight,
    Carousel,
    CarouselMobile,
    Container,
    ContainerMobile,
    ImageZoomBox,
    ImageZoomBoxMobile,
    Images,
    ImagesMobile,
    Item,
    ItemMobile
} from './styles';
import { ModalImageProduct } from '../popups/ModalImageProduct';


interface PhotoRequest {
    product_id: any;
}

const CarrosselImagesPageProduct = ({ product_id }: PhotoRequest) => {

    const [photosProduct, setPhotosProduct] = useState<any[]>([]);
    const [firstImage, setFirstImage] = useState('');
    const [photo, setPhoto] = useState('');
    const [nameProduct, setNameProduct] = useState<any[]>([]);

    const productName = nameProduct.map(item => item?.product?.name);

    const [modalVisible, setModalVisible] = useState(false);

    function ImageMagnifier({
        src,
        width,
        height,
        magnifierHeight = 200,
        magnifieWidth = 200,
        zoomLevel = 2.0
    }: {
        src: string;
        width?: string;
        height?: string;
        magnifierHeight?: number;
        magnifieWidth?: number;
        zoomLevel?: number;
    }) {
        const [[x, y], setXY] = useState([0, 0]);
        const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
        const [showMagnifier, setShowMagnifier] = useState(false);
        return (
            <ImageZoomBox
                style={{
                    position: "relative",
                    height: height,
                    width: width,
                    cursor: 'none'
                }}
            >
                <Image
                    onClick={() => handleOpenModalImage()}
                    width={500}
                    height={500}
                    alt="Imagem do produto"
                    src={src}
                    style={{ height: height, width: width }}
                    onMouseEnter={(e) => {
                        const elem = e.currentTarget;
                        const { width, height } = elem.getBoundingClientRect();
                        setSize([width, height]);
                        setShowMagnifier(true);
                    }}
                    onMouseMove={(e) => {
                        const elem = e.currentTarget;
                        const { top, left } = elem.getBoundingClientRect();
                        const x = e.pageX - left - window.pageXOffset;
                        const y = e.pageY - top - window.pageYOffset;
                        setXY([x, y]);
                    }}
                    onMouseLeave={() => {
                        setShowMagnifier(false);
                    }}
                />

                <BoxImages
                    style={{
                        borderRadius: '100%',
                        display: showMagnifier ? "" : "none",
                        position: "absolute",
                        pointerEvents: "none",
                        height: `${magnifierHeight}px`,
                        width: `${magnifieWidth}px`,
                        top: `${y - magnifierHeight / 2}px`,
                        left: `${x - magnifieWidth / 2}px`,
                        opacity: "1",
                        border: "1px solid lightgray",
                        backgroundColor: "white",
                        backgroundImage: `url('${src}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                        backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                        backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                    }}
                ></BoxImages>
            </ImageZoomBox>
        );
    }


    function ImageMagnifierMobile({
        src,
        width,
        height,
        magnifierHeight = 200,
        magnifieWidth = 200,
        zoomLevel = 2.0
    }: {
        src: string;
        width?: string;
        height?: string;
        magnifierHeight?: number;
        magnifieWidth?: number;
        zoomLevel?: number;
    }) {
        const [[x, y], setXY] = useState([0, 0]);
        const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
        const [showMagnifier, setShowMagnifier] = useState(false);
        return (
            <ImageZoomBoxMobile
                style={{
                    position: "relative",
                    height: height,
                    width: width,
                    cursor: 'none'
                }}
            >
                <Image
                    onClick={() => handleOpenModalImage()}
                    width={500}
                    height={500}
                    alt="Imagem do produto"
                    src={src}
                    style={{ height: height, width: width }}
                    onMouseEnter={(e) => {
                        const elem = e.currentTarget;
                        const { width, height } = elem.getBoundingClientRect();
                        setSize([width, height]);
                        setShowMagnifier(true);
                    }}
                    onMouseMove={(e) => {
                        const elem = e.currentTarget;
                        const { top, left } = elem.getBoundingClientRect();
                        const x = e.pageX - left - window.pageXOffset;
                        const y = e.pageY - top - window.pageYOffset;
                        setXY([x, y]);
                    }}
                    onMouseLeave={() => {
                        setShowMagnifier(false);
                    }}
                />

                <BoxImagesMobile
                    style={{
                        borderRadius: '100%',
                        display: showMagnifier ? "" : "none",
                        position: "absolute",
                        pointerEvents: "none",
                        height: `${magnifierHeight}px`,
                        width: `${magnifieWidth}px`,
                        top: `${y - magnifierHeight / 2}px`,
                        left: `${x - magnifieWidth / 2}px`,
                        opacity: "1",
                        border: "1px solid lightgray",
                        backgroundColor: "white",
                        backgroundImage: `url('${src}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                        backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                        backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                    }}
                ></BoxImagesMobile>
            </ImageZoomBoxMobile>
        );
    }

    useEffect(() => {
        async function loadPhotosProduct() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/listPhotosPageProduct?product_id=${product_id}`);
                setFirstImage(data[0]?.image);
                setPhotosProduct(data);
                setNameProduct(data);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadPhotosProduct();
    }, [product_id]);

    const carousel = useRef(null);
    const carouselMobile = useRef(null);

    function handleLeftClick(e: any) {
        e.preventDefault();
        carousel.current.scrollTop -= carousel.current.offsetHeight;
    };

    function handleLeftClickMobile(e: any) {
        e.preventDefault();
        carouselMobile.current.scrollLeft -= carouselMobile.current.offsetWidth;
    };


    function handleRightClick(e: any) {
        e.preventDefault();
        carousel.current.scrollTop += carousel.current.offsetHeight;
    };

    function handleRightClickMobile(e: any) {
        e.preventDefault();
        carouselMobile.current.scrollLeft += carouselMobile.current.offsetWidth;
    };


    if (!photosProduct || !photosProduct.length) return null;



    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalImage() {
        setModalVisible(true);
    }

    Modal.setAppElement('#__next');


    return (
        <>
            <Buttons>
                <Button onClick={handleLeftClick}>
                    <FaArrowUp size={33} color='white' />
                </Button>
            </Buttons>
            <Container>
                <Carousel ref={carousel}>
                    {photosProduct.map((item) => {
                        return (
                            <Item key={item.id}>
                                <Images>
                                    <Image
                                        src={'http://localhost:3333/files/' + item?.image}
                                        width={75}
                                        height={75}
                                        alt="Imagem do produto"
                                        onClick={() => setPhoto(item?.image)}
                                    />
                                </Images>
                            </Item>
                        );
                    })}
                </Carousel>

                {photo ? (
                    <>
                        <BoxPhotoProduct>
                            <ImageMagnifier
                                src={'http://localhost:3333/files/' + photo}
                            />
                        </BoxPhotoProduct>
                    </>
                ) :
                    <>
                        <BoxPhotoProduct>
                            <ImageMagnifier
                                src={'http://localhost:3333/files/' + firstImage}
                            />
                        </BoxPhotoProduct>
                    </>
                }

            </Container>
            <Buttons>
                <Button onClick={handleRightClick}>
                    <FaArrowDown size={33} color='white' />
                </Button>
            </Buttons>





            <ContainerMobile>
                <CarouselMobile ref={carouselMobile}>
                    {photosProduct.map((item) => {
                        return (
                            <ItemMobile key={item.id}>
                                <ImagesMobile>
                                    <Image
                                        src={'http://localhost:3333/files/' + item?.image}
                                        width={75}
                                        height={75}
                                        alt="Imagem do produto"
                                        onClick={() => setPhoto(item?.image)}
                                    />
                                </ImagesMobile>
                            </ItemMobile>
                        );
                    })}
                </CarouselMobile>

                <ButtonsMobileLeft left onClick={handleLeftClickMobile}>
                    <FaArrowLeft size={33} color='white' />
                </ButtonsMobileLeft>

                <ButtonsMobileRight right onClick={handleRightClickMobile}>
                    <FaArrowRight size={33} color='white' />
                </ButtonsMobileRight>

                {photo ? (
                    <>
                        <BoxPhotoProductMobile>
                            <ImageMagnifierMobile
                                src={'http://localhost:3333/files/' + photo}
                            />
                        </BoxPhotoProductMobile>
                    </>
                ) :
                    <>
                        <BoxPhotoProductMobile>
                            <ImageMagnifierMobile
                                src={'http://localhost:3333/files/' + firstImage}
                            />
                        </BoxPhotoProductMobile>
                    </>
                }

            </ContainerMobile>

            {modalVisible && (
                <ModalImageProduct
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    nameProduct={productName[0]}
                    allImagesProduct={photosProduct}
                />
            )}
        </>
    )
};

export default CarrosselImagesPageProduct;