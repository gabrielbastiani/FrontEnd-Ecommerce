import { useEffect, useRef, useState } from 'react';
import destaque1 from '../../assets/banners/Maquina de Solda1.png';
import destaque2 from '../../assets/banners/Maquina de Solda2.png';
import destaque3 from '../../assets/banners/Maquina de Solda3.png';
import destaque4 from '../../assets/banners/Maquina de Solda4.png';
import destaque5 from '../../assets/banners/Tocha de Solda1.png';
import destaque6 from '../../assets/banners/Tocha de Solda2.png';
import destaque7 from '../../assets/banners/Tocha de Solda3.png';
import destaque8 from '../../assets/banners/Tocha de Solda4.png';
import {
    SectionDestaqueProducts,
    Title,
    Carousel,
    Item,
    Images,
    Info,
    Name,
    OldPrice,
    Price,
    Buttons,
    Button,
    Container,
    BoxBuy,
    Quantidade,
    Min,
    ValueQuant,
    Max,
    Add
} from './styles';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { setupAPIClient } from '../../services/api';



interface DestaqueRequest {
    type: any;
}

const DestaqueProducts = ({ type }: DestaqueRequest) => {


    const [products, setProducts] = useState([]);
    const [photos, setPhotos] = useState([]);


    console.log(photos)


    useEffect(() => {
        async function loadFirstPhotoProduct() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient('/allPhotosProductsStore');
                setPhotos(response.data || []);
            } catch (error) {
                console.log(error.response.data);
            };
        };
        loadFirstPhotoProduct();
    }, []);

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient('/allProductsStore');
                setProducts(response.data || []);
            } catch (error) {
                console.log(error.response.data);
            };
        };
        loadProducts();
    }, []);

    const carousel = useRef(null);

    function handleLeftClick(e: any) {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };

    function handleRightClick(e: any) {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };

    if (!products || !products.length) return null;



    return (
        <>
            <SectionDestaqueProducts>
                <Container>
                    <Title>{type}</Title>
                    <Carousel ref={carousel}>
                        {products.map((item) => {
                            return (
                                <Item key={item?.id}>
                                    <Images>
                                        <Image src={'http://localhost:3333/files/' + photos} width={450} height={400} alt={item?.nameProduct} />
                                    </Images>
                                    {/* {photos.map((itemphoto) => {
                                        return (
                                            <>
                                                <Images key={itemphoto.id}>
                                                    <Image src={'http://localhost:3333/files/' + itemphoto[0].photo} width={450} height={400} alt={item?.nameProduct} />
                                                </Images>
                                            </>
                                        )
                                    })} */}
                                    <Info>
                                        <Name>{item?.nameProduct}</Name>
                                        <OldPrice>De {item?.promocao.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</OldPrice>
                                        <Price>Por {item?.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Price>
                                        <BoxBuy>
                                            <Quantidade>
                                                <Min>-</Min>
                                                <ValueQuant>1</ValueQuant>
                                                <Max>+</Max>
                                            </Quantidade>
                                            <Add>
                                                <AiOutlineShoppingCart color='white' size={25} />
                                                &emsp;Adicionar
                                            </Add>
                                        </BoxBuy>
                                    </Info>
                                </Item>
                            );
                        })}
                    </Carousel>
                    <Buttons>
                        <Button onClick={handleLeftClick}>
                            <FaArrowLeft size={35} color='gray' />
                        </Button>
                        <Button onClick={handleRightClick}>
                            <FaArrowRight size={35} color='gray' />
                        </Button>
                    </Buttons>
                </Container>
            </SectionDestaqueProducts>
        </>
    );
};

export default DestaqueProducts;