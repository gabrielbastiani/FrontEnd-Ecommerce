import Link from "next/link";
import {
    Add,
    BoxBuy,
    BoxProduct,
    GridSectionProducts,
    Images,
    ImagesHover,
    Info,
    Max,
    Min,
    Name,
    Quantidade,
    ValueQuant
} from "./styles";
import { OldPrice, Price } from "../DestaqueProducts/styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import semimagem from '../../assets/semfoto.png';


interface ProductsRequest {
    products: any;
}

const ProdutosNaCategoria = ({ products }: ProductsRequest) => {
    return (
        <>
            <GridSectionProducts>
                {products.map((prod: any) => {
                    return (
                        <BoxProduct key={prod?.id}>
                            <Link href={'/produto/' + prod?.product?.slug}>
                                <Images>
                                    {prod?.product?.photoproducts[0] ? (
                                        <Image src={'http://localhost:3333/files/' + prod?.product?.photoproducts[0]?.image} width={450} height={300} alt={prod?.product?.name} />
                                    ) :
                                        <Image src={semimagem} width={450} height={400} alt={prod?.product?.name} />
                                    }
                                </Images>
                                <ImagesHover>
                                    {prod?.product?.photoproducts[1] ? (
                                        <Image src={'http://localhost:3333/files/' + prod?.product?.photoproducts[1]?.image} width={450} height={300} alt={prod?.product?.name} />
                                    ) :
                                        <Image src={semimagem} width={450} height={400} alt={prod?.product?.name} />
                                    }
                                </ImagesHover>
                            </Link>
                            <Info>
                                <Link href={'/produto/' + prod?.product?.slug}>
                                    <Name>{prod?.product?.name}</Name>
                                    <OldPrice>De {prod?.product?.promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</OldPrice>
                                    <Price>Por {prod?.product?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Price>
                                </Link>
                                <BoxBuy>
                                    <Quantidade>
                                        <Min>-</Min>
                                        <ValueQuant>1</ValueQuant>
                                        <Max>+</Max>
                                    </Quantidade>
                                    <Add>
                                        <AiOutlineShoppingCart color='white' size={25} />
                                        &emsp;Adicionar
                                    </Add>
                                </BoxBuy>
                            </Info>
                        </BoxProduct>
                    )
                })}
            </GridSectionProducts>
        </>
    );
};

export default ProdutosNaCategoria;