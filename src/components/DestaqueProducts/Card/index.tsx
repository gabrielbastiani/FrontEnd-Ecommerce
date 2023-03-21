

import Link from 'next/link';
import {
    CardBox,
    ImageBox,
    TitleProduct,
    PriceBox
} from './styles';
import Image from 'next/image';


interface CardRequest {
    item: any;
}

const Card = ({ item }: CardRequest) => {


    return (
        <Link href={'/produto/' + `${item?.id}`}>
            <CardBox>
                <ImageBox>
                    <Image src={item?.img} width={250} height={350} alt="foto Produto Destaque Builder Seu Negocio Online" />
                    <Image src={item?.img} width={250} height={350} alt="foto Produto Destaque Builder Seu Negocio Online" />
                </ImageBox>
                <TitleProduct>{item?.title}</TitleProduct>
                <PriceBox>
                    <TitleProduct>R${item?.oldPrice}</TitleProduct>
                    <TitleProduct>R${item?.price}</TitleProduct>
                </PriceBox>
            </CardBox>
        </Link>
    );
};

export default Card;