import { useEffect, useRef, useState } from 'react';
import semimagem from '../../assets/semfoto.png';
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
    Add,
    BoxTitle,
    ImagesHover,
    TextCredit
} from './styles';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { setupAPIClient } from '../../services/api';
import Link from 'next/link';


interface DestaqueRequest {
    title: string;
}

const DestaqueProducts = ({ title }: DestaqueRequest) => {

    const [productsDestaque, setProductsDestaque] = useState([]);

    useEffect(() => {
        async function loadDestaques() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listProductsDestaque`);
                setProductsDestaque(response.data);
            } catch (error) {
                console.log(error.response);
            }
        }
        loadDestaques();
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

    if (!productsDestaque || !productsDestaque.length) return null;


    return (
        <>
            <BoxTitle>
                <Title>{title}</Title>
            </BoxTitle>
            <SectionDestaqueProducts>
                <Container>
                    <Carousel ref={carousel}>
                        {productsDestaque.map((item) => {
                            return (
                                <Item key={item.id}>
                                    <Link href={'/produto/' + item?.slug}>
                                        <Images>
                                            {item.photoproducts[0] ? (
                                                <Image src={'http://localhost:3333/files/' + item.photoproducts[0].image} width={450} height={300} alt={item?.name} />
                                            ) :
                                                <Image src={semimagem} width={450} height={400} alt={item?.name} />
                                            }
                                        </Images>
                                        <ImagesHover>
                                            {item.photoproducts[1] ? (
                                                <Image src={'http://localhost:3333/files/' + item.photoproducts[1].image} width={450} height={300} alt={item?.name} />
                                            ) :
                                                <Image src={semimagem} width={450} height={400} alt={item?.name} />
                                            }
                                        </ImagesHover>
                                    </Link>
                                    <Info>
                                        <Link href={'/produto/' + item?.slug}>
                                            <Name>{item?.name}</Name>
                                            <OldPrice>De {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price)}</OldPrice>
                                            <Price>Por {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.promotion)}</Price>
                                            <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price / 12)} com juros de Cartão de Crédito</TextCredit>
                                        </Link>
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