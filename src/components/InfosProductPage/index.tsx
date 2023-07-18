import { useState } from "react";
import Modal from 'react-modal';
import {
    Attribute,
    AttributeNoProduct,
    BlockProductNames,
    BoxAddCart,
    BoxCart,
    BoxContentFrete,
    BoxContentproduct,
    BoxHeartFavorite,
    ButtonAddCArtProduct,
    ButtonAvalieProduct,
    ButtonContraProposta,
    ContainerAttributes,
    ContatinerInfosProduct,
    InputCalculoFrete,
    TextAvalie,
    TextCredit,
    TextFrete,
    TextMax,
    TextMin,
    TextNameProduct,
    TextPrice,
    TextPromotion,
    TextQuantidade,
    TextSku,
    TextStock
} from "./styles";
import { AiFillHeart, AiFillStar, AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import { RiAuctionFill } from "react-icons/ri";
import Link from "next/link";
import { ModalLoginAvalie } from "../popups/ModalLoginAvalie";
import { ModalProposta } from "../popups/ModalProposta";


interface InfosRequest {
    product_id: string;
    name: string;
    price: number;
    promotion: number;
    sku: string;
    stock: number;
    relationattributeproducts: any;
    variations: any;
}

const InfosProductPage = ({ product_id, name, price, promotion, sku, stock, relationattributeproducts, variations }: InfosRequest) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleProposta, setModalVisibleProposta] = useState(false);

    const handleZipCode = (event: any) => {
        let input = event.target
        input.value = zipCodeMask(input.value)
    }

    const zipCodeMask = (value: any) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{5})(\d)/, '$1-$2')
        return value
    }

    function handleCloseModalLoginAvalie() {
        setModalVisible(false);
    }

    async function handleOpenModalLoginAvalie() {
        setModalVisible(true);
    }

    function handleCloseModalLoginProposta() {
        setModalVisibleProposta(false);
    }

    async function handleOpenModalLoginProposta() {
        setModalVisibleProposta(true);
    }

    Modal.setAppElement('#__next');

    const priceDivisor = promotion / 12;


    return (
        <>
            <ContatinerInfosProduct>

                <BlockProductNames>
                    <BoxHeartFavorite>
                        <AiOutlineHeart size={30} />
                        <AiFillHeart size={30} color="red" />
                    </BoxHeartFavorite>
                    <TextSku>SKU {sku}</TextSku>
                    <TextNameProduct>{name}</TextNameProduct>
                    <ButtonAvalieProduct
                        onClick={handleOpenModalLoginAvalie}
                    >
                        <AiFillStar color="gold" size={20} />
                        <AiFillStar color="gold" size={20} />
                        <AiFillStar color="gold" size={20} />
                        <AiFillStar color="gold" size={20} />
                        <TextAvalie>Avalie</TextAvalie>
                    </ButtonAvalieProduct>
                </BlockProductNames>

                <ContainerAttributes>
                    {variations.length < 1 ? (
                        <>
                            {relationattributeproducts.map((proVal: any) => {
                                return (
                                    <AttributeNoProduct>
                                        {proVal?.valueAttribute?.value}
                                    </AttributeNoProduct>
                                )
                            })}
                        </>
                    ) :
                        <>
                            {variations.map((item: any) => {
                                return (
                                    item?.productsvariations.map((pro: any) => {
                                        return (
                                            <>
                                                <Link href={`/produto/${pro?.product?.slug}`}>
                                                    {item?.productsvariations.map((val: any) => {
                                                        return (
                                                            val?.product?.relationattributeproducts.map((valu: any) => {
                                                                return (
                                                                    <Attribute>{valu?.valueAttribute?.value}</Attribute>
                                                                )
                                                            })
                                                        )
                                                    })}
                                                </Link>
                                            </>
                                        );
                                    })
                                );
                            })};
                        </>
                    }
                </ContainerAttributes>

                <TextFrete>Aproveite, ainda temos <TextStock>{stock}</TextStock> no estoque.</TextFrete>
                <br />
                <br />
                <BoxContentproduct>
                    <TextPrice>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price)}</TextPrice>
                    <TextPromotion>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(promotion)}</TextPromotion>
                    <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(priceDivisor)} com juros de Cartão de Crédito</TextCredit>
                    <ButtonContraProposta
                        onClick={handleOpenModalLoginProposta}
                    >
                        <RiAuctionFill color="white" size={20} />
                        FAZER CONTRAPROPOSTA
                    </ButtonContraProposta>
                </BoxContentproduct>

                <BoxAddCart>
                    <BoxCart>
                        <TextMin>-</TextMin>
                        <TextQuantidade>1</TextQuantidade>
                        <TextMax>+</TextMax>
                    </BoxCart>
                    <ButtonAddCArtProduct>
                        ADICIONAR AO CARRINHO
                    </ButtonAddCArtProduct>
                </BoxAddCart>

                <BoxContentFrete>
                    <TextFrete>Calcule o frete e o prazo: </TextFrete>
                    <InputCalculoFrete
                        placeholder="Digite seu CEP"
                        type="text"
                        maxLength={9}
                        onKeyUp={(event) => handleZipCode(event)}
                    />
                    <AiOutlineArrowRight
                        size={23}
                        onClick={() => alert('clicou')}
                    />
                </BoxContentFrete>

                <Link href={'https://buscacepinter.correios.com.br/app/endereco/index.php'} target="_blank">NÃO SABE O CEP?</Link>

            </ContatinerInfosProduct>
            {modalVisible && (
                <ModalLoginAvalie
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalLoginAvalie}
                    productId={product_id}
                    productName={name}
                />
            )}
            {modalVisibleProposta && (
                <ModalProposta
                    isOpen={modalVisibleProposta}
                    onRequestClose={handleCloseModalLoginProposta}
                    priceProduct={price}
                    nameProduct={name}
                    skuProduct={sku}
                />
            )}
        </>
    )
};

export default InfosProductPage;