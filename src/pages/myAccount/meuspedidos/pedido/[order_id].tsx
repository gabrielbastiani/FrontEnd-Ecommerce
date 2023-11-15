import { useRouter } from "next/router";
import { Key, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import Head from "next/head";
import { HeaderAccount } from "../../../../components/HeaderAccount";
import { Card } from "../../../../components/dateClientUx/CardContent/styles";
import Titulos from "../../../../components/Titulos";
import { canSSRAuth } from "../../../../utils/canSSRAuth";
import { setupAPIClient } from "../../../../services/api";
import { AtributeProduct, BlockData, BoxComment, BoxData, BoxDataProduct, BoxPix, BoxPriceProductCart, BoxPrices, BoxPricesTotalProduct, BoxProductCart, BoxTopStatusGeral, BoxTotal, BoxTracking, ButtoQRCode, ButtonPix, ButtonSendComment, Comments, ContainerComments, ContainerCommets, DataComment, DateTracking, GridOrder, ImageProductCart, InputPix, NameProduct, PriceProduct, PriceProductData, SectionOrder, Sku, StatusTop, TextComment, TextData, TextDataOrder, TextTotal, TextUser, TotalFrete, TotalOrder, TotalTop, WhatsButton } from "./styles";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import copy from "copy-to-clipboard";
import moment from "moment";
import { FaCommentDots, FaRegCopy, FaTruckMoving } from "react-icons/fa";
import boleto from '../../../../assets/boleto.png';
import MASTERCARD from '../../../../assets/mastercard.png';
import VISA from '../../../../assets/visa.png';
import american from '../../../../assets/american.png';
import pix from '../../../../assets/pix.png';
import commentss from "../../../../assets/user-comment.png";
import Image from "next/image";
import { TextStrong } from "../../../carrinho/styles";
import { ModalQRCodePayment } from "../../../../components/popups/ModalQRCodePayment";
import { DivisorHorizontal } from "../../../../components/ui/DivisorHorizontal";


interface CustomerProps {
    id: string;
    name: string;
    slug: string;
    email: string;
    cpf: string;
    cnpj: string;
    stateRegistration: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    created_at: string;
}

interface PaymentProps {
    customer_id: string;
    store_cart_id: string;
    transaction_id: number;
    type_payment: string;
    key_payment_pix: string;
    qr_code_pix: string;
    key_valid_pix: string;
    external_resource_url: string;
    expiration_boleto: string;
    first_number_credit_card: string;
    last_number_credit_card: string;
    expiration_month: number;
    expiration_year: number;
    date_created: string;
    created_at: string;
    cardholder_name: string;
    cardholder_identification_cpfCnpj: string;
    cardholder_cpfCnpj: string;
    flag_credit_card: string;
    installment: number;
    installment_amount: number;
    total_payment_juros: number;
    total_payment: number;
    status: string;
}

interface OrderProps {
    cart: any;
    created_at: string;
    name_cupom: string;
    cupom: string;
    data_delivery: string;
    frete: number;
    id_order_store: number;
    weight: number;
}

interface DeliveryPropos {
    id: string;
    customer_id: string;
    addressee: string;
    address: string;
    number: string;
    complement: string;
    reference: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
    phone: string;
    deliverySelected: string;
    created_at: string;
}

export default function Pedido() {

    const router = useRouter();
    let order_id = router.query.order_id;

    const { customer } = useContext(AuthContext);

    const [order, setOrder] = useState<OrderProps>();
    const [idOrder, setIdOrder] = useState(Number);
    const [dataOrder, setDataOrder] = useState();
    const [orderStatus, setOrderStatus] = useState("");
    const [customerDate, setCustomerDate] = useState<CustomerProps>();
    const [cartItens, setCartItens] = useState<any[]>([]);
    const [orderPayment, setOrderPayment] = useState<PaymentProps>();
    const [deliveryOrder, setDeliveryOrder] = useState<DeliveryPropos>();

    const [codeRastreio, setCodeRastreio] = useState("");
    const [keyPix, setKeyPix] = useState("");
    const [keyPixQRCode, setKeyPixQRCode] = useState("");

    const [commentOrder, setCommentOrder] = useState("");
    const [comments, setComments] = useState<any[]>([]);

    const [modalVisibleQRCode, setModalVisibleQRCode] = useState(false);

    const [trackingHistory, setTrackingHistory] = useState<any[]>([]);

    const payFrete = Number(order?.frete);
    const totalPay = Number(orderPayment?.total_payment_juros ? orderPayment?.total_payment_juros : orderPayment?.total_payment);
    const payInstallment = Number(orderPayment?.installment_amount);

    const copyToClipboard = () => {
        copy(keyPix);
        toast.success(`Você copiou o código com sucesso!!!`);
    }

    /* @ts-ignore */
    const idShips = String(order?.shipmentsTrackings[0]?.id);

    useEffect(() => {
        async function loadRastreio() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findAllDateTracking?shippingTracking_id=${idShips}`);

                setTrackingHistory(data || []);

            } catch (error) {
                console.log(error);
            }
        }
        loadRastreio();
    }, [idShips]);

    useEffect(() => {
        async function loadorderdata() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactOrderStore?order_id=${order_id}`);

                setOrder(data || []);

                setIdOrder(data.id_order_store);
                setCustomerDate(data.customer || {});
                setDataOrder(data.created_at);
                setCartItens(data.cart || []);
                setOrderPayment(data.payment || {});
                setDeliveryOrder(data.deliveryAddressCustomer || {});
                setCodeRastreio(data?.shipmentsTrackings[0]?.code_tracking || "");
                setKeyPix(data?.payment?.key_payment_pix || "");
                setKeyPixQRCode(data?.payment?.qr_code_pix || "");
                setOrderStatus(data?.statusOrder[0]?.status_order || "");

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadorderdata();
    }, [order_id]);

    useEffect(() => {
        async function loadCommentsOrder() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/orderCommentsStore?order_id=${order_id}`);
                setComments(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCommentsOrder();
    }, [order_id]);

    async function loadCommentsOrder() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/orderCommentsStore?order_id=${order_id}`);
            setComments(data || []);
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    const storeCommentUser = customer?.name;

    async function handleCommentsOrder() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post(`/createOrderCommentsStore`, {
                comment: commentOrder,
                order_id: order_id,
                user_comment: storeCommentUser
            });

            toast.success("Comentários adicionado com sucesso");

            setCommentOrder("");

            loadCommentsOrder();

        } catch (error) {
            console.log(error.response.data);
            toast.error("Ops... erro ao adicionar esse comentario");
        }
    }

    function handleCloseModalQRCode() {
        setModalVisibleQRCode(false);
    }

    async function handleOpenModalQRCode() {
        setModalVisibleQRCode(true);
    }

    Modal.setAppElement('body');




    return (
        <>
            <Head>
                <title>Pedido</title>
            </Head>

            <SectionOrder>

                <HeaderAccount />

                <Card>

                    <Titulos tipo="h2" titulo={`Pedido - #${idOrder} | Data: ${moment(dataOrder).format('DD/MM/YYYY - HH:mm')}`} />

                    <BoxTopStatusGeral>
                        {orderStatus === "PENDING" ?
                            <StatusTop style={{
                                backgroundColor: 'yellow',
                                color: 'black'
                            }}>
                                Pendente de Pagamento
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "CONFIRMED" ?
                            <StatusTop style={{
                                backgroundColor: 'green',
                                color: 'white'
                            }}>
                                Pago
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "AWAITING_RISK_ANALYSIS" ?
                            <StatusTop style={{
                                backgroundColor: 'orange',
                                color: 'white'
                            }}>
                                Procesando
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "REFUNDED" ?
                            <StatusTop style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Rejeitado
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "RECEIVED" ?
                            <StatusTop style={{
                                backgroundColor: 'orange',
                                color: 'white'
                            }}>
                                Saldo creditado
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "OVERDUE" ?
                            <StatusTop style={{
                                backgroundColor: 'blue',
                                color: 'white'
                            }}>
                                Cobrança vencida
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "CANCELLED" ?
                            <StatusTop style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Cancelado
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "CANCELLED" ?
                            <StatusTop style={{
                                backgroundColor: 'brown',
                                color: 'white'
                            }}>
                                Devolvido
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "CHARGEBACK_REQUESTED" ?
                            <StatusTop style={{
                                backgroundColor: 'white',
                                color: 'black'
                            }}>
                                Estornado
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "REFUND_REQUESTED" ?
                            <StatusTop style={{
                                backgroundColor: 'gray',
                                color: 'white'
                            }}>
                                Estorno Solicitado
                            </StatusTop>
                            :
                            null
                        }

                        {orderStatus === "REFUND_IN_PROGRESS" ?
                            <StatusTop style={{
                                backgroundColor: 'violet',
                                color: 'white'
                            }}>
                                Estorno em processo
                            </StatusTop>
                            :
                            null
                        }

                        <TotalFrete>
                            <FaTruckMoving size={20} />
                            Frete: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payFrete)}
                        </TotalFrete>

                        {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "MASTERCARD" ?
                            <TotalTop>
                                <Image src={MASTERCARD} width={100} height={50} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                        {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "VISA" ?
                            <TotalTop>
                                <Image src={VISA} width={100} height={50} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                        {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "AMEX" ?
                            <TotalTop>
                                <Image src={american} width={100} height={50} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                        {orderPayment?.type_payment === "Boleto bancário" ?
                            <TotalTop>
                                <Image src={boleto} width={100} height={50} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                        {orderPayment?.type_payment === "PIX" ?
                            <TotalTop>
                                <Image src={pix} width={100} height={50} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                    </BoxTopStatusGeral>

                    <GridOrder>
                        <Card>
                            <Titulos tipo="h2" titulo="Dados do Pedido" />

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>{customerDate?.cnpj ? "Empresa" : "Nome"}</TextStrong>
                                <TextDataOrder>{customerDate?.name}</TextDataOrder>
                            </BlockData>

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>Cliente desde</TextStrong>
                                <TextDataOrder>{moment(customerDate?.created_at).format('DD/MM/YYYY')}</TextDataOrder>
                            </BlockData>

                            {customerDate?.stateRegistration ?
                                <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                    <TextStrong>Inscrição Estadual</TextStrong>
                                    <TextDataOrder>{customerDate?.stateRegistration}</TextDataOrder>
                                </BlockData>
                                :
                                null
                            }

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>{customerDate?.cnpj ? "CNPJ" : "CPF"}</TextStrong>
                                <TextDataOrder>{customerDate?.cnpj ? customerDate?.cnpj : customerDate?.cpf}</TextDataOrder>
                            </BlockData>

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>E-mail</TextStrong>
                                <TextDataOrder>{customerDate?.email}</TextDataOrder>
                            </BlockData>

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>Telefone</TextStrong>
                                <TextDataOrder>{customerDate?.phone}</TextDataOrder>
                            </BlockData>

                        </Card>

                        <Card>
                            <Titulos tipo="h2" titulo="Envio" />

                            <BlockData>
                                <TextDataOrder style={{ display: 'flex', fontWeight: '800' }}>{deliveryOrder?.addressee}</TextDataOrder>
                                <TextDataOrder>{deliveryOrder?.address} - {deliveryOrder?.number} - {deliveryOrder?.complement} - {deliveryOrder?.reference}</TextDataOrder>
                                <br />
                                <br />
                                <TextStrong style={{ fontWeight: '800' }}>Frete</TextStrong>
                                <br />
                                <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payFrete)}</TextDataOrder>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <TextDataOrder>{order?.data_delivery}</TextDataOrder>
                                <br />
                                <br />
                                <TextDataOrder>Peso Total: {order?.weight}Kg</TextDataOrder>
                            </BlockData>

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <br />
                                <TextDataOrder>CÓDIGO DE RASTREIO: {trackingHistory[0]?.code_tracking}</TextDataOrder>
                            </BlockData>

                            {trackingHistory.map((item, index) => {
                                return (
                                    <>
                                        <BoxTracking key={index}>
                                            <TextDataOrder>STATUS: {item.status_frete}</TextDataOrder>
                                            <DateTracking>{moment(item.created_at).format('DD/MM/YYYY - HH:mm')}</DateTracking>
                                            <DivisorHorizontal />
                                        </BoxTracking>
                                    </>
                                )
                            })}

                        </Card>

                        <Card>
                            <Titulos tipo="h2" titulo="Pagamento" />

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>Forma de Pagamento</TextStrong>

                                {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "MASTERCARD" ?
                                    <>
                                        <TextDataOrder style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Cartão de Crédito = Master
                                            <Image src={MASTERCARD} width={150} height={85} alt="pagamento" />
                                        </TextDataOrder>

                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            {orderPayment?.cardholder_name}
                                        </TextDataOrder>
                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                        </TextDataOrder>
                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                        </TextDataOrder>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor parcelado</TextStrong>
                                            <TextDataOrder>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextDataOrder>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                        </BlockData>
                                    </>
                                    :
                                    null
                                }

                                {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "VISA" ?
                                    <>
                                        <TextDataOrder style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Cartão de Crédito = Visa
                                            <Image src={VISA} width={150} height={85} alt="pagamento" />
                                        </TextDataOrder>

                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            {orderPayment?.cardholder_name}
                                        </TextDataOrder>
                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                        </TextDataOrder>
                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                        </TextDataOrder>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor parcelado</TextStrong>
                                            <TextDataOrder>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextDataOrder>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                        </BlockData>
                                    </>
                                    :
                                    null
                                }

                                {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "AMEX" ?
                                    <>
                                        <TextDataOrder style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Cartão de Crédito = American Express
                                            <Image src={american} width={150} height={85} alt="pagamento" />
                                        </TextDataOrder>

                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            {orderPayment?.cardholder_name}
                                        </TextDataOrder>
                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                        </TextDataOrder>
                                        <TextDataOrder style={{ marginBottom: '8px' }}>
                                            Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                        </TextDataOrder>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor parcelado</TextStrong>
                                            <TextDataOrder>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextDataOrder>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                        </BlockData>
                                    </>
                                    :
                                    null
                                }

                                {orderPayment?.type_payment === "Boleto bancário" ?
                                    <>
                                        <TextDataOrder style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Boleto bancário
                                            <Image src={boleto} width={150} height={85} alt="pagamento" />
                                        </TextDataOrder>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                        </BlockData>
                                    </>
                                    :
                                    null
                                }

                                {orderPayment?.type_payment === "PIX" ?
                                    <>
                                        <BoxPix>
                                            <TextData style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                                PIX
                                                <Image src={pix} width={150} height={85} alt="pagamento" />
                                            </TextData>
                                            <TextData>Chave Pix</TextData>
                                            <InputPix type="text" value={keyPix} />
                                            <ButtonPix onClick={copyToClipboard}>
                                                <FaRegCopy size={25} />
                                            </ButtonPix>
                                        </BoxPix>

                                        <ButtoQRCode onClick={handleOpenModalQRCode}>
                                            Abrir QR Code
                                        </ButtoQRCode>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Chave Válida até</TextStrong>
                                            <TextDataOrder>{moment(orderPayment?.key_valid_pix).format('DD/MM/YYYY - HH:mm')}</TextDataOrder>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                        </BlockData>
                                    </>
                                    :
                                    null
                                }
                            </BlockData>

                        </Card>
                    </GridOrder>

                    {order?.cupom ? (
                        <Card>
                            <Titulos tipo="h2" titulo="Detalhes Adicionais" />

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong style={{ fontSize: '20px', marginBottom: '5px' }}>Promoções</TextStrong>
                                <br />
                                <TextDataOrder style={{ fontWeight: '00' }}>Nome do cupom: {order?.name_cupom}</TextDataOrder>
                                <br />
                                <TextDataOrder style={{ fontWeight: '00' }}>Código de cupom: {order?.cupom}</TextDataOrder>
                            </BlockData>

                        </Card>
                    ) :
                        null
                    }

                    {cartItens.map((prod, index: Key) => {
                        return (
                            <BoxProductCart key={index}>
                                <ImageProductCart>
                                    <Image src={'http://localhost:3333/files/' + prod?.product?.photoproducts[0]?.image} width={80} height={80} alt={prod?.product?.name} />
                                </ImageProductCart>

                                <BoxDataProduct>
                                    <BoxData>
                                        <Sku>SKU: {prod?.product?.sku}</Sku>
                                        <NameProduct>{prod?.product?.name}</NameProduct>
                                        {prod?.product?.relationattributeproducts.map((atr: any, index: Key) => {
                                            return (
                                                <AtributeProduct key={index}>{atr?.valueAttribute?.type}: {atr?.valueAttribute?.value}</AtributeProduct>
                                            )
                                        })}
                                    </BoxData>
                                </BoxDataProduct>

                                <BoxPricesTotalProduct>
                                    <BoxPrices>
                                        <PriceProductData
                                            style={{ fontSize: '16px' }}
                                        >
                                            {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.product?.promotion ? prod?.product?.promotion : prod?.product?.price)}
                                        </PriceProductData>
                                    </BoxPrices>
                                </BoxPricesTotalProduct>

                                <BoxPriceProductCart>
                                    <PriceProduct>Qtd: {prod?.amount}</PriceProduct>
                                </BoxPriceProductCart>

                                <BoxPricesTotalProduct>
                                    <BoxPrices>
                                        <PriceProductData>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.product?.promotion ? prod?.product?.promotion * prod?.amount : prod?.product?.price * prod?.amount)}</PriceProductData>
                                    </BoxPrices>
                                </BoxPricesTotalProduct>
                            </BoxProductCart>
                        )
                    })}

                    <Card>
                        <BoxTotal>
                            <TextTotal>TOTAL:</TextTotal>
                            <TotalOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TotalOrder>
                        </BoxTotal>
                    </Card>

                    <Card>
                        <Titulos tipo="h3" titulo="Comentários" />

                        <ContainerCommets>
                            <TextComment
                                value={commentOrder}
                                onChange={(e) => setCommentOrder(e.target.value)}
                            />

                            <ButtonSendComment
                                onClick={handleCommentsOrder}
                            >
                                <FaCommentDots size={25} />
                                POSTAR
                            </ButtonSendComment>
                        </ContainerCommets>

                        {comments.map((item, index: Key) => {
                            return (
                                <ContainerComments key={index}>
                                    {item?.active === "Sim" ? (
                                        <>
                                            <DataComment>{moment(item?.created_at).format('DD/MM/YYYY - HH:mm')}</DataComment>
                                            <BoxComment>
                                                <Image src={commentss} width={80} height={80} alt="foto-comentario" />
                                                <Comments><TextUser>{item?.user_comment} = </TextUser>{item?.comment}</Comments>
                                            </BoxComment>
                                        </>
                                    ) :
                                        null
                                    }
                                </ContainerComments>
                            )
                        })}

                    </Card>

                </Card>

            </SectionOrder>
            {modalVisibleQRCode && (
                <ModalQRCodePayment
                    isOpen={modalVisibleQRCode}
                    onRequestClose={handleCloseModalQRCode}
                    qrCode={keyPixQRCode}
                />
            )}
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});