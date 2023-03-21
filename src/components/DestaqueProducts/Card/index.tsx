

import Link from 'next/link';
import {
    CardBox,
    ImageBox,
    TitleProduct,
    PriceBox,
    TextDestaque,
    PriceOld,
    PriceNew
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
                    {item.isNew && <TextDestaque>Novo Produto</TextDestaque>}
                    <Image src={item?.img} width={250} height={350} alt="foto Produto Destaque Builder Seu Negocio Online" />
                    <Image src={item?.img2} width={250} height={350} alt="foto Produto Destaque Builder Seu Negocio Online" />
                </ImageBox>
                <TitleProduct>{item?.title}</TitleProduct>
                <PriceBox>
                    <PriceOld>R${item?.oldPrice}</PriceOld>
                    <PriceNew>R${item?.price}</PriceNew>
                </PriceBox>
            </CardBox>
        </Link>
    );
};

export default Card;