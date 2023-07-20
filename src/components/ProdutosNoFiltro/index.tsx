import Link from "next/link";
import {
    Add,
    BoxBuy,
    BoxPages,
    BoxProduct,
    ButtonPage,
    ContainerPage,
    ContainerPagination,
    GridSectionProducts,
    Images,
    ImagesHover,
    Info,
    Max,
    Min,
    Name,
    Next,
    Previus,
    Quantidade,
    TextPage,
    ValueQuant
} from "./styles";
import { OldPrice, Price, TextCredit } from "../DestaqueProducts/styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import semimagem from '../../assets/semfoto.png';
import { TextPromotion } from "../InfosProductPage/styles";


interface ProductsRequest {
    products: any;
    currentPage: any;
    setCurrentPage: any;
    pages: any;
}

const ProdutosNoFiltro = ({ products, currentPage, setCurrentPage, pages }: ProductsRequest) => {
    return (
        <>
            <GridSectionProducts>
                {products.map((prod: any) => {
                    return (
                        <BoxProduct key={prod?.id}>
                            <Link href={'/produto/' + prod?.slug}>
                                <Images>
                                    {prod?.photoproducts[0] ? (
                                        <Image src={'http://localhost:3333/files/' + prod?.photoproducts[0]?.image} width={450} height={300} alt={prod?.name} />
                                    ) :
                                        <Image src={semimagem} width={450} height={400} alt={prod?.name} />
                                    }
                                </Images>
                                <ImagesHover>
                                    {prod?.photoproducts[1] ? (
                                        <Image src={'http://localhost:3333/files/' + prod?.photoproducts[1]?.image} width={450} height={300} alt={prod?.name} />
                                    ) :
                                        <Image src={semimagem} width={450} height={400} alt={prod?.name} />
                                    }
                                </ImagesHover>
                            </Link>
                            {prod?.stock === 0 ? (
                                <Info>
                                    <Link href={'/produto/' + prod?.slug}>
                                        <Name>{prod?.name}</Name>
                                        <OldPrice>De {prod?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</OldPrice>
                                        <Price>Por {prod?.promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Price>
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
                                        <OldPrice>De {prod?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</OldPrice>
                                        <Price>Por {prod?.promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Price>
                                        <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price / 12)} com juros de Cartão de Crédito</TextCredit>
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
                            }
                        </BoxProduct>
                    )
                })}
            </GridSectionProducts>

            <ContainerPagination>
                <ContainerPage>
                    {currentPage > 1 && (
                        <Previus>
                            <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                Voltar
                            </ButtonPage>
                        </Previus>
                    )}

                    {pages.map((page: any) => (
                        <BoxPages
                            key={page}
                        >
                            <TextPage
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </TextPage>
                        </BoxPages>
                    ))}

                    {currentPage < products?.length && (
                        <Next>
                            <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                Avançar
                            </ButtonPage>
                        </Next>
                    )}
                </ContainerPage>
            </ContainerPagination>
        </>
    );
};

export default ProdutosNoFiltro;