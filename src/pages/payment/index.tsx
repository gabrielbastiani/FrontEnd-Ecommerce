import { PUBLIC_KEY_TEST, URL_NOTIFICATION } from "../../utils/config";
import { FormEvent, useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";


export default function Payment() {

    const { customer } = useContext(AuthContext);
    let customer_id = customer?.id;

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
                amount: "100.5",
                iframe: true,
                form: {
                    id: "form-checkout",
                    cardNumber: {
                        id: "form-checkout__cardNumber",
                        placeholder: "Número do cartão",
                    },
                    expirationDate: {
                        id: "form-checkout__expirationDate",
                        placeholder: "MM/YY",
                    },
                    securityCode: {
                        id: "form-checkout__securityCode",
                        placeholder: "Código de segurança",
                    },
                    cardholderName: {
                        id: "form-checkout__cardholderName",
                        placeholder: "Titular do cartão",
                    },
                    issuer: {
                        id: "form-checkout__issuer",
                        placeholder: "Banco emissor",
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
                        placeholder: "Número do documento",
                    },
                    cardholderEmail: {
                        id: "form-checkout__cardholderEmail",
                        placeholder: "E-mail",
                    },
                },
                callbacks: {
                    onFormMounted: error => {
                        if (error) return console.warn("Form Mounted handling error: ", error);
                        console.log("Form mounted");
                    },
                    onSubmit: event => {
                        event.preventDefault();

                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType,
                        } = cardForm.getCardFormData();

                        try {
                            fetch("http://localhost:3333/paymentCardResult", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `${"Bearer " + PUBLIC_KEY_TEST}`
                                },
                                body: JSON.stringify({
                                    token,
                                    issuer_id,
                                    payment_method_id,
                                    transaction_amount: Number(amount),
                                    installments: Number(installments),
                                    description: "Descrição do produto",
                                    payer: {
                                        email,
                                        identification: {
                                            type: identificationType,
                                            number: identificationNumber,
                                        },
                                    },
                                    notification_url: URL_NOTIFICATION
                                }),
                            });

                        } catch (error) {
                            console.error("Erro ao fazer a requisição:", error);
                        }
                    },
                    onFetching: (resource) => {
                        console.log("Fetching resource: ", resource);

                        // Animate progress bar
                        const progressBar = document.querySelector(".progress-bar");
                        progressBar.removeAttribute("value");

                        return () => {
                            progressBar.setAttribute("value", "0");
                        };
                    }
                },
            });

        };

        initializeMercadoPago();

    }, []);

    useEffect(() => {

        const initializeBoleto = async () => {

            await loadMercadoPago();
            /* @ts-ignore */
            const mp = new window.MercadoPago(
                PUBLIC_KEY_TEST
            );

            try {
                const identificationTypes = await mp.getIdentificationTypes();
                const identificationTypeElement = document.getElementById('form-checkout__identificationTypeBoleto');

                createSelectOptions(identificationTypeElement, identificationTypes);
            } catch (e) {
                return console.error('Error getting identificationTypes: ', e);
            }

            function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {
                const { label, value } = labelsAndKeys;

                elem.options.length = 0;

                const tempOptions = document.createDocumentFragment();

                options.forEach(option => {
                    const optValue = option[value];
                    const optLabel = option[label];

                    const opt = document.createElement('option');
                    opt.value = optValue;
                    opt.textContent = optLabel;

                    tempOptions.appendChild(opt);
                });

                elem.appendChild(tempOptions);
            }
        }

        initializeBoleto();

    }, []);

    useEffect(() => {

        const initializePix = async () => {

            await loadMercadoPago();
            /* @ts-ignore */
            const mp = new window.MercadoPago(
                PUBLIC_KEY_TEST
            );

            try {
                const identificationTypes = await mp.getIdentificationTypes();
                const identificationTypeElement = document.getElementById('form-checkout__identificationTypePix');

                createSelectOptions(identificationTypeElement, identificationTypes);
            } catch (e) {
                return console.error('Error getting identificationTypes: ', e);
            }

            function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {
                const { label, value } = labelsAndKeys;

                elem.options.length = 0;

                const tempOptions = document.createDocumentFragment();

                options.forEach(option => {
                    const optValue = option[value];
                    const optLabel = option[label];

                    const opt = document.createElement('option');
                    opt.value = optValue;
                    opt.textContent = optLabel;

                    tempOptions.appendChild(opt);
                });

                elem.appendChild(tempOptions);
            }

        }

        initializePix();

    }, []);

    async function handleRegisterBoleto(event: FormEvent) {
        event.preventDefault();
        try {
            fetch("http://localhost:3333/paymentBoletoResult", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${"Bearer " + PUBLIC_KEY_TEST}`
                },
                body: JSON.stringify({
                    transaction_amount: 100,
                    description: 'Título do produto',
                    payment_method_id: 'bolbradesco',
                    payer: {
                        email: 'gabriel.bastiani@sumig.com',
                        first_name: 'Test',
                        last_name: 'User',
                        identification: {
                            type: 'CNPJ',
                            number: '92236629000153'
                        },
                        address: {
                            zip_code: '06233200',
                            street_name: 'Av. das Nações Unidas',
                            street_number: '3003',
                            neighborhood: 'Bonfim',
                            city: 'Osasco',
                            federal_unit: 'SP'
                        }
                    },
                    notification_url: URL_NOTIFICATION
                }),
            });

        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    }

    async function handleRegisterPix(event: FormEvent) {
        event.preventDefault();
        try {
            fetch("http://localhost:3333/paymentPixResult", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${"Bearer " + PUBLIC_KEY_TEST}`
                },
                body: JSON.stringify({
                    transaction_amount: 100,
                    description: 'Título do produto',
                    payment_method_id: 'pix',
                    payer: {
                        email: 'gabriel.bastiani@sumig.com',
                        first_name: 'Test',
                        last_name: 'User',
                        identification: {
                            type: 'CPF',
                            number: '00700244050'
                        },
                        address: {
                            zip_code: '06233200',
                            street_name: 'Av. das Nações Unidas',
                            street_number: '3003',
                            neighborhood: 'Bonfim',
                            city: 'Osasco',
                            federal_unit: 'SP'
                        }
                    },
                    notification_url: URL_NOTIFICATION
                }),
            });

        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    }


    return (
        <>
            <div>
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

            <br />

            <h2>Boleto Bancario</h2>

            <div>

                <form id="form-checkoutBoleto" onSubmit={handleRegisterBoleto}>
                    <div>
                        <div>
                            <label htmlFor="payerFirstName">Nome</label>
                            <input id="form-checkout__payerFirstName" name="payerFirstName" type="text" />
                        </div>
                        <div>
                            <label htmlFor="payerLastName">Sobrenome</label>
                            <input id="form-checkout__payerLastName" name="payerLastName" type="text" />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input id="form-checkout__email" name="email" type="text" />
                        </div>
                        <div>
                            <label htmlFor="identificationType">Tipo de documento</label>
                            <select id="form-checkout__identificationTypeBoleto" name="identificationType"></select>
                        </div>
                        <div>
                            <label htmlFor="identificationNumber">Número do documento</label>
                            <input id="form-checkout__identificationNumber" name="identificationNumber" type="text" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
                            <input type="hidden" name="description" id="description" value="Nome do Produto" />
                            <br />
                            <button id="form-checkoutBoleto" type="submit">Pagar</button>
                        </div>
                    </div>
                </form>

            </div>

            <h2>PIX</h2>

            <div>

                <form id="form-checkoutPix" onSubmit={handleRegisterPix}>
                    <div>
                        <div>
                            <label htmlFor="payerFirstName">Nome</label>
                            <input id="form-checkout__payerFirstName" name="payerFirstName" type="text" />
                        </div>
                        <div>
                            <label htmlFor="payerLastName">Sobrenome</label>
                            <input id="form-checkout__payerLastName" name="payerLastName" type="text" />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input id="form-checkout__email" name="email" type="text" />
                        </div>
                        <div>
                            <label htmlFor="identificationType">Tipo de documento</label>
                            <select id="form-checkout__identificationTypePix" name="identificationType"></select>
                        </div>
                        <div>
                            <label htmlFor="identificationNumber">Número do documento</label>
                            <input id="form-checkout__identificationNumber" name="identificationNumber" type="text" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
                            <input type="hidden" name="description" id="description" value="Nome do Produto" />
                            <br />
                            <button id="form-checkoutPix" type="submit">Pagar</button>
                        </div>
                    </div>
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