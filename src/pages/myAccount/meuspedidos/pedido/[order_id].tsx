import { useRouter } from "next/router";
import { Key, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import Head from "next/head";
import { HeaderAccount } from "../../../../components/HeaderAccount";
import { Card } from "../../../../components/dateClientUx/CardContent/styles";
import Titulos from "../../../../components/Titulos";
import { canSSRAuth } from "../../../../utils/canSSRAuth";
import { setupAPIClient } from "../../../../services/api";
import { AtributeProduct, BlockData, BoxComment, BoxData, BoxDataProduct, BoxPix, BoxPriceProductCart, BoxPrices, BoxPricesTotalProduct, BoxProductCart, BoxTopStatusGeral, BoxTotal, ButtoQRCode, ButtonPix, ButtonSendComment, Comments, ContainerComments, ContainerCommets, DataComment, GridOrder, ImageProductCart, InputPix, NameProduct, PriceProduct, PriceProductData, SectionOrder, Sku, StatusTop, TextComment, TextData, TextTotal, TextUser, TotalFrete, TotalOrder, TotalTop, WhatsButton } from "./styles";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import copy from "copy-to-clipboard";
import moment from "moment";
import { FaCommentDots, FaRegCopy, FaTruckMoving } from "react-icons/fa";
import boleto from '../../../../assets/boleto.png';
import master from '../../../../assets/mastercard.png';
import visa from '../../../../assets/visa.png';
import american from '../../../../assets/american.png';
import pix from '../../../../assets/pix.png';
import commentss from "../../../../assets/user-comment.png";
import Image from "next/image";
import { TextStrong } from "../../../carrinho/styles";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { ModalQRCodePayment } from "../../../../components/popups/ModalQRCodePayment";


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
    cardholder_name: string;
    cardholder_identification: {
        name: string;
        identification: any;
    }
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

interface FreteProps {
    id: string;
    order_id: string;
    code_tracking: string;
    delivery_history: string;
    created_at: string;
}

export default function Pedido() {

    const router = useRouter();
    let order_id = router.query.order_id;

    const { customer } = useContext(AuthContext);

    const [order, setOrder] = useState<OrderProps>();
    const [idOrder, setIdOrder] = useState(Number);
    const [dataOrder, setDataOrder] = useState();
    const [cupom, setCupom] = useState('');
    const [customerDate, setCustomerDate] = useState<CustomerProps>();
    const [cartItens, setCartItens] = useState<any[]>([]);
    const [shipments, setShipments] = useState<FreteProps>();
    const [orderComments, setOrderComments] = useState<{}>();
    const [orderPayment, setOrderPayment] = useState<PaymentProps>();
    const [deliveryOrder, setDeliveryOrder] = useState<DeliveryPropos>();

    const [codeRastreio, setCodeRastreio] = useState("");
    const [keyPix, setKeyPix] = useState("");
    const [keyPixQRCode, setKeyPixQRCode] = useState("");

    const [store, setStore] = useState("");
    const [logoStore, setLogoStore] = useState("");
    const [commentOrder, setCommentOrder] = useState("");
    const [comments, setComments] = useState<any[]>([]);

    const [active, setActive] = useState('Nao');
    const [check, setCheck] = useState(false);

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
    };

    const [modalVisibleQRCode, setModalVisibleQRCode] = useState(false);

    const payFrete = Number(order?.frete);
    const totalPay = Number(orderPayment?.total_payment_juros ? orderPayment?.total_payment_juros : orderPayment?.total_payment);
    const payInstallment = Number(orderPayment?.installment_amount);

    const telefone = String(customerDate?.phone);

    function removerAcentos(s: any) {
        return s.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace('(', "")
            .replace(')', "")
            .replace(' ', "")
            .replace('-', "")
            .replace('.', "")
            .replace(',', "")
    }

    const tel = removerAcentos(telefone);

    const copyToClipboard = () => {
        copy(keyPix);
        toast.success(`Você copiou o código com sucesso!!!`);
    }

    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/store`);
                setStore(data.name || "");
                setLogoStore(data.logo || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    useEffect(() => {
        async function loadorderdata() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactOrderStore?order_id=${order_id}`);

                setOrder(data || []);

                setIdOrder(data.id_order_store);
                setCustomerDate(data.customer || {});
                setDataOrder(data.created_at);
                setCupom(data.cupom);
                setCartItens(data.cart || []);
                setShipments(data.shipmentsTrackings || {});
                setOrderComments(data.orderComments || {});
                setOrderPayment(data.payment || {});
                setDeliveryOrder(data.deliveryAddressCustomer || {});/* @ts-ignore */
                setCodeRastreio(order?.shipmentsTrackings[0]?.code_tracking || "");
                setKeyPix(data?.payment?.key_payment_pix || "");
                setKeyPixQRCode(data?.payment?.qr_code_pix || "");

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadorderdata();/* @ts-ignore */
    }, [order?.shipmentsTrackings, order_id]);

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
                        {orderPayment?.status === "pending" ?
                            <StatusTop style={{
                                backgroundColor: 'yellow',
                                color: 'black'
                            }}>
                                Pendente de Pagamento
                            </StatusTop>
                            :
                            null
                        }

                        {orderPayment?.status === "approved" ?
                            <StatusTop style={{
                                backgroundColor: 'green',
                                color: 'white'
                            }}>
                                Pago
                            </StatusTop>
                            :
                            null
                        }

                        {orderPayment?.status === "inprocess" || orderPayment?.status === "inmediation" ?
                            <StatusTop style={{
                                backgroundColor: 'orange',
                                color: 'white'
                            }}>
                                Procesando
                            </StatusTop>
                            :
                            null
                        }

                        {orderPayment?.status === "rejected" ?
                            <StatusTop style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Rejeitado
                            </StatusTop>
                            :
                            null
                        }

                        {orderPayment?.status === "cancelled" ?
                            <StatusTop style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Cancelado
                            </StatusTop>
                            :
                            null
                        }

                        {orderPayment?.status === "refunded" || orderPayment?.status === "chargedback" ?
                            <StatusTop style={{
                                backgroundColor: 'brown',
                                color: 'white'
                            }}>
                                Devolvido
                            </StatusTop>
                            :
                            null
                        }

                        {orderPayment?.status === "chargedback" ?
                            <StatusTop style={{
                                backgroundColor: 'white',
                                color: 'black'
                            }}>
                                Estornado
                            </StatusTop>
                            :
                            null
                        }

                        <TotalFrete>
                            <FaTruckMoving size={20} />
                            Frete: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payFrete)}
                        </TotalFrete>

                        {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "master" ?
                            <TotalTop>
                                <Image src={master} width={60} height={80} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                        {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "visa" ?
                            <TotalTop>
                                <Image src={visa} width={60} height={80} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                        {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "amex" ?
                            <TotalTop>
                                <Image src={american} width={60} height={80} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                        {orderPayment?.type_payment === "Boleto" ?
                            <TotalTop>
                                <Image src={boleto} width={60} height={80} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                        {orderPayment?.type_payment === "PIX" ?
                            <TotalTop>
                                <Image src={pix} width={60} height={80} alt="pagamento" />
                                Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                            </TotalTop>
                            :
                            null
                        }

                    </BoxTopStatusGeral>

                    <GridOrder>
                        <Card>
                            <Titulos tipo="h2" titulo="Cliente" />

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>{customerDate?.cnpj ? "Empresa" : "Nome"}</TextStrong>
                                <TextData>{customerDate?.name}</TextData>
                            </BlockData>

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>Cliente desde</TextStrong>
                                <TextData>{moment(customerDate?.created_at).format('DD/MM/YYYY')}</TextData>
                            </BlockData>

                            {customerDate?.stateRegistration ?
                                <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                    <TextStrong>Inscrição Estadual</TextStrong>
                                    <TextData>{customerDate?.stateRegistration}</TextData>
                                </BlockData>
                                :
                                null
                            }

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>{customerDate?.cnpj ? "CNPJ" : "CPF"}</TextStrong>
                                <TextData>{customerDate?.cnpj ? customerDate?.cnpj : customerDate?.cpf}</TextData>
                            </BlockData>

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>E-mail</TextStrong>
                                <TextData>{customerDate?.email}</TextData>
                            </BlockData>

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>Telefone</TextStrong>
                                <TextData>{customerDate?.phone}</TextData>
                                <Link href={`https://api.whatsapp.com/send?phone=55${tel}`} target="_blank">
                                    <WhatsButton>
                                        <BsWhatsapp /> WhatsApp
                                    </WhatsButton>
                                </Link>
                            </BlockData>

                        </Card>

                        <Card>
                            <Titulos tipo="h2" titulo="Envio" />

                            <BlockData>
                                <TextData style={{ display: 'flex', fontWeight: '800' }}>{deliveryOrder?.addressee}</TextData>
                                <TextData>{deliveryOrder?.address} - {deliveryOrder?.number} - {deliveryOrder?.complement} - {deliveryOrder?.reference}</TextData>
                                <br />
                                <br />
                                <TextStrong style={{ fontWeight: '800' }}>Frete</TextStrong>
                                <br />
                                <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payFrete)}</TextData>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <TextData>{order?.data_delivery}</TextData>
                                <br />
                                <br />
                                <TextData>Peso Total: {order?.weight}Kg</TextData>
                            </BlockData>

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <br />
                                <TextData>CÓDIGO: {codeRastreio}</TextData>
                            </BlockData>

                        </Card>

                        <Card>
                            <Titulos tipo="h2" titulo="Pagamento" />

                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>Forma de Pagamento</TextStrong>

                                {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "master" ?

                                    <>
                                        <TextData style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Cartão de Crédito = Master
                                            <Image src={master} width={80} height={100} alt="pagamento" />
                                        </TextData>

                                        <TextData style={{ marginBottom: '8px' }}>
                                            {orderPayment?.cardholder_name}
                                        </TextData>
                                        <TextData style={{ marginBottom: '8px' }}>
                                            {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                        </TextData>
                                        <TextData style={{ marginBottom: '8px' }}>
                                            Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                        </TextData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor parcelado</TextStrong>
                                            <TextData>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>ID Transação</TextStrong>
                                            <TextData>{orderPayment?.transaction_id}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
                                        </BlockData>
                                    </>
                                    :
                                    null
                                }

                                {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "visa" ?

                                    <>
                                        <TextData style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Cartão de Crédito = Visa
                                            <Image src={visa} width={80} height={100} alt="pagamento" />
                                        </TextData>

                                        <TextData style={{ marginBottom: '8px' }}>
                                            {orderPayment?.cardholder_name}
                                        </TextData>
                                        <TextData style={{ marginBottom: '8px' }}>
                                            {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                        </TextData>
                                        <TextData style={{ marginBottom: '8px' }}>
                                            Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                        </TextData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor parcelado</TextStrong>
                                            <TextData>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>ID Transação</TextStrong>
                                            <TextData>{orderPayment?.transaction_id}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
                                        </BlockData>
                                    </>
                                    :
                                    null
                                }

                                {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "amex" ?

                                    <>
                                        <TextData style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Cartão de Crédito = American Express
                                            <Image src={american} width={80} height={100} alt="pagamento" />
                                        </TextData>

                                        <TextData style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Cartão de Crédito = Visa
                                            <Image src={visa} width={80} height={100} alt="pagamento" />
                                        </TextData>

                                        <TextData style={{ marginBottom: '8px' }}>
                                            {orderPayment?.cardholder_name}
                                        </TextData>
                                        <TextData style={{ marginBottom: '8px' }}>
                                            {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                        </TextData>
                                        <TextData style={{ marginBottom: '8px' }}>
                                            Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                        </TextData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor parcelado</TextStrong>
                                            <TextData>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>ID Transação</TextStrong>
                                            <TextData>{orderPayment?.transaction_id}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
                                        </BlockData>
                                    </>
                                    :
                                    null
                                }

                                {orderPayment?.type_payment === "Boleto" ?

                                    <>
                                        <TextData style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            Boleto
                                            <Image src={boleto} width={80} height={100} alt="pagamento" />
                                        </TextData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>ID Transação</TextStrong>
                                            <TextData>{orderPayment?.transaction_id}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
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
                                                <Image src={pix} width={80} height={100} alt="pagamento" />
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
                                            <TextData>{moment(orderPayment?.key_valid_pix).format('DD/MM/YYYY - HH:mm')}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>Valor Total</TextStrong>
                                            <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
                                        </BlockData>

                                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                            <TextStrong>ID Transação</TextStrong>
                                            <TextData>{orderPayment?.transaction_id}</TextData>
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
                                <TextData style={{ fontWeight: '00' }}>Nome do cupom: {order?.name_cupom}</TextData>
                                <br />
                                <TextData style={{ fontWeight: '00' }}>Código de cupom: {order?.cupom}</TextData>
                            </BlockData>

                        </Card>
                    ) :
                        null
                    }

                    <Card>
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
                    </Card>

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
                                    {item?.active === "Nao" ? (
                                        <>
                                            <DataComment>{moment(item?.created_at).format('DD/MM/YYYY - HH:mm')}</DataComment>
                                            <BoxComment>
                                                <Image src={item.active === "Sim" ? 'http://localhost:3333/files/' + logoStore : commentss} width={80} height={100} alt="foto-comentario" />
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