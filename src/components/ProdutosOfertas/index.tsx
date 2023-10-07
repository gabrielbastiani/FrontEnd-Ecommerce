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

const ProdutosOfertas = ({ title }: DestaqueRequest) => {

    const { saveProductCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);

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
        prod: any,
        count: any,
        id: any
    ) {
        /* @ts-ignore */
        saveProductCart(count, id, prod);
        setCount(1);
    }

    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs()
    }, []);

    const display = datasConfigs[0]?.offer_products === "Disponivel" ? "block" : "none";

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient('/listProductsOfertas');
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
            <BoxTitle
                style={{ display: display }}
            >
                <Title>{title}</Title>
            </BoxTitle>
            <SectionDestaqueProducts>
                <Container
                    style={{ display: display }}
                >
                    <Carousel ref={carousel}>
                        {products.map((prod, index) => {
                            return (
                                <Item key={index}>
                                    <Link href={'/produto/' + prod?.slug}>
                                        <Images>
                                            {prod.photoproducts[0] ? (
                                                <Image src={'http://localhost:3333/files/' + prod.photoproducts[0].image} width={450} height={300} alt={prod?.name} />
                                            ) :
                                                <Image src={semimagem} width={450} height={400} alt={prod?.name} />
                                            }
                                        </Images>
                                        <ImagesHover>
                                            {prod.photoproducts[1] ? (
                                                <Image src={'http://localhost:3333/files/' + prod.photoproducts[1].image} width={450} height={300} alt={prod?.name} />
                                            ) :
                                                <Image src={semimagem} width={450} height={400} alt={prod?.name} />
                                            }
                                        </ImagesHover>
                                    </Link>
                                    {prod?.stock === 0 ? (
                                        <Info>
                                            <Link href={'/produto/' + prod?.slug}>
                                                <Name>{prod?.name}</Name>
                                                <OldPrice>De {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price)}</OldPrice>
                                                <Price>Por {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.promotion)}</Price>
                                                <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price / 12)} com juros de Cartão de Crédito</TextCredit>
                                            </Link>
                                            <TextPromotion
                                                style={{ color: 'red', fontSize: '17px', marginTop: '5px' }}
                                            >
                                                Produto indisponivel no momento!
                                            </TextPromotion>
                                        </Info>
                                    ) :
                                        <Info>
                                            <Link href={'/produto/' + prod?.slug}>
                                                <Name>{prod?.name}</Name>
                                                <OldPrice>De {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price)}</OldPrice>
                                                <Price>Por {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.promotion)}</Price>
                                                <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price / 12)} com juros de Cartão de Crédito</TextCredit>
                                            </Link>
                                            <BoxBuy>
                                                <Quantidade>
                                                    <Min onClick={() => handleDescrement(prod?.id)}>-</Min>
                                                    {activeTab === prod?.id ?
                                                        <ValueQuant>{count}</ValueQuant>
                                                        :
                                                        <ValueQuant>{prod?.amount}</ValueQuant>
                                                    }
                                                    <Max onClick={() => handleIncrement(prod?.id)}>+</Max>
                                                </Quantidade>
                                                <Add
                                                    /* @ts-ignore */
                                                    onClick={() => handleAddItemCart(
                                                        prod,
                                                        prod?.id,
                                                        count
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

export default ProdutosOfertas;