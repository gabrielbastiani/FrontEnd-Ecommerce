import { useEffect, useRef, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import Modal from 'react-modal';
import Image from 'next/image';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { BoxPhotoProduct, Button, Buttons, Carousel, Container, Images, Item, Magnify } from './styles';
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

    const MAGNIFY_SIZE = 200;
    const MAGNIFY_SIZE_HALF = MAGNIFY_SIZE / 2;

    const [magnifyStyle, setMagnifyStyle] = useState({ backgroundImage: `url(http://localhost:3333/files/${firstImage})` });

    console.log(magnifyStyle)

    const handleMouseMove = (e: any) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { offsetWidth, offsetHeight } = target;

        const xPercentage = (offsetX / offsetWidth) * 100;
        const yPercentage = (offsetY / offsetHeight) * 100;

        setMagnifyStyle((prev) => ({
            ...prev,
            display: 'block',
            top: `${offsetY - MAGNIFY_SIZE_HALF}px`,
            left: `${offsetX - MAGNIFY_SIZE_HALF}px`,
            backgroundPosition: `${xPercentage}% ${yPercentage}%`,
        }));
    };

    const handleMouseLeave = (e: any) => {
        setMagnifyStyle((prev) => ({ ...prev, display: 'none' }));
    };

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

    function handleLeftClick(e: any) {
        e.preventDefault();
        carousel.current.scrollTop -= carousel.current.offsetHeight;
    };

    function handleRightClick(e: any) {
        e.preventDefault();
        carousel.current.scrollTop += carousel.current.offsetHeight;
    };

    if (!photosProduct || !photosProduct.length) return null;

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete() {
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
                            <Image
                                src={'http://localhost:3333/files/' + photo}
                                width={500}
                                height={500}
                                alt="Imagem do produto"
                                draggable={false}
                                onClick={() => handleOpenModalDelete()}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                            />
                            <Magnify style={magnifyStyle}></Magnify>
                        </BoxPhotoProduct>
                    </>
                ) :
                    <>
                        <BoxPhotoProduct>
                            <Image
                                src={'http://localhost:3333/files/' + firstImage}
                                width={500}
                                height={500}
                                alt="Imagem do produto"
                                draggable={false}
                                onClick={() => handleOpenModalDelete()}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                            />
                            <Magnify style={magnifyStyle}></Magnify>
                        </BoxPhotoProduct>
                    </>
                }

            </Container>
            <Buttons>
                <Button onClick={handleRightClick}>
                    <FaArrowDown size={33} color='white' />
                </Button>
            </Buttons>
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