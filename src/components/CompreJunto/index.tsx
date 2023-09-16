import { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { setupAPIClient } from '../../services/api'
import {
    BoxAdd,
    BoxAmount,
    BoxDatas,
    BoxImage,
    ButtomAddTogheter,
    Container,
    ContainerBuy,
    DatasProductTogheter,
    EtiquetaInput,
    NavButton,
    NavButtonLeft,
    OldPrice,
    Price,
    RadioBotton,
    TogheterTitulo
} from './styles'
import Titulos from '../Titulos';
import Image from 'next/image';
import { TextMax, TextMin, TextQuantidade } from '../InfosProductPage/styles'
import { CartContext } from '../../contexts/CartContext'


interface CompreJuntoRequest {
    buyTogether: string;
}

const CompreJunto = ({ buyTogether }: CompreJuntoRequest) => {

    const { saveProductCart } = useContext(CartContext);

    const [loadTogheter, setLoadTogheter] = useState<any[]>([]);

    const [count, setCount] = useState(1);
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        async function findLoadIDMenu() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/buyTogetherProductStore?parentId=${buyTogether}`);

                setLoadTogheter(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadIDMenu();
    }, [buyTogether]);


    const [imageIndex, setImageIndex] = useState(0)

    const next = () => {
        setImageIndex(state => (state += 1))
        if (imageIndex === loadTogheter.length - 1) setImageIndex(0)
    }

    const prev = () => {
        setImageIndex(state => (state -= 1))
        if (imageIndex === 0) setImageIndex(loadTogheter.length - 1)
    }

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
        id: string,
        image: string,
        name: string,
        count: number,
        promotion: number,
        relationattributeproducts: any,
        stock: number,
        weight: any,
        width: any,
        height: any,
        depth: any
    ) {
        let prod = {
            id: id,
            name: name,
            image: image,
            promotion: promotion,
            relationattributeproducts: relationattributeproducts,
            stock: stock,
            weight: weight,
            width: width,
            height: height,
            depth: depth
        }
        /* @ts-ignore */
        saveProductCart(id, count, prod)
        setCount(1);
    }



    return (
        <ContainerBuy>
            <TogheterTitulo>
                <Titulos
                    tipo='h1'
                    titulo='Aproveite e Compre Junto'
                />
            </TogheterTitulo>

            <Container>
                <DatasProductTogheter>
                    <BoxImage>
                        <Link href={String(loadTogheter[imageIndex]?.product?.slug)} target="_blank">
                            <Image
                                src={'http://localhost:3333/files/' + loadTogheter[imageIndex]?.product?.photoproducts[0]?.image}
                                width={200}
                                height={200}
                                alt="Compre junto Loja Builder Seu Negocio Online"
                            />
                        </Link>
                    </BoxImage>

                    <BoxDatas>
                        <Link href={String(loadTogheter[imageIndex]?.product?.slug)} target="_blank">
                            {loadTogheter[imageIndex]?.product?.name}
                        </Link>
                        <OldPrice>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(loadTogheter[imageIndex]?.product?.promotion)}</OldPrice>
                        <Price>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(loadTogheter[imageIndex]?.product?.price)}</Price>
                        <BoxAmount>
                            <TextMin onClick={() => handleDescrement(loadTogheter[imageIndex]?.product?.id)}>-</TextMin>
                            {activeTab === loadTogheter[imageIndex]?.product?.id ?
                                <TextQuantidade style={{ color: 'black' }}>{count}</TextQuantidade>
                                :
                                <TextQuantidade style={{ color: 'black' }}>{loadTogheter[imageIndex]?.product?.amount}</TextQuantidade>
                            }
                            <TextMax onClick={() => handleIncrement(loadTogheter[imageIndex]?.product?.id)}>+</TextMax>
                        </BoxAmount>
                        <BoxAdd>
                            <ButtomAddTogheter
                                /* @ts-ignore */
                                onClick={() => handleAddItemCart(
                                    loadTogheter[imageIndex]?.product?.id,
                                    loadTogheter[imageIndex]?.product?.photoproducts[0]?.image,
                                    loadTogheter[imageIndex]?.product?.name,
                                    count,
                                    loadTogheter[imageIndex]?.product?.promotion,
                                    loadTogheter[imageIndex]?.product?.relationattributeproducts,
                                    loadTogheter[imageIndex]?.product?.stock,
                                    loadTogheter[imageIndex]?.product?.weight,
                                    loadTogheter[imageIndex]?.product?.width,
                                    loadTogheter[imageIndex]?.product?.height,
                                    loadTogheter[imageIndex]?.product?.depth
                                )}
                            >
                                ADICIONAR
                            </ButtomAddTogheter>
                        </BoxAdd>
                    </BoxDatas>
                </DatasProductTogheter>

                <NavButton right onClick={next}>
                    <FaArrowRight size={35} color="black" />
                </NavButton>
                <NavButtonLeft left onClick={prev}>
                    <FaArrowLeft size={35} color="black" />
                </NavButtonLeft>
            </Container>
        </ContainerBuy>
    )
}

export default CompreJunto
