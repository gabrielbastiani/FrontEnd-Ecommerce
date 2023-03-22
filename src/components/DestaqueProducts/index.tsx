
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
    Logo,
    Item,
    Images,
    Info,
    Name,
    OldPrice,
    Price,
    Buttons,
    Button
} from './styles';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';



interface DestaqueRequest {
    type: any;
}

const DestaqueProducts = ({ type }: DestaqueRequest) => {

    const [data, setData] = useState([]);
    const carousel = useRef(null);

    /* useEffect(() => {
        fetch('http://localhost:3000/static/shoes.json')
            .then((response) => response.json())
            .then(setData);
    }, []); */

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };

    const handleRightClick = (e) => {
        e.preventDefault();

        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };

    if (!data || !data.length) return null;

    const dataImages = [
        {
            id: 1,
            image: destaque1,
            img2: destaque8,
            name: 'Maquina de Solda1',
            isNew: true,
            oldPrice: 4000,
            price: 3299
        },
        {
            id: 2,
            image: destaque2,
            img2: destaque7,
            name: 'Tocha de Solda1',
            isNew: true,
            oldPrice: 599,
            price: 499
        },
        {
            id: 3,
            image: destaque3,
            img2: destaque6,
            name: 'Maquina de Solda2',
            isNew: true,
            oldPrice: 7520,
            price: 6299
        },
        {
            id: 4,
            image: destaque4,
            img2: destaque5,
            name: 'Tocha de Solda2',
            isNew: true,
            oldPrice: 800,
            price: 699
        },
        {
            id: 5,
            image: destaque5,
            img2: destaque4,
            name: 'Maquina de Solda3',
            isNew: true,
            oldPrice: 11800,
            price: 10699
        },
        {
            id: 6,
            image: destaque6,
            img2: destaque3,
            name: 'Tocha de Solda3',
            isNew: true,
            oldPrice: 1200,
            price: 999
        },
        {
            id: 7,
            image: destaque7,
            img2: destaque2,
            name: 'Maquina de Solda4',
            isNew: true,
            oldPrice: 10200,
            price: 10499
        },
        {
            id: 8,
            image: destaque8,
            img2: destaque1,
            name: 'Tocha de Solda4',
            isNew: true,
            oldPrice: 659,
            price: 555
        }
    ]

    setData(dataImages);

    return (
        <>
            <SectionDestaqueProducts>
                <Title>{type}</Title>
                <Logo>
                    <Image src={destaque1} width={450} height={400} alt="carrossel Loja Builder Seu Negocio Online" />
                </Logo>
                <Carousel ref={carousel}>
                    {data.map((item) => {
                        const { id, name, price, oldPrice, image } = item;
                        return (
                            <Item key={id}>
                                <Images>
                                    <Image src={image} width={450} height={400} alt={name} />
                                </Images>
                                <Info>
                                    <Name>{name}</Name>
                                    <OldPrice>R${oldPrice}</OldPrice>
                                    <Price>R${price}</Price>
                                </Info>
                            </Item>
                        );
                    })}
                </Carousel>
                <Buttons>
                    <Button onClick={handleLeftClick}>
                        <FaArrowRight size={35} color='white' />
                    </Button>
                    <Button onClick={handleRightClick}>
                        <FaArrowLeft size={35} color='white' />
                    </Button>
                </Buttons>
            </SectionDestaqueProducts>
        </>
    );
};

export default DestaqueProducts;