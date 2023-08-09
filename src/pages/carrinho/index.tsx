import Head from "next/head";
import { PageSection } from "../../components/dateStoreUx/styles";
import FooterAccount from "../../components/FooterAccount";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import { AtributeProduct, BoxCep, BoxCupom, BoxData, BoxDataProduct, BoxDelete, BoxFinalCart, BoxPriceProductCart, BoxPrices, BoxPricesFinal, BoxPricesTotalProduct, BoxProductCart, BoxQuantidadeCart, ButtonCep, ButtonCupom, ButtonFinal, ConditionPrices, ContainerData, ContainerProduct, ImageProductCart, InputCep, InputCupom, MaxCart, MinCart, NameProduct, PriceProduct, PriceProductData, QuantidadeProductCart, SectionCart, SubTotal, TextCep, Total, ValueQuantCart } from "./styles";
import { Button } from "../../components/ui/Button";
import Router from "next/router";
import { Avisos } from "../../components/Avisos";
import { HeaderCart } from "../../components/HeaderCart";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

export default function Carrinho() {
    /* @ts-ignore */
    const { addMoreItemCart, removeItemCart, removeProductCart, cartProducts, totalCart } = useContext(CartContext);

    const cartArray = cartProducts.map(item => item.id);
    const [totalDesconto, setTotalDesconto] = useState(Number);
    const [codePromotion, setCodePromotion] = useState("");
    const [productCupom, setProductCupom] = useState<any[]>([]);


    console.log(totalDesconto)


    async function loadCupomCode() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/getCouponCart?code=${codePromotion}`);

            if (data === null) {
                toast.error("Não ha cupom promocional ativo, ou com esse nome.");
                return;
            }

            console.log(data)

            /*"Valor de desconto", value: "productsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "productsValue") {
                /* @ts-ignore */
                const percent = totalCart - data?.coupomsconditionals[0]?.value;
                setTotalDesconto(percent);
                return;
            }

            /*"Valor de desconto em todos os produtos da loja", value: "allProductsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValue") {
                /* @ts-ignore */
                const percent = totalCart - data?.coupomsconditionals[0]?.value;
                setTotalDesconto(percent);
                return;
            }

            /*"Valor de desconto no valor total", value: "valueProduct"*/

            if (data?.coupomsconditionals[0]?.conditional === "valueProduct") {
                /* @ts-ignore */
                const percent = totalCart - data?.coupomsconditionals[0]?.value;
                setTotalDesconto(percent);
                return;
            }

            /*"Frete grátis total", value: "freeShipping"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "freeShipping") {
                
            }

            /*"Valor de desconto no valor do frete", value: "valueShipping"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "valueShipping") {

            } */

            /*"Percentual de desconto no valor do frete", value: "shippingPercent"*/

            /* if (data?.coupomsconditionals[0]?.conditional === "shippingPercent") {

            } */

            /*"Percentual de desconto", value: "percent"*/

            if (data?.coupomsconditionals[0]?.conditional === "percent") {
                
                const percent = totalCart - (totalCart * data?.coupomsconditionals[0]?.value / 100);
                setTotalDesconto(percent);
                return;
            }

            /*"Percentual de desconto no valor total", value: "percentAll"*/

            if (data?.coupomsconditionals[0]?.conditional === "percentAll") {
                /* @ts-ignore */
                const percent = totalCart - (totalCart * data?.coupomsconditionals[0]?.value / 100);
                setTotalDesconto(percent);
                return;
            }

            /*"Percentual de desconto em todos os produtos da loja", value: "allProductsValuePercent"*/
            
            if (data?.coupomsconditionals[0]?.conditional === "allProductsValuePercent") {
                /* @ts-ignore */
                const percent = totalCart - (totalCart * data?.coupomsconditionals[0]?.value / 100);
                setTotalDesconto(percent);
                return;
            }

            const productId = data?.cupomsproducts.map(item => item?.product_id);

            var cupomOk = [];
            setProductCupom(cupomOk);

            for (var i = 0; i < cartArray.length; i++) {
                if (productId.indexOf(cartArray[i]) > -1) {
                    cupomOk.push(cartArray[i]);
                }
            }

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }


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
                                {cartProducts.map((item) => {
                                    return (
                                        <BoxProductCart key={item?.id}>
                                            <ImageProductCart>
                                                <Image src={'http://localhost:3333/files/' + item?.image} width={80} height={80} alt={item?.name} />
                                            </ImageProductCart>

                                            <BoxDataProduct>
                                                <BoxData>
                                                    <NameProduct>{item?.name}</NameProduct>
                                                    {item?.relationattributeproducts.map((atr: any) => {
                                                        return (
                                                            <AtributeProduct key={atr?.id}>{atr?.type}: {atr?.valueAttribute?.value}</AtributeProduct>
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
                            <InputCep
                                placeholder="CEP"
                            />
                            <ButtonCep>Calcular</ButtonCep>
                        </BoxCep>

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

                        <BoxPricesFinal>
                            <SubTotal>SUBTOTAL</SubTotal>
                            <SubTotal>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</SubTotal>
                        </BoxPricesFinal>
                        <hr />

                        {totalDesconto === 0 ? (
                            <>
                                <BoxPricesFinal>
                                    <Total>TOTAL</Total>
                                    <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</Total>
                                </BoxPricesFinal>

                                <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart / 12)} com juros de Cartão de Crédito</ConditionPrices>
                            </>
                        ) :
                            <>
                                <BoxPricesFinal>
                                    <Total>TOTAL</Total>
                                    <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalDesconto)}</Total>
                                </BoxPricesFinal>

                                <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalDesconto / 12)} com juros de Cartão de Crédito</ConditionPrices>
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