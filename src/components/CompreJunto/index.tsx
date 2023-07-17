import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { setupAPIClient } from '../../services/api'
import {
    BoxAdd,
    BoxDatas,
    BoxImage,
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


interface CompreJuntoRequest {
    buyTogether: string;
}

const CompreJunto = ({ buyTogether }: CompreJuntoRequest) => {

    const [loadTogheter, setLoadTogheter] = useState<any[]>([]);

    const [check, setCheck] = useState(false);
    const [add, setAdd] = useState('Nao');

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
                        <BoxAdd>
                            <EtiquetaInput>ADICIONAR</EtiquetaInput>
                            <RadioBotton
                                type="checkbox"
                                value={''}
                                onClick={() => alert('clicou')}
                                onChange={(e) => setAdd(check ? "Nao" : "Sim")}
                                checked={check}
                            />
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
