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
import { setupAPIClient } from '../../services/api';
import Link from 'next/link';


interface VizualizadosRequest {
    title: string;
}

const VizualizadosRecentemete = ({ title }: VizualizadosRequest) => {

    const [productsDestaque, setProductsDestaque] = useState([]);

    useEffect(() => {
        async function loadDestaques() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsStore`);
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

    function removerAcentos(s: any) {
        return s.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/ +/g, "-")
            .replace(/-{2,}/g, "-")
            .replace(/[/]/g, "-");
    }


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
                                    <Link href={'/produto/' + removerAcentos(item?.nameProduct)}>
                                        <Images>
                                            {item.photoproducts[0] ? (
                                                <Image src={'http://localhost:3333/files/' + item.photoproducts[0].photo} width={450} height={300} alt={item?.nameProduct} />
                                            ) :
                                                <Image src={semimagem} width={450} height={400} alt={item?.nameProduct} />
                                            }
                                        </Images>
                                    </Link>
                                    <Info>
                                        <Link href={'/produto/' + removerAcentos(item?.nameProduct)}>
                                            <Name>{item?.nameProduct}</Name>
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