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
    BoxTitle,
    ContainerFavoritos
} from './styles';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { setupAPIClient } from '../../services/api';


interface VizualizadosRequest {
    title: string;
}

const VizualizadosRecentemete = ({ title }: VizualizadosRequest) => {

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

    const display = datasConfigs[0]?.recent_products_views === "Disponivel" ? "block" : "none";

    const [productsVizualizados, setProductsVizualizados] = useState([]);

    useEffect(() => {
        let dadosProducts = localStorage.getItem("@moreViewed");

        let dadosArray = JSON.parse(dadosProducts);

        setProductsVizualizados(dadosArray);
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

    if (!productsVizualizados || !productsVizualizados.length) return null;


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
                        {productsVizualizados.map((item, index) => {
                            return (
                                <ContainerFavoritos key={index}>
                                    {item?.name ? (
                                        <Item>
                                            <Link href={'/produto/' + item?.slug}>
                                                <Images>
                                                    {item.photoProduct ? (
                                                        <Image src={'http://localhost:3333/files/' + item?.photoProduct} width={450} height={300} alt={item?.name} />
                                                    ) :
                                                        <Image src={semimagem} width={450} height={400} alt={item?.name} />
                                                    }
                                                </Images>
                                            </Link>
                                            <Info>
                                                <Link href={'/produto/' + item?.slug}>
                                                    <Name>{item?.name}</Name>
                                                </Link>
                                            </Info>
                                        </Item>
                                    ) :
                                        null
                                    }
                                </ContainerFavoritos>
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