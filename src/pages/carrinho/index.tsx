import Head from "next/head";
import { PageSection } from "../../components/dateStoreUx/styles";
import FooterAccount from "../../components/FooterAccount";
import { use, useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import {
    AtributeProduct,
    BoxCep,
    BoxCupom,
    BoxData,
    BoxDataProduct,
    BoxDelete,
    BoxFinalCart,
    BoxFrete,
    BoxPriceProductCart,
    BoxPrices,
    BoxPricesFinal,
    BoxPricesTotalProduct,
    BoxProductCart,
    BoxQuantidadeCart,
    ButtonCep,
    ButtonCupom,
    ButtonFinal,
    ConditionPrices,
    ContainerData,
    ContainerFrete,
    ContainerProduct,
    ErrorText,
    ImageProductCart,
    InputCupom,
    MaxCart,
    MinCart,
    More,
    NameProduct,
    PriceProduct,
    PriceProductData,
    QuantidadeProductCart,
    SectionCart,
    SubTotal,
    TextCep,
    TextFrete,
    TextSemFrete,
    TextStrong,
    Total,
    ValueQuantCart,
    ValuesMore
} from "./styles";
import { Button } from "../../components/ui/Button";
import Router from "next/router";
import { Avisos } from "../../components/Avisos";
import { HeaderCart } from "../../components/HeaderCart";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";
import { Input } from "../../components/ui/Input";


export default function Carrinho() {
    /* @ts-ignore */
    const { addMoreItemCart, removeItemCart, removeProductCart, cartProducts, totalCart } = useContext(CartContext);


    const [desconto, setDesconto] = useState("");
    const [totalDesconto, setTotalDesconto] = useState(Number);
    const [codePromotion, setCodePromotion] = useState("");
    const [cep, setCep] = useState("");
    const [dataFrete, setDataFrete] = useState<any[]>([]);


    var formatedDesconto = String(totalDesconto);
    formatedDesconto = formatedDesconto + '';
    /* @ts-ignore */
    formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
    formatedDesconto = formatedDesconto + '';
    formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");

    if (formatedDesconto.length > 6) {
        formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    if (formatedDesconto == 'NaN') formatedDesconto = '';
    const descontoFormated = formatedDesconto.replace(".", "");
    const formatedDescontoPonto = descontoFormated.replace(",", ".");
    const formatedCupom = Number(formatedDescontoPonto);

    var freteFormat = String(dataFrete[0]?.Valor);
    freteFormat = freteFormat + '';
    /* @ts-ignore */
    freteFormat = parseInt(freteFormat.replace(/[\D]+/g, ''));
    freteFormat = freteFormat + '';
    freteFormat = freteFormat.replace(/([0-9]{2})$/g, ",$1");

    if (freteFormat.length > 6) {
        freteFormat = freteFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    if (freteFormat == 'NaN') freteFormat = '';
    const formatedPrice = freteFormat.replace(".", "");
    const formatedPricePonto = formatedPrice.replace(",", ".");
    const formatedFrete = Number(formatedPricePonto);

    let dadosFrete: any = [];
    (cartProducts || []).forEach((item) => {
        dadosFrete.push({
            "peso": item.weight * item.amount,
            "comprimento": item.depth * item.amount,
            "altura": item.height * item.amount,
            "largura": item.width * item.amount
        });
    });

    var totalPeso = 0;
    var totalComprimento = 0;
    var totalAltura = 0;
    var totalLargura = 0;

    for (var i = 0; i < dadosFrete.length; i++) {
        totalPeso += dadosFrete[i].peso;
        totalComprimento += dadosFrete[i].comprimento;
        totalAltura += dadosFrete[i].altura;
        totalLargura += dadosFrete[i].largura;
    }

    async function searchCep() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.post('/freteCalculo', {
                nCdServico: "04162",
                sCepDestino: cep,
                nVlPeso: totalPeso > 30 ? 28 : totalPeso,
                nCdFormato: 1,
                nVlComprimento: totalComprimento > 82 ? 81 : totalComprimento,
                nVlAltura: totalAltura > 37 ? 36 : totalAltura,
                nVlLargura: totalLargura > 82 ? 81 : totalLargura
            });

            setDataFrete(data);

        } catch (error) {
            console.log(error)
        }
    }

    async function loadCupomCode() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/getCouponCart?code=${codePromotion}`);

            if (data === null) {
                toast.error("Não ha cupom promocional ativo, ou com esse nome.");
                return;
            }

            console.log("Dados inicio da funcao: ", data)

            /*"Valor de desconto", value: "productsValue"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "productsValue") {
                const percent = totalCart - data?.coupomsconditionals[0]?.value;
                setTotalDesconto(percent);
                return;
            } */

            /*"Valor de desconto em todos os produtos da loja", value: "allProductsValue"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "allProductsValue") {
                const percent = totalCart - data?.coupomsconditionals[0]?.value;
                setTotalDesconto(percent);
                return;
            } */

            /*"Valor de desconto no valor total", value: "totalValue"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "totalValue") {
                const percent = totalCart - data?.coupomsconditionals[0]?.value;
                setTotalDesconto(percent);
                return;
            } */

            /*"Frete grátis total", value: "freeShipping"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "freeShipping") {
                
            }

            /*"Valor de desconto no valor do frete", value: "valueShipping"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "valueShipping") {

            } */

            /*"Percentual de desconto no valor do frete", value: "shippingPercent"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "shippingPercent") {
                const percent = totalCart - (totalCart * data?.coupomsconditionals[0]?.value / 100);
                setTotalDesconto(percent);
                return;
            } */

            /*"Percentual de desconto (Produto(s) selecionado(s) para essa promoção)", value: "percentProduct"*/

            if (data?.coupomsconditionals[0]?.conditional === "percentProduct") {

                const cartArray = cartProducts.map(item => item.id);
                const productId = data?.cupomsproducts.map(item => item?.product_id);

                var cupomOk: any = [];
                for (var i = 0; i < cartArray.length; i++) {
                    if (productId.indexOf(cartArray[i]) > -1) {
                        cupomOk.push(cartArray[i]);
                    }
                }

                if (cupomOk?.length === 0) {
                    toast.error('Nenhum dos produtos no carrinho de compras estão dentro dessa promoção.');
                } else {

                    const cartArrayPrice = cartProducts.map(item => item.price);
                    /* const cartArrayCount = cartProducts.map(item => item.amount); */
                    const productPrice = data?.cupomsproducts.map(item => item?.product?.promotion);

                    var cupomOkPrice: any = [];
                    for (var i = 0; i < cartArrayPrice.length; i++) {
                        if (productPrice.indexOf(cartArrayPrice[i]) > -1) {
                            cupomOkPrice.push(cartArrayPrice[i] - (cartArrayPrice[i] * data?.coupomsconditionals[0]?.value / 100));
                        };
                    };

                    var totalPriceDescProduct = 0;

                    for (var i = 0; i < cupomOkPrice.length; i++) {
                        totalPriceDescProduct += cupomOkPrice[i];
                    }

                    console.log(totalPriceDescProduct)

                    setDesconto(data?.name);
                    setTotalDesconto(totalPriceDescProduct + formatedFrete);

                    return;
                }

            }

            /*"Percentual de desconto no valor total", value: "totalPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalPercent") {
                const maisCart = totalCart - (totalCart * data?.coupomsconditionals[0]?.value / 100);
                const totalPercentStore = formatedFrete + maisCart;

                setDesconto(data?.name);
                setTotalDesconto(totalPercentStore);

                return;
            }

            /*"Percentual de desconto em todos os produtos da loja", value: "allProductsValuePercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValuePercent") {

                let valuesProducts: any = [];
                (cartProducts || []).forEach((item) => {
                    valuesProducts.push({
                        "preco": item.price * item?.amount - (item.price * item?.amount * data?.coupomsconditionals[0]?.value / 100)
                    });
                });

                var totalPriceDesconto = 0;

                for (var i = 0; i < valuesProducts.length; i++) {
                    totalPriceDesconto += valuesProducts[i].preco;
                }

                setDesconto(data?.name);
                setTotalDesconto(formatedFrete + totalPriceDesconto);

                return;
            }

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }


    console.log("frete: ", formatedFrete)
    console.log("desconto: ", formatedCupom)



    return (
        <>
            <Head>
                <title>Carrinho</title>
            </Head>

            <HeaderCart />

            <PageSection
                style={{ paddingTop: '90px' }}
            >
                <SectionCart>
                    <ContainerProduct>
                        {cartProducts?.length < 1 ? (
                            <Avisos texto="Não há produtos no seu carrinho de compras..." />
                        ) :
                            <>
                                {cartProducts.map((item, index) => {
                                    return (
                                        <BoxProductCart key={index}>
                                            <ImageProductCart>
                                                <Image src={'http://localhost:3333/files/' + item?.image} width={80} height={80} alt={item?.name} />
                                            </ImageProductCart>

                                            <BoxDataProduct>
                                                <BoxData>
                                                    <NameProduct>{item?.name}</NameProduct>
                                                    {item?.relationattributeproducts.map((atr: any, index) => {
                                                        return (
                                                            <AtributeProduct key={index}>{atr?.type}: {atr?.valueAttribute?.value}</AtributeProduct>
                                                        )
                                                    })}
                                                </BoxData>
                                            </BoxDataProduct>

                                            <BoxDelete>
                                                <BsFillTrashFill
                                                    cursor="pointer"
                                                    color="red"
                                                    size={25}
                                                    onClick={() => removeProductCart(item)}
                                                />
                                            </BoxDelete>

                                            <BoxQuantidadeCart>
                                                <QuantidadeProductCart>
                                                    <MinCart
                                                        /* @ts-ignore */
                                                        onClick={() => removeItemCart(item?.id)}
                                                    >
                                                        -
                                                    </MinCart>
                                                    <ValueQuantCart>{item?.amount}</ValueQuantCart>
                                                    <MaxCart
                                                        /* @ts-ignore */
                                                        onClick={() => addMoreItemCart(item?.id)}
                                                    >
                                                        +
                                                    </MaxCart>
                                                </QuantidadeProductCart>
                                            </BoxQuantidadeCart>

                                            <BoxPriceProductCart>
                                                <PriceProduct>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price)}</PriceProduct>
                                            </BoxPriceProductCart>

                                            <BoxPricesTotalProduct>
                                                <BoxPrices>
                                                    <PriceProductData>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price * item?.amount)}</PriceProductData>
                                                    <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price * item?.amount / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                                </BoxPrices>
                                            </BoxPricesTotalProduct>
                                        </BoxProductCart>
                                    )
                                })}
                            </>
                        }
                    </ContainerProduct>

                    <ContainerData>
                        <TextCep>Digite o CEP de entrega para calcular o frete.</TextCep>
                        <BoxCep>
                            <Input
                                style={{ backgroundColor: 'white', color: 'black' }}
                                /* @ts-ignore */
                                as={IMaskInput}
                                /* @ts-ignore */
                                mask="00000-000"
                                type="text"
                                placeholder="CEP"
                                onChange={(e) => setCep(e.target.value)}
                            />
                            <ButtonCep
                                onClick={searchCep}
                            >
                                Calcular
                            </ButtonCep>

                            {dataFrete.map((item, index) => {
                                return (
                                    <ContainerFrete key={index}>
                                        <BoxFrete>
                                            {item?.Valor === "0,00" || item?.Valor === "" || item?.Valor === "0" ? (
                                                <ErrorText>Erro ao calcular o frete.</ErrorText>
                                            ) :
                                                <>
                                                    <TextFrete>Valor do frete: <TextStrong>R${item?.Valor}</TextStrong></TextFrete>
                                                    <TextFrete>Prazo de entrega em dia(s) úteis: <TextStrong>{item?.PrazoEntrega} dia(s)</TextStrong></TextFrete>
                                                </>
                                            }
                                        </BoxFrete>
                                    </ContainerFrete>
                                )
                            })}

                        </BoxCep>

                        {formatedFrete ? (
                            <>
                                <TextCep>Possui um cupom de desconto? Insira o código do cupom abaixo, e clique em calcular para poder aplicar seu cupom, OBS: è possivel usar apenas um código de cupom por pedido!</TextCep>

                                <BoxCupom>
                                    <InputCupom
                                        placeholder="CÓDIGO"
                                        onChange={(e) => setCodePromotion(e.target.value)}
                                    />
                                    <ButtonCupom
                                        onClick={loadCupomCode}
                                    >
                                        Calcular
                                    </ButtonCupom>
                                </BoxCupom>
                            </>
                        ) :
                            null
                        }

                        {formatedFrete === 0 && formatedCupom === 0 ? (
                            <>
                                <TextSemFrete>(Total ainda sem frete, ou qualquer tipo de desconto)</TextSemFrete>
                                <BoxPricesFinal>
                                    <Total>TOTAL</Total>
                                    <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</Total>
                                </BoxPricesFinal>

                                <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart / 12)} com juros de Cartão de Crédito</ConditionPrices>
                            </>
                        ) :
                            <>
                                {formatedCupom ? (
                                    <>
                                        <BoxPricesFinal>
                                            <Total>SUBTOTAL</Total>
                                            <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</Total>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal></SubTotal>
                                            <More>+</More>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal>FRETE</SubTotal>
                                            <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(formatedFrete)}</ValuesMore>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal></SubTotal>
                                            <More>-</More>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal>DESCONTO</SubTotal>
                                            <ValuesMore>{desconto}</ValuesMore>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal></SubTotal>
                                            <More>=</More>
                                        </BoxPricesFinal>
                                        <hr />
                                        <BoxPricesFinal>
                                            <Total>TOTAL</Total>
                                            <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(formatedCupom)}</Total>
                                        </BoxPricesFinal>

                                        <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format((formatedCupom) / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                    </>
                                ) :
                                    <>
                                        <BoxPricesFinal>
                                            <SubTotal>FRETE</SubTotal>
                                            <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(formatedFrete)}</ValuesMore>
                                        </BoxPricesFinal>
                                        <BoxPricesFinal>
                                            <SubTotal></SubTotal>
                                            <More>+</More>
                                        </BoxPricesFinal>
                                        <hr />
                                        <BoxPricesFinal>
                                            <Total>TOTAL</Total>
                                            <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart + formatedFrete)}</Total>
                                        </BoxPricesFinal>

                                        <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart + formatedFrete / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                    </>
                                }

                            </>
                        }

                        <BoxFinalCart>
                            <Button
                                style={{ margin: '30px 0' }}
                            >
                                FINALIZAR COMPRA
                            </Button>

                            <ButtonFinal
                                onClick={() => Router.back()}
                            >
                                CONTINUAR COMPRANDO
                            </ButtonFinal>
                        </BoxFinalCart>
                    </ContainerData>
                </SectionCart >
            </PageSection >
            <br />
            <br />
            <FooterAccount />
        </>
    )
}