import { PUBLIC_KEY_TEST, URL_NOTIFICATION } from "../../utils/config";
import { FormEvent, useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { PageSection } from "../../components/dateStoreUx/styles";
import { HeaderCart } from "../../components/HeaderCart";
import Head from "next/head";
import FooterAccount from "../../components/FooterAccount";


export default function Payment() {

    const { cartProducts, productsCart, totalFinishCart } = useContext(CartContext);
    const { customer } = useContext(AuthContext);
    let customer_id = customer?.id;

    const [nameCompletes, setNameCompletes] = useState('');
    const [cpfs, setCpfs] = useState('');
    const [cnpjs, setCnpjs] = useState('');
    const [stateRegistration, setStateRegistration] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');
    const [locals, setLocals] = useState('');
    const [numeros, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState([]);
    const [ceps, setCeps] = useState('');
    const [newslatters, setNewslatters] = useState("");
    const [store, setStore] = useState("");

    const cpfCnpj = cpfs ? cpfs : cnpjs;

    function removerAcentos(s: any) {
        return s.normalize('NFD')
            .replace(/-{2,}/g, "")
            .replace(".", "")
            .replace(".", "")
            .replace("/", "")
            .replace("-", "")
    }

    const tipo = removerAcentos(cpfCnpj).length >= 14 ? "CNPJ" : "CPF";

    useEffect(() => {
        async function loadCustomerData() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/customer/listExactCustomerID?customer_id=${customer_id}`);

                setNameCompletes(data?.name || "");
                setCnpjs(data?.cnpj || "");
                setCpfs(data?.cpf || "");
                setStateRegistration(data?.stateRegistration || "");
                setPhones(data?.phone || "");
                setEmails(data?.email || "");
                setDataNascimentos(data?.dateOfBirth || "");
                setLocals(data?.address || "");
                setNumeros(data?.number || "");
                setBairros(data?.neighborhood || "");
                setCidades(data?.city || "");
                setEstados(data?.state || "");
                setCeps(data?.cep || "");
                setNewslatters(data?.newslatter || "");
                setStore(data?.store?.name || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadCustomerData();
    }, [customer_id]);



    useEffect(() => {
        const initializeMercadoPago = async () => {
            await loadMercadoPago();
            /* @ts-ignore */
            const mp = new window.MercadoPago(
                PUBLIC_KEY_TEST
            );

            const cardForm = mp.cardForm({
                amount: String(totalFinishCart),
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
                    transaction_amount: totalFinishCart,
                    description: store,
                    payment_method_id: 'bolbradesco',
                    payer: {
                        email: emails,
                        first_name: nameCompletes,
                        last_name: nameCompletes,
                        identification: {
                            type: tipo,
                            number: removerAcentos(cpfCnpj)
                        },
                        address: {
                            zip_code: removerAcentos(ceps),
                            street_name: locals,
                            street_number: numeros,
                            neighborhood: bairros,
                            city: cidades,
                            federal_unit: estados
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
                    transaction_amount: totalFinishCart,
                    description: store,
                    payment_method_id: 'pix',
                    payer: {
                        email: emails,
                        first_name: nameCompletes,
                        last_name: nameCompletes,
                        identification: {
                            type: tipo,
                            number: removerAcentos(cpfCnpj)
                        },
                        address: {
                            zip_code: removerAcentos(ceps),
                            street_name: locals,
                            street_number: numeros,
                            neighborhood: bairros,
                            city: cidades,
                            federal_unit: estados
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
            <Head>
                <title>Pagamento</title>
            </Head>

            <HeaderCart />

            <PageSection>

            </PageSection>
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
            
            <br />
            <br />
            <FooterAccount />
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});