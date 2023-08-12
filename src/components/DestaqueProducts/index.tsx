import { useContext, useEffect, useRef, useState } from 'react';
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
import { TextPromotion } from '../InfosProductPage/styles';
import { CartContext } from '../../contexts/CartContext';


interface DestaqueRequest {
    title: string;
}

const DestaqueProducts = ({ title }: DestaqueRequest) => {

    const { saveProductCart } = useContext(CartContext);
    const [productsDestaque, setProductsDestaque] = useState([]);

    const [count, setCount] = useState(1);
    const [activeTab, setActiveTab] = useState("");

    const handleIncrement = (id: string) => {
        setActiveTab(id);
        setCount(count + 1);
    };

    const handleDescrement = (id: string) => {
        setActiveTab(id);
        if (count === 1) {
            return;
        }
        setCount(count - 1);
    };

    function handleAddItemCart(
        count: any,
        id: any,
        name: any,
        image: any,
        promotion: any,
        relationattributeproducts: any,
        stock: number,
        weight: number,
        width: number,
        height: number,
        depth: number
        ) {
        /* @ts-ignore */
        saveProductCart(count, id, name, image, promotion, relationattributeproducts, stock, weight, width, height, depth);
        setCount(1);
    }

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
                        {productsDestaque.map((item, index) => {
                            return (
                                <Item key={index}>
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
                                    {item?.stock === 0 ? (
                                        <Info>
                                            <Link href={'/produto/' + item?.slug}>
                                                <Name>{item?.name}</Name>
                                                <OldPrice>De {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price)}</OldPrice>
                                                <Price>Por {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.promotion)}</Price>
                                                <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price / 12)} com juros de Cartão de Crédito</TextCredit>
                                            </Link>
                                            <TextPromotion
                                                style={{ color: 'red', fontSize: '17px', marginTop: '5px' }}
                                            >
                                                Produto indisponivel no momento!
                                            </TextPromotion>
                                        </Info>
                                    ) :
                                        <Info>
                                            <Link href={'/produto/' + item?.slug}>
                                                <Name>{item?.name}</Name>
                                                <OldPrice>De {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price)}</OldPrice>
                                                <Price>Por {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.promotion)}</Price>
                                                <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price / 12)} com juros de Cartão de Crédito</TextCredit>
                                            </Link>
                                            <BoxBuy>
                                                <Quantidade>
                                                    <Min onClick={() => handleDescrement(item?.id)}>-</Min>
                                                    {activeTab === item?.id ?
                                                        <ValueQuant>{count}</ValueQuant>
                                                        :
                                                        <ValueQuant>{item?.amount}</ValueQuant>
                                                    }
                                                    <Max onClick={() => handleIncrement(item?.id)}>+</Max>
                                                </Quantidade>
                                                <Add
                                                    /* @ts-ignore */
                                                    onClick={() => handleAddItemCart(
                                                        item?.id,
                                                        item?.photoproducts[0]?.image,
                                                        item?.name,
                                                        count,
                                                        item?.promotion,
                                                        item?.relationattributeproducts,
                                                        item?.stock,
                                                        item?.weight,
                                                        item?.width,
                                                        item?.height,
                                                        item?.depth
                                                    )}
                                                >
                                                    <AiOutlineShoppingCart
                                                        color='white'
                                                        size={25}
                                                    />
                                                    &emsp;Adicionar
                                                </Add>
                                            </BoxBuy>
                                        </Info>
                                    }
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