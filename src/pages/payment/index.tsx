import { PUBLIC_KEY_TEST, ACCESS_TOKEN_TEST } from "../../utils/config";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { toast } from "react-toastify";


export default function Payment() {

    const [payment_id, setPayment_id] = useState("");
    const [title, setTitle] = useState("");
    const [unit_price, setUnit_price] = useState(Number);
    const [category_id, setCategory_id] = useState("");
    const [description, setDescription] = useState("");
    const [picture_url, setPicture_url] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [area_code, setArea_code] = useState("");
    const [number, setNumber] = useState(Number);
    const [type_identification, setType_identification] = useState("");
    const [type_number, setType_number] = useState(Number);
    const [street_name, setStreet_name] = useState("");
    const [street_number, setStreet_number] = useState(Number);
    const [zip_code, setZip_code] = useState("");



    useEffect(() => {
        const initializeMercadoPago = async () => {
            await loadMercadoPago();
            /* @ts-ignore */
            const mp = new window.MercadoPago(
                PUBLIC_KEY_TEST
            );

            const cardForm = mp.cardForm({
                amount: '1000',
                iframe: true,
                form: {
                    id: "form-checkout",
                    cardNumber: {
                        id: "form-checkout__cardNumber",
                        placeholder: "Numero do cartão",
                    },
                    expirationDate: {
                        id: "form-checkout__expirationDate",
                        placeholder: "Data de validade no formato: MM/AA",
                    },
                    securityCode: {
                        id: "form-checkout__securityCode",
                        placeholder: "Código de segurança",
                    },
                    cardholderName: {
                        id: "form-checkout__cardholderName",
                        placeholder: "Nome do titular do cartão",
                    },
                    issuer: {
                        id: "form-checkout__issuer",
                        placeholder: "Banco",
                    },
                    installments: {
                        id: "form-checkout__installments",
                        placeholder: "Parcelas",
                    },
                    identificationType: {
                        id: "form-checkout__identificationType",
                        placeholder: "Tipo de documento",
                    },
                    identificationNumber: {
                        id: "form-checkout__identificationNumber",
                        placeholder: "Número do documento do titular",
                    },
                    cardholderEmail: {
                        id: "form-checkout__cardholderEmail",
                        placeholder: "Email do titular",
                    },
                },
                callbacks: {
                    onFormMounted: (error: any) => {
                        if (error) {
                            console.warn("Form Mounted handling error: ", error);
                        } else {
                            console.log("Form mounted");
                        }
                    },
                    onSubmit: async (event: { preventDefault: () => void }) => {
                        event.preventDefault();
                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            token,
                            amount,
                            installments,
                            identificationNumber,
                            identificationType,
                        } = cardForm.getCardFormData();

                        try {
                            const apiClient = setupAPIClient();
                            await apiClient.post("/paymentResult", {
                                id: cardForm.issuerId,
                                type_identification: cardForm.paymentMethodId,
                                category_id: "Solda",
                                unit_price: 1000,
                                installments: Number(installments),
                                description: "Descrição do produto",
                                paymentMethod: "cartao",
                                email: email,
                                identification: {
                                    type: identificationType,
                                    number: identificationNumber,
                                },
                            },
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Access: ACCESS_TOKEN_TEST
                                    },
                                }
                            );

                            console.log("gabriel: ",
                                JSON.stringify({
                                    token,
                                    issuer_id,
                                    payment_method_id,
                                    amount,
                                    transaction_amount: 1000,
                                    installments: Number(installments),
                                    description: "Descrição do produto",
                                    paymentMethod: "cartao",
                                    payer: {
                                        email,
                                        identification: {
                                            type: identificationType,
                                            number: identificationNumber,
                                        },
                                    },
                                })


                            );
                        } catch (error) {
                            console.error("Erro ao fazer a requisição:", error);
                        }
                    },
                    onFetching: (resource: any) => {
                        console.log("Fetching resource: ", resource);

                        // Animate progress bar
                        const progressBar = document.querySelector(".progress-bar");
                        if (progressBar) {
                            progressBar.removeAttribute("value");

                            return () => {
                                progressBar.setAttribute("value", "0");
                            };
                        }
                    },
                },
            });
        };

        initializeMercadoPago();
    }, []);


    return (
        <>
            <div className="PaymentForm">
                <form id="form-checkout">

                    <div
                        id="form-checkout__cardNumber"
                        className="container mpFormInput"
                    ></div>

                    <div
                        id="form-checkout__expirationDate"
                        className="container mpFormInput"
                    ></div>

                    <div
                        id="form-checkout__securityCode"
                        className="container mpFormInput"
                    ></div>

                    <input
                        type="text"
                        id="form-checkout__cardholderName"
                        className="cardHolderName mpFormInput"
                    />

                    <select
                        id="form-checkout__issuer"
                        className="container mpFormInput"
                    ></select>

                    <select
                        id="form-checkout__installments"
                        className="container mpFormInput"
                    ></select>

                    <select
                        id="form-checkout__identificationType"
                        className="container mpFormInput"
                    ></select>

                    <input
                        type="text"
                        id="form-checkout__identificationNumber"
                        className="container mpFormInput"
                    />

                    <input
                        type="email"
                        id="form-checkout__cardholderEmail"
                        className="container mpFormInput"
                    />

                    <button
                        type="submit"
                        id="form-checkout__submit"
                        className="container"
                    >
                        Pagar
                    </button>
                    <progress value="0" className="progress-bar">
                        Carregando...
                    </progress>
                </form>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});