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
    Buttons,
    Button,
    Container,
    BoxTitle
} from './styles';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';


interface VizualizadosRequest {
    title: string;
}

const VizualizadosRecentemete = ({ title }: VizualizadosRequest) => {
    
    const [productsDestaque, setProductsDestaque] = useState([]);

    useEffect(() => {
        let dados = localStorage.getItem("@MaisVizualizados");

        const dadosArray = JSON.parse(dados);

        setProductsDestaque(dadosArray);
    },[]);

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
                                <Item key={item.slug}>
                                    <Link href={'/produto/' + item.slug}>
                                        <Images>
                                            {item.photoProduct ? (
                                                <Image src={'http://localhost:3333/files/' + item.photoProduct} width={450} height={300} alt={item?.nameProduct} />
                                            ) :
                                                <Image src={semimagem} width={450} height={400} alt={item?.nameProduct} />
                                            }
                                        </Images>
                                    </Link>
                                    <Info>
                                        <Link href={'/produto/' + item.slug}>
                                            <Name>{item.nameProducts}</Name>
                                        </Link>
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

export default VizualizadosRecentemete;