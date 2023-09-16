import { setupAPIClient } from "../../services/api";
import { canSSRAuthPayment } from "../../utils/canSSRAuthPayment";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import copy from "copy-to-clipboard";
import FooterAccount from "../../components/FooterAccount";
import { HeaderThanks } from "../../components/HeaderThanks";
import Titulos from "../../components/Titulos";
import Link from "next/link";
import { ContLogin } from "../loginClient/styles";
import { BoxInstructions, BoxPix, ButtonPix, ButtonThanks, ContainerCenterThanks, InputPix, NumberOrder, StrongThanks, TextInstruction, TextThanks } from "./styles";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";
import Image from "next/image";
import moment from 'moment';


export default function thanks() {

    const { customer } = useContext(AuthContext);
    let customer_id = customer?.id;

    const [idOrderStore, setIdOrderStore] = useState<any[]>([]);
    const [typePayment, setTypePayment] = useState("");
    const [boleto, setBoleto] = useState("");
    const [dataExpirationBoleto, setDataExpirationBoleto] = useState("");
    const [keyPix, setKeyPix] = useState("");
    const [qrCodePix, setQrCodePix] = useState("");
    const [dataExpirationPix, setDataExpirationPix] = useState("");

    const copyToClipboard = () => {
        copy(keyPix);
        toast.success(`Você copiou o código com sucesso!!!`);
    }

    useEffect(() => {
        async function loadCustomerData() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findFirstPaymentInStoreCustomer?customer_id=${customer_id}`);

                setIdOrderStore(data?.orders || []);
                setTypePayment(data?.type_payment || "");
                setBoleto(data?.external_resource_url || "");
                setDataExpirationBoleto(data?.expiration_boleto || "");
                setKeyPix(data?.key_payment_pix || "");
                setQrCodePix(data?.qr_code_pix || "");
                setDataExpirationPix(data?.key_valid_pix || "");

                console.log(data)

            } catch (error) {
                console.log(error);
            }
        }
        loadCustomerData();
    }, [customer_id]);

    return (
        <>
            <Head>
                <title>Obrigado pela compra</title>
            </Head>

            <HeaderThanks />

            <ContainerCenterThanks>
                <ContLogin>
                    <Titulos
                        tipo="h2"
                        titulo="Parabéns, seu pedido foi realizado com sucesso!!!"
                    />
                    <br />
                    <br />
                    {typePayment === "Boleto bancário" ?
                        <>
                            <TextThanks>Número do Pedido</TextThanks>
                            <NumberOrder>{idOrderStore[0]?.id_order_store}</NumberOrder>
                            <br />
                            <TextThanks>A confirmação foi enviada para o e-mail:</TextThanks>
                            <StrongThanks>{customer?.email}</StrongThanks>
                            <br />
                            <TextThanks>Vencimento da chave PIX para esse pagamento: {moment(dataExpirationBoleto).format('DD/MM/YYYY - HH:mm')}</TextThanks>
                            <br />
                            <Link href={`${boleto}`} target="_blank">
                                <ButtonThanks>
                                    ACESSE SEU BOLETO AQUI!!!
                                </ButtonThanks>
                            </Link>
                            <br />
                            <hr />
                            <TextThanks>Acesse seus pedidos clicando abaixo, ou volte para loja</TextThanks>
                            <br />
                            <Link style={{ marginBottom: '10px' }} href='/myAccount/meuspedidos'>
                                Meus Pedidos
                            </Link>
                            <Link href='/'>
                                Volte para loja
                            </Link>
                        </>
                        :
                        null
                    }

                    {typePayment === "PIX" ?
                        <>
                            <TextThanks>Número do Pedido</TextThanks>
                            <NumberOrder>{idOrderStore[0]?.id_order_store}</NumberOrder>
                            <br />
                            <TextThanks>A confirmação foi enviada para o e-mail:</TextThanks>
                            <StrongThanks>{customer?.email}</StrongThanks>
                            <br />
                            <StrongThanks>Para pagar, escolha uma destas opções:</StrongThanks>
                            <br />
                            <TextThanks>Vencimento da chave PIX para esse pagamento: {moment(dataExpirationPix).format('DD/MM/YYYY - HH:mm')}</TextThanks>
                            <br />
                            <Image src={`data:image/jpeg;base64,${qrCodePix}`} height={180} width={180} alt="pix-loja" />
                            <br />
                            <TextThanks>Código de pagamento</TextThanks>
                            <BoxPix>
                                <InputPix
                                    type="text"
                                    value={keyPix}
                                />

                                <ButtonPix
                                    onClick={copyToClipboard}
                                >
                                    <FaRegCopy color="black" size={25} />
                                </ButtonPix>
                            </BoxPix>
                            <br />
                            <StrongThanks>Como pagar?</StrongThanks>
                            <br />
                            <BoxInstructions>
                                <TextInstruction>1 - Entre no app ou site do seu banco e escolha a opção de pagamento via Pix.</TextInstruction>
                                <TextInstruction>2 - Escaneie o código QR ou copie e cole o código de pagamento.</TextInstruction>
                                <TextInstruction>3 - Pronto! O pagamento será creditado na hora e você receberá um e-mail de confirmação.</TextInstruction>
                            </BoxInstructions>
                            <br />
                            <hr />
                            <TextThanks>Acesse seus pedidos clicando abaixo, ou volte para loja</TextThanks>
                            <br />
                            <Link style={{ marginBottom: '10px' }} href='/myAccount/meuspedidos'>
                                Meus Pedidos
                            </Link>
                            <Link href='/'>
                                Volte para loja
                            </Link>
                        </>
                        :
                        null
                    }

                </ContLogin>
            </ContainerCenterThanks>

            <FooterAccount />
        </>
    )
}

export const getServerSideProps = canSSRAuthPayment(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});